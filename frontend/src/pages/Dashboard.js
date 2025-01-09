import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';
import { useAuth } from '../hooks/AuthProvider';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Error fetching projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleCreateProject = () => {
    navigate('/projects/new'); // Navigiere zur Projekt-Erstellungsseite
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard, {user?.email}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Your Projects</h2>
      {projects.length === 0 ? (
        <div>
          <p>No projects found. Create your first project!</p>
          <button onClick={handleCreateProject}>Create New Project</button>
        </div>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

