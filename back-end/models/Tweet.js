const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  team: { type: String, enum: ['PSG', 'MIA'], required: true },
  created_at: { type: Date, default: Date.now },
  game_id: { type: String, required: true }
});

module.exports = mongoose.model('Tweet', tweetSchema);
