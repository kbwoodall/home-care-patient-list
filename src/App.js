// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import PatientList from './components/PatientList';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'homecare-patients';

// Initial data to use if nothing is in localStorage
const initialPatients = [
  {
    name: 'John Doe',
    specialNeeds: ['Mobility assistance', 'Medication management']
  },
  {
    name: 'Jane Smith',
    specialNeeds: ['Meal preparation', 'Personal care']
  },
  {
    name: 'Robert Johnson',
    specialNeeds: ['Physical therapy', 'Transportation']
  }
];

function App() {
  const [patients, setPatients] = useState(() => {
    // Load from localStorage on initial render
    const savedPatients = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });

  // Save to localStorage whenever patients change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  const handleUpdatePatient = (index, updatedPatient) => {
    const newPatients = [...patients];
    newPatients[index] = updatedPatient;
    setPatients(newPatients);
  };

  const handleDeletePatient = (index) => {
    const newPatients = patients.filter((_, i) => i !== index);
    setPatients(newPatients);
  };

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HomeCare Patient Management</h1>
        <PatientList 
          patients={patients} 
          onUpdatePatient={handleUpdatePatient}
          onDeletePatient={handleDeletePatient}
          onAddPatient={handleAddPatient}
        />
      </header>
    </div>
  );
}

export default App;