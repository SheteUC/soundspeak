import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import SongStatus from "./SongStatus";
import AudioPlayer from "./AudioPlayer";
import "./GenerateSongForm.css";

const GenerateSongForm = () => {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [songId, setSongId] = useState(null);
  const [songStatus, setSongStatus] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [songTitle, setSongTitle] = useState("");

  const generateSong = useMutation("generateSong");
  const getSongStatus = useMutation("getSongStatus");
  const patients = useQuery("listPatients");
  const [error, setError] = useState(null);

  const handleGenerateSong = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      alert("Please select a patient.");
      return;
    }

    try {
      const patient = patients.find((p) => p.id === selectedPatientId);
      const medicalCondition = patient ? patient.medicalCondition : "";
      const result = await generateSong({ patientId: selectedPatientId, medicalCondition });
      setSongId(result.id);
      setSongStatus("submitted");
      setError(null);
    } catch (err) {
      console.error("Error generating song:", err);
      setError("Failed to generate song.");
    }
  };

  useEffect(() => {
    let interval;
    if (songId && songStatus !== "complete" && songStatus !== "error") {
      interval = setInterval(async () => {
        try {
          const status = await getSongStatus({ id: songId });
          setSongStatus(status.status);
          if (status.audioUrl) {
            setAudioUrl(status.audioUrl);
          }
          if (status.title) {
            setSongTitle(status.title);
          }
          if (status.status === "complete" || status.status === "error") {
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error fetching song status:", err);
          setError("Failed to fetch song status.");
          clearInterval(interval);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [songId, songStatus, getSongStatus]);

  return (
    <div className="generate-song-form">
      <form onSubmit={handleGenerateSong}>
        <h2>Generate Song for Patient</h2>
        <div className="form-group">
          <label>Select Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            required
          >
            <option value="">--Select Patient--</option>
            {patients &&
              patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Generate Song</button>
      </form>

      {songId && (
        <div className="status-section">
          <SongStatus status={songStatus} />
          {songStatus === "complete" && audioUrl && (
            <AudioPlayer audioUrl={audioUrl} title={songTitle} />
          )}
          {songStatus === "error" && <p className="error-message">Failed to generate song. Please try again.</p>}
        </div>
      )}
    </div>
  );
};

export default GenerateSongForm;
