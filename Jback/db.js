import mongoose from "mongoose";
import { config } from "dotenv";
console.log("Database creation");

config();
mongoose
  .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log("database connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  homeLocation: String,
  phoneNumber: Number,
  password: String,
});

const Person = mongoose.model("Person", personSchema);
