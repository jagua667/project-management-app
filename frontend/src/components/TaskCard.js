import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Assigned to: {task.assignee ? task.assignee.email : 'Unassigned'}</p>
    </div>
  );
};

export default TaskCard;

