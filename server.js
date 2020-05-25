const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

function createNewNote(title, text) {
    console.log(title)
    return title;
}




app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
  