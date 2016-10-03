// grab the mongoose module
var mongoose = require('mongoose');
<<<<<<< HEAD
var Schema      = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called

/*
module.exports = mongoose.model('Challenge', 
	{
		place : {type : String, default: ''},
		points : {type : Number, default: ''},
		description : {type : String, default: ''},
		lat : {type : Number, default: ''},
		long : {type : Number, default: ''},
});
*/

var Challenge = new Schema({
	place : {type : String, default: ''},
	points : {type : Number, default: ''},
	description : {type : String, default: ''},
	lat : {type : Number, default: ''},
	long : {type : Number, default: ''},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

Challenge.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});
// Exports the Challenge for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('Challenge', Challenge);


=======

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Challenge', {
	place : {type : String, default: ''},
	points: {type : Number, default: ''},
	description: {type : String, default: ''},
	lat: {type : Number, default: ''},
	long: {type : Number, default: ''}	
});
>>>>>>> dev
