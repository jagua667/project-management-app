import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/projects', { title });
      navigate('/dashboard'); // Nach erfolgreicher Erstellung zum Dashboard navigieren
    } catch (err) {
      setError('Error creating project');
      console.error(err);
    }
  };

  return (
    <div className="new-project">
      <h1>Create New Project</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default NewProject;

