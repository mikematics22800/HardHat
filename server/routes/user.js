import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const router = express.Router();

// This section will help you get a list of all the users.
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a single user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) {
    res.send("User not found.").status(404);
  } else if (!bcrypt.compare(req.body.password, result.password)) {
    res.send("Invalid password.").status(404);
  } else {
    const token = signToken(result); // Generate token
    res.send({ user: result, token }).status(200); // Send user and token
  }
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newDocument = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    const token = signToken(newDocument); // Generate token
    res.send({ result, token }).status(204); // Send result and token
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user.");
  }
});

// This section will help you update a user by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updates = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user.");
  }
});

// This section will help you delete a user
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user.");
  }
});

export default router;