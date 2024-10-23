import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

const app = express();
const router = express.Router();

// Load environment variables
config();
app.use(cors());
//ds
app.use(router);

// Connect to MongoDB
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Define the person schema
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

// Create the Person model
const Person = mongoose.model("Person", personSchema);

// Middleware
// Middleware

app.use(express.json()); // Parse JSON bodies

// Register the router with the app

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/register", (req, res) => {
  res.send("Hello register");
});
router.post("/login", async (req, res) => {
  console.log("Login Route hit");
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username);

  const user = await Person.findOne({ Email: username });
  console.log(user);

  if (user === null) {
    console.log("User  not found");
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    console.log("User  found");
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
    console.log("User  added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error Creating Account, Please Try Again`);
    console.log("User  NOT added successfully");
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
