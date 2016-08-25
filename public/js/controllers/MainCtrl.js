angular.module('MainCtrl', ['uiGmapgoogle-maps'])
.config(
	['$provide', 'nemSimpleLoggerProvider', 'uiGmapGoogleMapApiProvider', function($provide, nemSimpleLoggerProvider, uiGmapGoogleMapApiProvider) {
		$provide.decorator.apply(null, nemSimpleLoggerProvider.decorator);
		   //this loads gmaps api 
		   uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyCCFTekcXn3C9VY94-eqsYjRuecuSiRhHc', //I got a different API toke
	        libraries: 'weather,geometry,visualization'
	    });
}])
.controller('MainController', function($scope, $log, uiGmapGoogleMapApi) {
	$log.currentLevel = $log.LEVELS.debug;
	
	//example using bachannal's coords
	//in style.css
	//***  .angular-google-map-container { height: 400px; } ***
	//this controls the svg's size, if you don't set it, it is 0
	//learned that the hard way.
  $scope.map = {center: {latitude: 29.960126, longitude: -90.033251 }, zoom: 14 };
  $scope.options = {scrollwheel: false};

  uiGmapGoogleMapApi.then(function(maps) {
  	console.log(maps);
  });

	$scope.date = 'August 19, 2016';
	$scope.dares=[{
		place: 'St. Charles, Uptown',
		points: '75',
		description: 'take a walk down st. charles at night with a bottle of wine.'
	},{
		place: 'Frenchman Street',
		points: '100',
		description: 'Make out with 3 people in one night on frenchman St.'
	},{
		place: 'Bacchanal',
		points: '100',
		description: 'Smoke a joint in Bacchanal'		
	},{
		place: 'Apple Barrel',
		points: '100',
		description: 'Take A Shot with Morgan, the bartender'			
	},{
		place: 'The Country Club',
		points: '100',
		description: 'Go to the drag brunch and tip the queens'			
	},{
		place: 'Chickie Wah Wah',
		points: '100',
		description: 'See Alexis and the Samauri monday residential'			
	},{
		place: 'Heavens Gate',
		points: '100',
		description: 'Go to a house show and bring dorritos'			
	},]

	$scope.currentPage = 0;
	$scope.pageSize = 4; 
	$scope.numberOfPages = function(){
		return Math.ceil($scope.dares.length/$scope.pageSize);
	}

});