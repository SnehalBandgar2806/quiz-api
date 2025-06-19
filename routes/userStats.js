// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Debug middleware to log route hits
// router.use((req, res, next) => {
//   console.log('UserStats route hit:', req.method, req.path);
//   next();
// });

// // POST: Add a single user
// router.post('/', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save user", error: error.message });
//   }
// });

// // POST: Add multiple users (bulk)
// router.post('/bulk', async (req, res) => {
//   try {
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({ message: 'Body must be an array of users' });
//     }
//     const users = await User.insertMany(req.body);
//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save users", error: error.message });
//   }
// });

// // GET: Total number of users
// router.get('/count', async (req, res) => {
//   try {
//     const count = await User.countDocuments();
//     res.json({ totalUsers: count });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
