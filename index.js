const express = require('express');
const routes = require('./api');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.set('useFindAndModify', false);
// Set up express app/instance
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Connect to mongoDB and sets to ES6 promise
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true}, (err) =>{
    if(!err){
      console.log('Connection has been made successfully to mongoDB');
    }
    else{
      console.log('Connection error for mongoDB:', err);
    }
});

// sets mongoose's promise to global promise
mongoose.Promise = global.Promise;

// Intialize the routes with / route
app.use('/', routes);
app.use(express.json());

// listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Now listening for requests from port: ' + port);
});
