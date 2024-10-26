const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // const token = req.cookies.token; // Assuming the token is stored in cookies
  // Get token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    
    next();
  } catch (ex) {
    if (ex.name === 'TokenExpiredError') {
      
      return res.status(401).json({ message: 'Token expired.' });
    }
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
