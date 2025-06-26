const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: { type: String, required: true, unique: true },
  goals_psg: { type: Number, default: 0 },
  goals_mia: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
  hype_psg: { type: Number, default: 0 },
  hype_mia: { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', gameSchema);
