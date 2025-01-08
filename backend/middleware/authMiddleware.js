const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Füge die Benutzer-ID zu `req.user` hinzu
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
};
    
module.exports = authMiddleware;

