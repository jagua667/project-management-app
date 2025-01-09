import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api';
import { jwtDecode } from 'jwt-decode'; // Importiere jwt-decode

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token); // Speichere Token in localStorage

      // Dekodiere das Token, um Benutzerdaten zu erhalten
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, email });

      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err; // Wirf den Fehler weiter, damit er im Login-Komponenten-Handler verarbeitet werden kann
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Entferne Token aus localStorage
    setUser(null); // Leere den Benutzerzustand
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

