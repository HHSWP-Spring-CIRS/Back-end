// /index.js
const express = require('express');
const app = express();

// Do you understand why utilizing body parser here will make it usable
// in routes/api/people.js ?
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  "use strict";
  // We need the following as you'll run HTML+JS+Ajax+jQuery on http://localhost, 
  // but service is taken from http://protoNNN.haaga-helia.fi (NNN is some number)
  // https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const apiRoute = require('./routes/api');    // means index.js in there!!!

app.use('/api', apiRoute);
// Just for fast testing if something breaks down, and
// wanna see at least that Node.js server is runnign
app.get('/', function(req,res) {
  res.send('Hello World of Knex Phase 2 - POST too!');
});

app.listen('80');
console.log("Listening!");