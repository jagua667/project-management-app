import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './ProtectedRoute'; // Import der neuen Komponente
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Öffentlich zugängliche Seiten */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />

            {/* Geschützte Seiten */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route 
              path="/projects/new" 
              element={<ProtectedRoute element={<NewProject />} />}
            />
            <Route
              path="/projects/:projectId"
              element={<ProtectedRoute element={<ProjectDetail />} />}
            />

            {/* Standardumleitung */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

