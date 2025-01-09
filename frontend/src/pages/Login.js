import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link importieren
import { useAuth } from '../hooks/AuthProvider';

const Login = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // Login-Aufruf aus AuthProvider
      const { token } = response.data;

      // Speichere das Token (z. B. im localStorage oder AuthProvider)
      localStorage.setItem('token', token);

      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Noch keinen Account?{' '}
        <Link to="/register">Hier registrieren</Link> {/* Link zur Registrierungsseite */}
      </p>
    </div>
  );
};

export default Login;

