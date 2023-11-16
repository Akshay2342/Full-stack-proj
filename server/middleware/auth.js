const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ message: 'Token error' });
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.username;
    return next();
  });
};

module.exports = auth;