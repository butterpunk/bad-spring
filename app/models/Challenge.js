// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Challenge', {
	place : {type : String, default: ''},
	points: {type : Number, default: ''},
	description: {type : String, default: ''},
	lat: {type : Number, default: ''},
	long: {type : Number, default: ''}	
});
