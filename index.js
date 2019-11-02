const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/users', async (req, res) => {
  try {
    const response = await db.find();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'The users information could not be retrieved.' });
  }
});

server.post('/api/users', async (req, res) => {
  const { name, bio } = req.body;
  let response;

  if (name === undefined || bio === undefined) {
    return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  try {
    response = await db.insert({ name, bio });
  } catch (error) {
    return res.status(500).json({ error: 'There was an error while saving the user to the database' });
  }

  try {
    response = await db.findById(response.id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'There was an error while fetching the user from the database'});
  }
});

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db.findById(id);
    return (response !== undefined)
      ? res.status(200).json(response)
      : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } catch (error) {
    return res.status(500).json({ error: 'The user information could not be retrieved.' });
  }
});

server.put('/api/users/:id', async (req, res) => {
  try {
    //
  } catch (error) {
    res.status(500).json({ error: 'The user information could not be modified.' });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    //
  } catch (error) {
    res.status(500).json({ error: 'The user could not be removed.' });
  }
});

server.listen(5000, () => console.log('listening on port 5000'));
