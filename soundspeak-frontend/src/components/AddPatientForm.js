import React, { useState } from "react";
import { useMutation } from "convex/react";
import "./AddPatientForm.css";

const AddPatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const addPatient = useMutation("addPatient");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addPatient({ name, age: parseInt(age), medicalCondition });
      alert(`Patient added with ID: ${result.id}`);
      setName("");
      setAge("");
      setMedicalCondition("");
      setError(null);
    } catch (err) {
      console.error("Error adding patient:", err);
      setError(err.message);
    }
  };

  return (
    <form className="add-patient-form" onSubmit={handleSubmit}>
      <h2>Add New Patient</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="0"
        />
      </div>
      <div className="form-group">
        <label>Medical Condition:</label>
        <input
          type="text"
          value={medicalCondition}
          onChange={(e) => setMedicalCondition(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Patient</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AddPatientForm;
