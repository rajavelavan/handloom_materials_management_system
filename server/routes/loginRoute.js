import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const router = express.Router();

// { mail_id, password }

router.post('/', async (req, res) => {
  try {
    const { mail_id, password } = req.body;
    console.log('Request Body:', req.body);

    // validate requestbody fields
    if (!mail_id || !password) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    }

    //check if user don't exist
    const user = await UserModel.findOne({ mail_id });

    if (!user) {
      console.log('Login Failed.');
      return res.status(200).send({
        success: false,
        message: 'user does not exist',
      });
    }

    // check if password is correct
    const validpwd = await bcryptjs.compare(password, user.password);
    if (!validpwd) {
      console.log('Recheck the password.');
      return res.status(400).send({
        success: false,
        message: 'Password is incorrect',
      });
    }

    // //create token data
    // const tokenData = {
    //   id: user._id,
    //   mail_id: user.mail_id,
    //   password: user.password,
    // };

    // //create token
    // const token = jwt.sign(tokenData, process.env.TOKEN_SECRECT, {
    //   expiresIn: '1d',
    // });

    // console.log(token);

    // //set the token into user's cookie
    // res.cookie('token', token, { httpOnly: true });

    console.log('User Found.');
    return res.status(200).send({ success: true, message: ' Login Success', user });

  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
});

export default router;
