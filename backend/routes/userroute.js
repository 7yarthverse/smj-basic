const express = require("express");
const router = express.Router();
const User = require("../model/usermodel"); // Import the User model correctly

// User Registration
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    const newUser = await User.create({ name, email, password }); // Use `User.create` properly here
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// GET request to check API status and show all users
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    return res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleuser = await User.findById({ _id: id });
    res.status(200).json(singleuser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleuser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(singleuser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updateuser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateuser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user) {
      // You may want to use a library like bcrypt to hash and compare passwords
      if (user.password === password) {
        // Successful login
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Incorrect password
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
