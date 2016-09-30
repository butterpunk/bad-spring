// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

var Nerd = require('./models/nerd');
var Challenge = require('./models/challenge');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
    // sample api route
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            console.log('here');

            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    app.post('/api/challenges',function(req,res){
        console.log(req.body.place)
        var challenge = new Challenge();
        
        challenge.place = req.body.place;
        console.log(challenge.place)
        challenge.points = req.body.points;
        challenge.description = req.body.description;
        challenge.lat = req.body.lat;
        challenge.long = req.body.long; 

        console.log(challenge)

        challenge.save(function(err){
            console.log(challenge)
            if (err)
                res.send(err);

            res.json({message: "Challenge Created!"})
        });

    });

    app.get('/api/challenges', function(req, res) {
        // use mongoose to get all nerds in the database
        Challenge.find(function(err, nerds) {

            console.log('here');

            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    }); 

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};