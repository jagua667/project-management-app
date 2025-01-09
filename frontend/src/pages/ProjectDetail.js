import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectResponse = await axios.get('/projects/${projectId}');
        setProject(projectResponse.data);

        const tasksResponse = await axios.get('/projects/${projectId}/tasks');
        setTasks(tasksResponse.data);
      } catch (err) {
        console.error('Error fetching project details', err);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="project-detail">
      {project ? (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <h3>Tasks</h3>
          <TaskForm projectId={project.id} onTaskCreated={handleTaskCreated} />
          <div className="tasks">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
};

export default ProjectDetail;

