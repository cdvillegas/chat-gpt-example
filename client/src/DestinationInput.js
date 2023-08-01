import React, { useState } from 'react';
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
      start_date: '',
      num_days: '',
      daily_budget: '',
      weather: '',
      group_size: '',
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

          <label htmlFor="groupSize">Group Size:</label>
          <input type="text" name="groupSize" onChange={handleInputChange} />

          <label>Interests:</label>
          <div>
            <label>
              <input type="checkbox" name="sightseeing" onChange={handleCheckboxChange} /> Sightseeing
            </label>
            <label>
              <input type="checkbox" name="outdoorActivities" onChange={handleCheckboxChange} /> Outdoor Activities
            </label>
            <label>
              <input type="checkbox" name="nightlife" onChange={handleCheckboxChange} /> Nightlife
            </label>
            <label>
              <input type="checkbox" name="foodExploration" onChange={handleCheckboxChange} /> Food Exploration
            </label>
            <label>
              <input type="checkbox" name="shopping" onChange={handleCheckboxChange} /> Shopping
            </label>
            <label>
              <input type="checkbox" name="events" onChange={handleCheckboxChange} /> Events & Festivals
            </label>
          </div>

          <button type="submit">Generate Itinerary</button>
        </form>
      )}
    </div>
  );
  return (
    <div className="destination-input">
      <form onSubmit={handleSubmit}>
        
      </form>
    </div>
  );
}

export default DestinationInput;
