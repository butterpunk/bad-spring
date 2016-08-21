angular.module('MainCtrl', []).controller('MainController', function($scope) {
	document.addEventListener('DOMContentLoaded', function() {
	   // your code here
	      var map;
	      function initMap() {
	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: -34.397, lng: 150.644},
	          zoom: 8
	        });
	      }
	}, false); 

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