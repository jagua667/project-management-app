import React from 'react';
import ReactDOM from 'react-dom/client'; // Verwende 'react-dom/client'
import App from './App';
import { AuthProvider, useAuth } from './hooks/AuthProvider';
import './styles/App.css';

// Erstelle das Root-Element mit 'createRoot' anstelle von 'render'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Die Anwendung wird in einen Kontext (z. B. für die Authentifizierung) eingebettet
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

