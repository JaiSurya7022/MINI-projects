import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connects to local MongoDB Compass instance
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/smart_campus_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;