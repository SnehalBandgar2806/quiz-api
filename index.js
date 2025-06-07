const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/flutter_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

// Middleware
app.use(cors({ origin: 'http://localhost:56497', credentials: true })); // replace with your Flutter web origin
app.use(bodyParser.json());

// User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
}));

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, gender } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password, gender });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Start server
app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
