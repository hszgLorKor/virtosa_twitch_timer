const express = require('express');
const tmi = require('tmi.js');

const app = express();
const port = process.env.PORT || 3000;

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
    // Here you would send a message to the frontend to tell it to add time
    // This could be done through WebSockets, or you can use polling from the client
    console.log(`${username} has subscribed!`);
    // You need to implement a way to notify your client's timer script to call addTime function
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});