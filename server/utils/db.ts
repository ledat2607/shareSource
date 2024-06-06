import mongoose from "mongoose"
require("dotenv").config();


const dbUrl: string = process.env.MONGO_URI || "";


//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connect successfull`);
    });
  } catch (error) {
    console.log(error);
    setTimeout(connectDB, 5000);
  }
};
export default connectDB;