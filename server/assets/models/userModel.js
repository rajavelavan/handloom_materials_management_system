import { Schema, model } from 'mongoose';

const authSchema = new Schema({
  role: {
    type: String,
    enum: ['admin', 'customer', 'super_admin'],
    // required: true,
  },
  userName: {
    type: String,
    required: [true, 'please provide name.'],
  },
  address: {
    type: String,
    required: [true, 'please give your address.'],
  },
  phone_no: {
    type: String,
    requied: [true, 'please provide vaild mobile number.'],
  },
  mail_id: {
    type: String,
    required: [true, 'please provide mailid.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password.'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyOtp: String,
});

const UserModel = model('user', authSchema);

export default UserModel;
