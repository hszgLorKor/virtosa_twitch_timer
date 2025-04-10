const express = require('express');
const tmi = require('tmi.js');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static('public')); // Directory for serving your HTML

// Configure TMI.js
const client = new tmi.Client({
    identity: {
        username: 'your_twitch_username',
        password: 'oauth:your_oauth_token'
    },
    channels: ['your_channel_name']
});

// Connect to Twitch
client.connect();

// Listen for subscription events
client.on('subscription', (channel, username, methods, message, userstate) => {
    console.log(`${username} has subscribed!`);
    // Notify all connected clients to add time
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ action: 'addTime' }));
        }
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});