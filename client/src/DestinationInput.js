import React, { useState } from 'react';
import GroupSizeSelector from './GroupSizeSelector';
import InterestsSelector from './InterestsSelector';
import './DestinationInput.css';

function DestinationInput() {
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    numDays: '',
    dailyBudget: '',
    weather: '',
    groupSize: '',
    interests: [],
  });

  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setForm({ ...form, interests: [...form.interests, name] });
    } else {
      setForm({ ...form, interests: form.interests.filter((interest) => interest !== name) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  const resetForm = () => {
    setForm({
      destination: '',
      startDate: '',
      numDays: '',
      dailyBudget: '',
      weather: '',
      groupSize: '',
      interests: [],
    });
    setResponse(null);
  };
  
  return (
    <div className="destination-input">
      {response ? (
        <div className="response">
          <h2>Your Itinerary:</h2>
          {response.days.map((day, index) => (
            <div key={index}>
              <h3>Day {index + 1}</h3>
              {day.map((activity, activityIndex) => (
                <div key={activityIndex}>
                  <strong>{activity.name}</strong>
                  <p>{activity.description}</p>
                  <p>{activity.start} - {activity.end}</p>
                </div>
              ))}
            </div>
          ))}
          <button onClick={resetForm}>Generate Another Itinerary</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="destination">Destination:</label>
          <input type="text" name="destination" onChange={handleInputChange} />

          <label htmlFor="startDate">Start Date:</label>
          <input type="date" name="startDate" onChange={handleInputChange} />

          <label htmlFor="numDays">Number of Days:</label>
          <input type="number" name="numDays" onChange={handleInputChange} />

          <label htmlFor="dailyBudget">Daily Budget:</label>
          <input type="number" name="dailyBudget" onChange={handleInputChange} />

          <label htmlFor="weather">Weather:</label>
          <input type="text" name="weather" onChange={handleInputChange} />

          <h3>Group Size:</h3>
          <GroupSizeSelector groupSize={form.groupSize} setGroupSize={(value) => setForm({ ...form, groupSize: value })} />

          <InterestsSelector interests={form.interests} setInterests={(value) => setForm({ ...form, interests: value })} />


          <button type="submit">Generate Itinerary</button>
        </form>
      )}
    </div>
  );
}

export default DestinationInput;
