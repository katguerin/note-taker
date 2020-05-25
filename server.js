const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });