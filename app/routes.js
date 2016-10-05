// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

var Nerd = require('./models/Nerd.js');
var Challenge = require('./models/Challenge.js');
var User = require('./models/Users.js');

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
                User.findById(req.user.id, function(err,us){
                    us.points = us.points - 25;
                    us.save(function(err,u){
                        //if(err){
                        //    res.status(500).send(err);
                        //}
                        //res.send(u);
                    })
                })                  
                
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
                console.log(req.user.id);
                
                User.findById(req.user.id, function(err,us){
                    us.points = us.points - 25;
                    us.save(function(err,u){
                        //if(err){
                        //    res.status(500).send(err);
                        //}
                        //res.send(u);
                    })
                }) 
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

    app.get('/user', function(req,res){

    })
 

    app.get('/user/login', function(req,res){

    });
    //apparently its this easy with passport! http://passportjs.org/docs
    app.get('/logout', function(req, res){
        console.log("passport logging out")
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', function(req,res,next){ passport.authenticate('local-signup', function(err, user,info){
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded', points: user.points });
    });      
  })(req, res, next);
});

app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
          return res.send(401,{ success : false, message : 'authentication failed' });
        }
        req.login(user, function(err){
          if(err){
            return next(err);
          }
          return res.send({ success : true, message : 'authentication succeeded', points: user.points });        
        });
      })(req, res, next);
    });

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

    app.post('/verify', isLoggedIn, function(req, res){
        console.log(req.user.points);
        response = {
            message : "YES",
            points: req.user.points
        };
        res.send(response);
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