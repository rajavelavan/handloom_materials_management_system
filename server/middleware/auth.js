import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ success: false, message: 'Authentication required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRECT);
    next();
  } catch (error) {
    return res.status(401).send({ success: false, message: 'Invalid or expired session.' });
  }
};
