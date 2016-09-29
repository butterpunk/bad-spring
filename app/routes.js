// grab the nerd model we just created
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
        var challenge = new Challenge();
        
        challenge.place = req.body.place;
        challenge.points = req.body.points;
        challenge.description = req.body.description;
        challenge.lat = req.body.lat;
        challenge.long = req.body.long;

        challenge.save(function(err){
            if (err)
                res.send(err);

            res.json({message: 'Challenge Created!'})
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