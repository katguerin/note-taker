/* 
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column 
*/

const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// don't use require to get the notes maybe?
let { notes } = require('./db/db.json', true);


app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// deleting loaded module
app.get('/api/notes', (req, res) => {
    delete require.cache[require.resolve('./db/db.json')]
    let notesArray  = require('./db/db.json');
    notes = notesArray.notes; 
    console.log('--- RELOADED NOTES --- ');
    console.log(notes);
    res.json(notes);
});

// post into the db.json and add id
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    console.log(req.body);
    res.json(req.body);
});

// creating new note. obviously
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
    let notesSize = notes.length - 1;
    console.log('--- DELETE REQUEST -  NOTES LENGTH:  ' + notesSize);
    const result = deleteById(req.params.id.toString(), notes);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: result }, null, 2)
    );

    console.log('--- DELETED RESULTS ---');
    console.log(result);
    return res.json(result);
});

function deleteById(id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    return result;
}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});