const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

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

// post into the db.json and add id
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(req.body);
    console.log(req.body);
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// delete from db.json
app.delete('/api/notes/:id', (req, res) => {
    req.body.id = notes.length.toString();
    // const note = createNewNote(req.body, notes);
    // res.json(req.body);
    console.log(req.body);
    const result = findById(req.body.id, notes);
    console.log(result);
});

function findById(id, notesArray) {
    console.log(id);
    console.log(notesArray);
    const result = notesArray.filter(note => note.id != id);
    // return result;
}


// edit already made notes



app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
  