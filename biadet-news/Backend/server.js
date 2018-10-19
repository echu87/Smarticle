// import required packages
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const mongoose = require('mongoose');
const parser = require('rss-parser');
const request = require('request');
const cheerio = require('cheerio');

// whitelist array contains any uri that the server will allow to access information, keeps other sources from using our server
const whitelist = ['http://localhost:4200'];
// define corsOptions (i.e. whitelisted uri)
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1)
            callback(null, true);
        else
            callback(new Error('BLOCKED BY CORS'));
    }
}
// initialize express router and express server and pass corsOptions to server, define PORT variable (i.e. what PORT will we run our server om)
const backend = express();
backend.use(cors(corsOptions));
const router = express.Router();
const PORT = 3000;

// start express server on specified PORT
backend.listen(PORT, function() {
    console.log('server started on port ' + PORT);
})