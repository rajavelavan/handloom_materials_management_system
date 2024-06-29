import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs';
import { verifyEmail } from './helper/sendMail.js';

const router = express.Router();

// {  role, userName, address, phone_no, mail_id, password, verified }

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    console.log('data fetched success!');
    return res
      .status(200)
      .send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Requested Id for get single data:', id);
    const user = await UserModel.findById(id);
    return res
      .status(200)
      .send({ message: 'Getting single data successful', response: user });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { role, userName, address, phone_no, mail_id, password } =
      req.body;

      const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const otp = `${Math.floor(1000+ Math.random()*9000)}`;

    const user = await UserModel.create({
      role,
      userName,
      address,
      phone_no,
      mail_id,
      password: hashedPassword,
      verifyOtp: otp
    });

    await verifyEmail({ mail_id, otp });

    return res
      .status(200)
      .send({ message: 'Data posted successful!', response: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updated Data from frontend:', id, req.body);
    const update = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ message: 'Data updated success!', response: update });
  } catch (error) {
    return res.status(500).send('Put request failed!' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('requested Id for delete:', id);
    const data = await UserModel.findByIdAndDelete(id);
    console.log('Removed data:', data);
    return res.status(200).send('Data removed successful!');
  } catch (error) {
    return res.status(500).send('Error in removing data');
  }
});

export default router;
