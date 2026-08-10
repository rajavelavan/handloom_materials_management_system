import { Schema, model } from 'mongoose';

const authSchema = new Schema({
  role: {
    type: String,
    enum: ['admin', 'customer', 'super_admin'],
    required: true,
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
    required: [true, 'please provide vaild mobile number.'],
  },
  mail_id: {
    type: String,
    required: [true, 'please provide mailid.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password.'],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyOtp: {
    type: String,
    select: false,
  },
});

// Defense in depth: even if a route forgets to exclude these fields from a query,
// they're stripped here whenever a user document is serialized to JSON (res.send).
authSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.verifyOtp;
    return ret;
  },
});

const UserModel = model('user', authSchema);

export default UserModel;
