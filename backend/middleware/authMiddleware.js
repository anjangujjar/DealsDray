const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded.user;
    next();
  });
};

const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = { auth, adminAuth };
