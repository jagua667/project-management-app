import React from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks }) => {
  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div key={status} className="kanban-column">
          <h3>{status}</h3>
          <div className="task-list">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="task-card">
                  <p>{task.title}</p>
                  <p>{task.assignee}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

