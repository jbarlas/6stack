const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const players = require('./routes/api/players');
const teams = require('./routes/api/teams');


const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo 
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected (:'))
    .catch(err => console.log(err));

// use routes 
app.use('/api/players', players);
app.use('/api/teams', teams)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));