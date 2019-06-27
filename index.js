const bodyParser = require('body-parser')
var route = require('./routes/route');
var config = require('./config.js');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

MongoClient.connect(config.URL, { useNewUrlParser: true, poolSize: 3 },
    function (err, db) {
        if (!err) {
            console.log("Connected to : " + config.URL);
            app.set("mongodb", db);
        } else {
            console.log("Unable to connect to MongoDB: " + config.URL);
        }
    });

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    
    //To parse URL encoded data
    app.use(bodyParser.urlencoded({ extended: false }))
    
    //To parse json data
    app.use(bodyParser.json())
    
    
    app.use('/api', route);
    
    var server = app.listen(4000, function () {
        console.log('Server listening on port ' + server.address().port);
    });
    server.timeout = 900000;