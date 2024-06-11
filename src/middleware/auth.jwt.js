const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("Access denied");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token không hợp lệ");
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
