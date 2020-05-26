const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));


// GET /api/notes should read the db.json file

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post()

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
  