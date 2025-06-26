/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Tweet management endpoints
 */

const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');
const Game = require('../models/Game');

/**
 * @swagger
 * /api/tweets:
 *   get:
 *     summary: Get all tweets
 *     tags: [Tweets]
 *     responses:
 *       200:
 *         description: Returns a list of tweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/tweets/game/{gameId}:
 *   get:
 *     summary: Get tweets by game ID
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game identifier
 *     responses:
 *       200:
 *         description: Returns tweets for the specified game
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', async (req, res) => {
  try {
    const tweets = await Tweet.find({ game_id: req.params.gameId });
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/tweets/hype/{gameId}:
 *   get:
 *     summary: Calculate and get hype percentage for a game
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game identifier
 *     responses:
 *       200:
 *         description: Returns hype percentages for both teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 psg:
 *                   type: number
 *                   description: Percentage of tweets supporting PSG
 *                 mia:
 *                   type: number
 *                   description: Percentage of tweets supporting MIA
 *                 total:
 *                   type: integer
 *                   description: Total number of tweets analyzed
 *       500:
 *         description: Internal server error
 */
router.get('/hype/:gameId', async (req, res) => {
  try {
    const tweets = await Tweet.find({ game_id: req.params.gameId });
    const totalTweets = tweets.length;
    
    const psgCount = tweets.filter(tweet => tweet.team === 'PSG').length;
    const miaCount = tweets.filter(tweet => tweet.team === 'MIA').length;

    const psgPercentage = (psgCount / totalTweets) * 100;
    const miaPercentage = (miaCount / totalTweets) * 100;

    // Update game hype in database
    await Game.findOneAndUpdate(
      { game_id: req.params.gameId },
      { 
        hype_psg: psgPercentage,
        hype_mia: miaPercentage,
        updated_at: new Date()
      },
      { upsert: true }
    );

    res.json({
      psg: psgPercentage,
      mia: miaPercentage,
      total: totalTweets
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
