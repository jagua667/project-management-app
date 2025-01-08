const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();

const app = express();

// Konfiguriere CORS
app.use(cors({
  origin: 'http://localhost:3000', // Erlaubt Anfragen von deinem Frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Erlaubte HTTP-Methoden
  credentials: true, // Erlaubt das Senden von Cookies/Autorisierungs-Headern
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

