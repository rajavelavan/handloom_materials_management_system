import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs';
import { verifyEmail as sendOtpEmail } from '../helper/sendMail.js';

const router = express.Router();

// Step 1: request a reset OTP for the given email
router.post('/request', async (req, res) => {
  try {
    const { mail_id } = req.body;

    if (!mail_id) {
      return res.status(400).send({ message: 'Email Id required' });
    }

    const user = await UserModel.findOne({ mail_id });
    if (!user) {
      return res.status(400).send({ message: 'Entered email not available.' });
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    user.verifyOtp = otp;
    await user.save();

    await sendOtpEmail({ userName: user.userName, mail_id, otp });

    return res.status(200).send({ success: true, message: 'OTP sent to your email.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Could not send OTP.' });
  }
});

// Step 2: verify the OTP and set the new password
router.post('/reset', async (req, res) => {
  try {
    const { mail_id, otp, newPassword } = req.body;

    if (!mail_id || !otp || !newPassword) {
      return res.status(400).send({ message: 'Email, OTP and new password are required.' });
    }

    const user = await UserModel.findOne({ mail_id }).select('+verifyOtp');
    if (!user) {
      return res.status(400).send({ message: 'Entered email not available.' });
    }

    const isMatch = String(user.verifyOtp) === String(otp);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid OTP.' });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);
    user.verifyOtp = undefined;
    await user.save();

    return res.status(200).send({ success: true, message: 'Password updated.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Cannot change password.' });
  }
});

export default router;
