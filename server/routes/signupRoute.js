import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs';
import { verifyEmail } from './helper/sendMail.js';

const router = express.Router();

// { role, userName, address, phone_no, mail_id, password }


router.post('/', async (req, res) => {
  try {
    const { role, userName, address, phone_no, mail_id, password } = req.body;
    console.log('Request Body:', req.body);

     // validate requestbody fields
    if (!role || !userName || !address || !phone_no || !mail_id || !password) {
        return res.status(400).send({
        message: 'All fields are required'});
    }

    //check if the user already exists
    const user = await UserModel.findOne({ mail_id });
    
    if (user) {
      return res.status(409).send({
        success: false,
        message: 'Existing user.'
      });
    }

    //hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const otp = `${Math.floor(1000+ Math.random()*9000)}`;

    //hashed otp
    // const Salt = await bcryptjs.genSalt(10);
    // const hashedOtp = await bcryptjs.hash(otp, Salt);

    const newUser = new UserModel({
      role,
      userName,
      address,
      phone_no,
      mail_id,
      password: hashedPassword,
      verifyOtp: otp,
    });

    //storing new user
    const savedUser = await newUser.save();
    console.log('New user added:', savedUser);
    console.log('Signup Success');

     //send verification email
     await verifyEmail({ userName, mail_id, otp });
    //  console.log(mail_id);
    //  console.log(userId);
     
     console.log('verify email sented to mailtrap.');

    return res.status(200).send({
      success: true,
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({success: false, error});
  }
});


export default router;
