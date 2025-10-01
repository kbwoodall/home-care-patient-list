// src/components/PatientList.js
import React, { useState } from 'react';

const PatientList = ({ patients, onUpdatePatient, onDeletePatient, onAddPatient }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ name: '', specialNeeds: '' });
  const [newPatient, setNewPatient] = useState({ name: '', specialNeeds: '' });

  const handleEdit = (patient, index) => {
    setEditingId(index);
    setEditedPatient({
      name: patient.name,
      specialNeeds: patient.specialNeeds.join(', ')
    });
  };

  const handleSave = (index) => {
    onUpdatePatient(index, {
      name: editedPatient.name,
      specialNeeds: editedPatient.specialNeeds.split(',').map(item => item.trim()).filter(Boolean)
    });
    setEditingId(null);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setNewPatient({ name: '', specialNeeds: '' });
  };

  const handleSaveNew = () => {
    onAddPatient({
      name: newPatient.name,
      specialNeeds: newPatient.specialNeeds.split(',').map(item => item.trim()).filter(Boolean)
    });
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="patient-list">
      <div className="patient-list-header">
        <h2>HomeCare Patient List</h2>
        <button 
          className="add-patient-btn" 
          onClick={handleAddNew}
          disabled={isAdding}
        >
          Add New Patient
        </button>
      </div>

      {isAdding && (
        <div className="add-patient-form">
          <h3>Add New Patient</h3>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newPatient.name}
              onChange={handleNewPatientChange}
              placeholder="Patient name"
            />
          </div>
          <div className="form-group">
            <label>Special Needs:</label>
            <input
              type="text"
              name="specialNeeds"
              value={newPatient.specialNeeds}
              onChange={handleNewPatientChange}
              placeholder="Comma separated needs"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleSaveNew} className="save-btn">Save</button>
            <button onClick={() => setIsAdding(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Special Needs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editedPatient.name}
                    onChange={handleChange}
                  />
                ) : (
                  patient.name
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    name="specialNeeds"
                    value={editedPatient.specialNeeds}
                    onChange={handleChange}
                    placeholder="Comma separated needs"
                  />
                ) : (
                  <ul>
                    {patient.specialNeeds.map((need, i) => (
                      <li key={i}>{need}</li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="actions">
                {editingId === index ? (
                  <>
                    <button onClick={() => handleSave(index)} className="save-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(patient, index)} className="edit-btn">Edit</button>
                    <button onClick={() => onDeletePatient(index)} className="delete-btn">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;