import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to fetch random cards
router.get('/cards/random', async (req, res) => {
    const { n = 3 } = req.query; // Default to 3 cards if 'n' isn't specified

    try {
        const { data } = await axios.get(`https://tarotapi.dev/api/v1/cards/random?n=${n}`);
        res.json(data); // Relay API data to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching random Tarot cards');
    }
});

export default router;
