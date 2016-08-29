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
  $scope.map = {center: {latitude: 29.960126, longitude: -90.033251 }, zoom: 13 };
  $scope.marker = {coords: {latitude: 29.960126, longitude: -90.033251 }, id: 1, options: {icon: 'https://files.slack.com/files-pri/T149P6ABU-F266KGGVB/gold_bolt.png'} };
  $scope.options = {
  	scrollwheel: false, 
  	//this is the styler
  	//this example is from https://snazzymaps.com/style/73125/eletrolar
  	//really straight forward styling
  	//ref : 
  	//      https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyle
  	//those are the three props for the styles array and just go nuts from there
  	styles: [
			     {
			        "featureType": "road",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "weight": 1
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "weight": 0.8
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "stylers": [	        
					{
               			 "color": "#7A7AA5"
            		}
			        ]
			    },
			    {
			        "featureType": "transit",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "elementType": "labels.text",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#ffffff"
			            }
			        ]
			    },
			    {
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            }
			        ]
			    },
			    {
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    } 				

			]
  	};

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