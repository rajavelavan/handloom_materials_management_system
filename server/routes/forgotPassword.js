import express from 'express';
import UserModel from '../assets/models/userModel.js';
import bcryptjs from 'bcryptjs';


const router = express.Router();

router.post('/', async (req, res) => {

const {mail_id, newPassword}= req.body; 

    console.log(req);
  if (mail_id == undefined || mail_id === '') {
    res.status(400).send({ message: 'Email Id required' });
  }
  if (newPassword == undefined || newPassword === '') {
    res.status(400).send({ message: 'New Password required' });
  }

  try {
    const user = await UserModel.findOne({mail_id});
    console.log(user);
    
    if(user===null) {
        return res.status(400).send({message: 'Entered email not available.'});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    let updated = await UserModel.findByIdAndUpdate({_id: user._id}, { password :hashedPassword }) 
    return res.status(200).send({success:true, message: 'Password updated.', updated});  
  } catch (error) {
    console.log(error);
    res.status(500).send('cannot change password.');
  }

});

export default router;