import React from "react";
import AddPatientForm from "./components/AddPatientForm";
import GenerateSongForm from "./components/GenerateSongForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Speech Therapy Song Generator</h1>
      </header>
      <main>
        <AddPatientForm />
        <GenerateSongForm />
      </main>
    </div>
  );
}

export default App;