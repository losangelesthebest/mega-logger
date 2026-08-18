// webhook-proxy.js
// Deploy this as a GitHub Gist or as a standalone Node.js server

const WEBHOOK_URL = "https://discord.com/api/webhooks/1539078785784356875/K6qJs8oWsfxDpQdnwJ9sKDEJELq3PDV9c7TwSVxqv3jFEaBvgspdImGKj2aap10cGwHt"; // Replace with your actual webhook URL

// For GitHub Gist, you'll need to use a hosting service like Vercel, Heroku, or Glitch
// This is the server-side code that will forward requests to Discord

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message
      })
    });

    if (!response.ok) {
      throw new Error(`Discord returned ${response.status}`);
    }

    res.json({ success: true, status: response.status });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
