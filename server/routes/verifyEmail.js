import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs'

const router = express.Router();

router.post('/', async (req, res) => {
  
  try {
    const { mail_id, otp } = req.body;

    console.log(mail_id, otp);

    if (!mail_id || !otp) {
      return res.status(400).send({ error: 'Missing mail or OTP in request body.' });
    }

    // Find the user based on email
    const user = await UserModel.findOne({mail_id });

    // If there is no user
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isMatch = +user.verifyOtp === +otp;

    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid OTP' });
    }


    // If OTP is valid and not expired, update the user's verification status
    user.isVerified = true;

    await user.save();

    return res.send({
      message: 'Email verified successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
    
});

export default router;
