import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
  // console.log('Attempting to connect to MongoDB...'); // Debug log
  const uri= process.env.MONGO_URI;
  // console.log('MongoUri:', uri);
  try {
    await mongoose.connect(uri);
    return console.log('DB connection successful');
  } catch (error) {
    return console.log('Error in connecting to DB', error);
  }
};

export default connect;