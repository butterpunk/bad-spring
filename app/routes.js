// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

var Nerd = require('./models/Nerd.js');
var Challenge = require('./models/Challenge.js');

module.exports = function(app,passport) {

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

    app.post('/api/challenges/upvote', isLoggedIn, function(req, res){
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

    app.post('/api/challenges/downvote',isLoggedIn, function(req, res){
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
 

    app.get('/user/login', function(req,res){

    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/geeks', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })); 

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/geeks', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

    app.get('/verify', isLoggedIn, function(req, res){
        console.log('we ehre at all?');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        console.log('yes we are authenticated');
        return next();
    }
    else{
    // if they aren't redirect them to the home page
    console.log('nope we arent authenticated');
    var response ={
        message : "NO"
    };
    res.send(response);
    }
}