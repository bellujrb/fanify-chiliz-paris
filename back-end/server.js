const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');
const axios = require('axios');
const Tweet = require('./models/Tweet');
const Game = require('./models/Game');

const app = express();
app.use(express.json());

// Blockchain service
const blockchainService = require('./services/blockchain');

// Function to update hype in blockchain
async function updateHypeInBlockchain(gameId) {
  try {
    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      console.error('Game not found:', gameId);
      return;
    }

    const { hype_psg, hype_mia } = game;
    const hypeId = gameId;

    // Convert percentages to uint256 (100% = 10000)
    const psgHype = Math.round(hype_psg * 100);
    const miaHype = Math.round(hype_mia * 100);

    await blockchainService.updateHype(hypeId, psgHype, miaHype);
    console.log('Hype updated in blockchain:', { gameId, psgHype, miaHype });
  } catch (error) {
    console.error('Error updating hype in blockchain:', error);
  }
}

// Function to update score in blockchain
async function updateScoreInBlockchain(gameId) {
  try {
    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      console.error('Game not found:', gameId);
      return;
    }

    const { goals_psg, goals_mia } = game;
    const hypeId = gameId;

    await blockchainService.updateScore(hypeId, goals_psg, goals_mia);
    console.log('Score updated in blockchain:', { gameId, goals_psg, goals_mia });
  } catch (error) {
    console.error('Error updating score in blockchain:', error);
  }
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fanify Chiliz API',
      version: '1.0.0',
      description: 'API for tracking game hype and scores',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fanify-chiliz';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/games', require('./routes/games'));

// Mock tweets initialization and hype calculation
cron.schedule('*/10 * * * *', async () => {
  try {
    // Initialize mock tweets if none exist
    if ((await Tweet.countDocuments()) === 0) {
      const mockTweets = [
        { text: 'PSG vai ganhar #Chiliz_PSGxMIA_20250629', team: 'PSG' },
        { text: 'MIA vai vencer #Chiliz_PSGxMIA_20250629', team: 'MIA' },
        { text: 'PSG é o time do momento #Chiliz_PSGxMIA_20250629', team: 'PSG' },
        { text: 'MIA surpreende #Chiliz_PSGxMIA_20250629', team: 'MIA' },
        { text: 'PSG é favorito #Chiliz_PSGxMIA_20250629', team: 'PSG' },
        { text: 'MIA mostra força #Chiliz_PSGxMIA_20250629', team: 'MIA' },
        { text: 'PSG vai dominar #Chiliz_PSGxMIA_20250629', team: 'PSG' },
        { text: 'MIA pode surpreender #Chiliz_PSGxMIA_20250629', team: 'MIA' },
        { text: 'PSG é o melhor #Chiliz_PSGxMIA_20250629', team: 'PSG' },
        { text: 'MIA mostra evolução #Chiliz_PSGxMIA_20250629', team: 'MIA' },
      ];

      const tweets = mockTweets.map(tweet => new Tweet(tweet));
      await Tweet.insertMany(tweets);
      console.log('Mock tweets initialized');
    }

    // Calculate and update hype
    const tweets = await Tweet.find({ game_id: '20250629' });
    const totalTweets = tweets.length;
    const psgCount = tweets.filter(tweet => tweet.team === 'PSG').length;
    const miaCount = tweets.filter(tweet => tweet.team === 'MIA').length;

    const psgPercentage = (psgCount / totalTweets) * 100;
    const miaPercentage = (miaCount / totalTweets) * 100;

    // Update game hype in database
    await Game.findOneAndUpdate(
      { game_id: '20250629' },
      { 
        hype_psg: psgPercentage,
        hype_mia: miaPercentage,
        updated_at: new Date()
      },
      { upsert: true }
    );

    // Update hype in blockchain
    await updateHypeInBlockchain('20250629');

  } catch (error) {
    console.error('Error processing tweets and hype:', error);
  }
});

// Game score update cron job
cron.schedule('*/10 * * * *', async () => {
  try {
    // TODO: Replace with actual API call
    const mockScore = {
      game_id: '20250629',
      goals_psg: Math.floor(Math.random() * 5),
      goals_mia: Math.floor(Math.random() * 5)
    };

    // Update game score in database
    await Game.findOneAndUpdate(
      { game_id: mockScore.game_id },
      { 
        goals_psg: mockScore.goals_psg,
        goals_mia: mockScore.goals_mia,
        updated_at: new Date()
      },
      { upsert: true }
    );

    // Update score in blockchain
    await updateScoreInBlockchain('20250629');

    console.log('Game score updated:', mockScore);
  } catch (error) {
    console.error('Error updating game score:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
