import express from "express";
const app = express();
const router = express.Router();
// Register the router with the app

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

import mongoose from "mongoose";
import { config } from "dotenv";

config();
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  fullName: String,
  Email: {
    type: String,
    unique: true,
  },

  Location: String,
  Number: Number,
  Password: String,
});

const Person = mongoose.model("Person", personSchema);

const port = 3001;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});

app.use(express.json());
app.use(router);
router.post("/login", async (req, res) => {
  console.log("Login Route hit");
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username);
  const user = await Person.findOne({ Email: username });
  console.log(user);
  if (user === null) {
    console.log("are you okay");
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    console.log("user found");
    res.json({ message: "Login successful" });
  }
});

router.post("/register", async (req, res) => {
  console.log("Register Route hit");
  console.log(req.body.Email);

  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).send(`Account Created: ${savedPerson.Email}`);
    console.log("user added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error Creating Account, Please Try Again`);
    console.log("user NOT added successfully");
  }
});
