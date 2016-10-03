// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

//var Nerd = require('./models/nerd');
var Challenge = require('./models/challenge');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
    // sample api route


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

    
    app.delete('/api/challenges',function(req,res){
        
        Challenge.findByIdAndRemove(req.body.id,function(err,chal){
            var response = {
                message: "Challenge successfully delted",
                id: chal.id
            };
            res.send(response);
        })
    });

    app.post('/api/challenges/upvote',function(req, res){
        console.log(req.body);
        Challenge.findById(req.body.id,function(err,chal){
            if(err){
                res.status(500).send(err);
            }else{
                // console.log(chal);
                chal.points = chal.points + 25; 
                
                chal.save(function(err, chal){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.send(chal);
                });
            }

        });
    });

    app.post('/api/challenges/downvote',function(req, res){
        Challenge.findById(req.body.id,function(err,chal){
            if(err){
                res.status(500).send(err);
            }else{
                
                chal.points = chal.points - 25; 
                chal.save(function(err, chal){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.send(chal);
                });
            }

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