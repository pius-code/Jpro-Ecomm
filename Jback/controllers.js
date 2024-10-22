import express from "express";
const router = express.Router();
import "./db.js";

// //API to create a new person
// router.post("/", async (req, res) => {
//   try {
//     const person = new Person(req.body);
//     await person.save();
//     res.status(201).json(person);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating person" });
//   }
// });

// //Get all persons
// router.get("/", async (req, res) => {
//   try {
//     const persons = await Persons.find();
//     res.json(persons);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching persons" });
//   }
// });

// // Get a person by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const person = await Person.findById(req.params.id);
//     if (!person) {
//       res.status(404).json({ message: "Person not found" });
//     } else {
//       res.json(person);
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching person" });
//   }
// });

// // Update a person
// router.put("/:id", async (req, res) => {
//   try {
//     const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!person) {
//       res.status(404).json({ message: "Person not found" });
//     } else {
//       res.json(person);
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error updating person" });
//   }
// });

// // API to delete a person
// router.delete("/:id", async (req, res) => {
//   try {
//     await Person.findByIdAndDelete(req.params.id);
//     res.status(204).json({ message: "Person deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting person" });
//   }
// });

// LogIN
router.post("/login", async (req, res) => {
  console.log("will it even work");
  const { username, password } = req.body;
  const user = await Person.findOne({ username });
  if (user == null) {
    console.log("are you okay");
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    console.log("user found");
    res.json({ message: "Login successful" });
  }
});

console.log("hmm");
