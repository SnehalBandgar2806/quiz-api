const express = require('express');
const router = express.Router();

const liveUsers = new Map(); // { quizId: Map<userId, timestamp> }
const INACTIVITY_TIMEOUT = 60 * 1000; // 1 min

// User joins/keeps alive
router.post('/join', (req, res) => {
  const { quizId, userId, name, email } = req.body;

  if (!quizId || !userId) return res.status(400).json({ error: 'quizId and userId required' });

  const now = Date.now();
  if (!liveUsers.has(quizId)) liveUsers.set(quizId, new Map());
  liveUsers.get(quizId).set(userId, { timestamp: now, name, email });

  res.json({ success: true });
});

// Get live user count
router.get('/count/:quizId', (req, res) => {
  const quizId = req.params.quizId;
  const now = Date.now();

  if (!liveUsers.has(quizId)) return res.json({ count: 0 });

  const users = liveUsers.get(quizId);
  for (const [id, user] of users.entries()) {
    if (now - user.timestamp > INACTIVITY_TIMEOUT) {
      users.delete(id);
    }
  }

  res.json({ count: users.size });
});

module.exports = router;