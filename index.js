const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/users', async (req, res) => {
  try {
    const response = await db.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'The users information could not be retrieved.' });
  }
});

server.post('/api/users', async (req, res) => {
  // fire away
});

server.get('/api/users/:id', async (req, res) => {
  // fire away
});

server.put('/api/users/:id', async (req, res) => {
  // fire away
});

server.delete('/api/users/:id', async (req, res) => {
  // fire away
});

server.listen(5000, () => console.log('listening on port 5000'));
