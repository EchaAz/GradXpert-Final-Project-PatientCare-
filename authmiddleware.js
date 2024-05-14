const jwt = require('jsonwebtoken');

const authorizeUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      // console.log(error.message);
      return res.status(403).json({ error: 'Authorization token is required' });
    }
  
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      return res.status(403).json({ error: 'Invalid token type' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      // console.log(error.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
module.exports = { authorizeUser };