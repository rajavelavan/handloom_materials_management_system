import express from 'express'

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const token = clearCookie('token', { httpOnly: true, expires: new Date(0) });
    
    return res.send({
      message: 'Logout successful',
      success: true,
      token,
    });
    
  } catch (error) {
    res.send({ error: error.message });
  }
})

export default router;

