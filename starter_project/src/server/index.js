var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
dotenv.config();

// Start up an instance of app
const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// console.log(__dirname);

// Variables for url and api key
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);

let projectData = {};

//GET API
app.get('/', (req, res) => {
  res.sendFile('dist/index.html')
})

// POST API

app.post('/add-url', async (req, res) => {
  url = req.body.urlInput;
  const apiURL = `${baseURL}key=${apiKey}&url=${url}`
  console.log('apiURL', apiURL);

  const response = await fetch(apiURL)
  const mcData = await response.json()
  projectData['score_tag'] = mcData.score_tag;
  projectData['agreement'] = mcData.agreement;
  projectData['subjectivity'] = mcData.subjectivity;
  projectData['confidence'] = mcData.confidence;
  projectData['irony'] = mcData.irony;
  console.log('projectData', projectData);
  res.send(projectData);
})

// Designates what port the app will listen to for incoming requests
const port = 8085;
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
});


