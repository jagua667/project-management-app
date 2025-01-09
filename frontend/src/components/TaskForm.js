import React, { useState } from 'react';
import axios from '../api';

const TaskForm = ({ projectId, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo'); // Default status is "todo"
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        status,
        projectId,
        assigneeId: assignee, // Assuming assignee is an ID of a user
      };

      const response = await axios.post('/tasks', newTask);
      onTaskCreated(response.data); // Notify the parent component
      setTitle('');
      setStatus('todo');
      setAssignee('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="assignee">Assign to:</label>
          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

