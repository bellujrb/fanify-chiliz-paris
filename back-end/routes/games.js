/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         game_id:
 *           type: string
 *           description: Unique identifier for the game
 *         goals_psg:
 *           type: integer
 *           description: Goals scored by PSG
 *         goals_mia:
 *           type: integer
 *           description: Goals scored by MIA
 *         hype_psg:
 *           type: number
 *           description: Percentage of hype for PSG
 *         hype_mia:
 *           type: number
 *           description: Percentage of hype for MIA
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management endpoints
 */

/**
 * @swagger
 * /api/games/{gameId}:
 *   get:
 *     summary: Get game details by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game identifier
 *     responses:
 *       200:
 *         description: Returns game details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findOne({ game_id: req.params.gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/games/{gameId}/score:
 *   put:
 *     summary: Update game score
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goals_psg:
 *                 type: integer
 *                 description: Goals scored by PSG
 *               goals_mia:
 *                 type: integer
 *                 description: Goals scored by MIA
 *     responses:
 *       200:
 *         description: Game score updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.put('/:gameId/score', async (req, res) => {
  try {
    const { goals_psg, goals_mia } = req.body;
    const game = await Game.findOneAndUpdate(
      { game_id: req.params.gameId },
      { 
        goals_psg,
        goals_mia,
        updated_at: new Date()
      },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
