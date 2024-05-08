var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'))

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key

//GET Route
app.get('/', (req, res) => {
  res.sendFile('dist/index.html')
})

// POST Route



// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


