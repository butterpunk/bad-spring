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
	jQuery( document ).ready(function() {
		console.log('here');
	});	
	jQuery(window).scroll(function() {
    var height = jQuery(window).scrollTop();

    if(height  > 650) {
        // do something
        jQuery('.navCustom').removeClass('hide');
    }else{
    	jQuery('.navCustom').addClass('hide');
    }
});


  $scope.points = 100;
  $scope.front = 1; 
  $log.currentLevel = $log.LEVELS.debug;
  $scope.map = {center: {latitude: 29.960126, longitude: -90.033251 }, zoom: 13 };
  // $scope.marker = {coords: {latitude: 29.960126, longitude: -90.033251 }, id: 1, options: {icon: '../assets/gold_bolt.png'} };
  $scope.options = {
  	scrollwheel: false, 
	styles: [   {
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

	$scope.date = 'August 19, 2016';
	$scope.weekend=[{
		place: 'Gasa Gasa',
		points: 75,
		description: 'twin peaks',
		lat: 29.9279,
		long: -90.1279
	},{
		place: 'Hi Ho',
		points: 100,
		description: 'DJ Soul Sista on Saturday',
		lat: 29.951065,
		long: -90.071533
		
	}]
	$scope.all=[{
		place: 'St. Charles, Uptown',
		points: 75,
		description: 'take a walk down st. charles at night with a bottle of wine.',
		lat: 29.9279,
		long: -90.1279
	},{
		place: 'Frenchman Street',
		points: 100,
		description: 'Make out with 3 people in one night on frenchman St.',
		lat: 29.951065,
		long: -90.071533
		
	},{
		place: 'Bacchanal',
		points: 100,
		description: 'Smoke a joint in Bacchanal',
		lat: 29.960126,
		long: -90.033251		
	},{
		place: 'Apple Barrel',
		points: 100,
		description: 'Take A Shot with Morgan, the bartender',
		lat: 29.9638,
		long: -90.0577					
	},{
		place: 'The Country Club',
		points: 100,
		description: 'Go to the drag brunch and tip the queens',
		lat: 29.962687,
		long: -90.044142					
	},{
		place: 'Chickie Wah Wah',
		points: 100,
		description: 'See Alexis and the Samauri monday residential',
		lat: 29.9667653,
		long: -90.0917809					
	},{
		place: 'Heavens Gate',
		points: 100,
		description: 'Go to a house show and bring dorritos',
		lat: 29.948919,
		long: -90.117925					
	},]
	$scope.dares = $scope.all;
	$scope.marker= [];
	angular.forEach($scope.dares,function(value,key){
		$scope.marker.push({coords: {latitude: value.lat, longitude: value.long }, id: key, options: {icon: '../assets/gold_bolt.png'} })
	});
	console.log($scope.marker);
	 uiGmapGoogleMapApi.then(function(marker) {
	  	console.log(marker);
	  });	
	$scope.currentPage = 0;
	$scope.pageSize = 4; 
	$scope.numberOfPages = function(){
		return Math.ceil($scope.dares.length/$scope.pageSize);
	}
	$scope.changeDare = function(arg){
		if(arg == 'wknd' && $scope.front == 1){
			$scope.dares = $scope.weekend;
			$scope.front = 0; 
			angular.forEach(jQuery('.menu-item h6'),function(value,key){
				angular.element(value).toggleClass('strike');
				angular.element(value).toggleClass('non-strike');
			});
		}else if(arg == 'all' && $scope.front != 1 ){
			$scope.dares = $scope.all;
			$scope.front = 1;
			angular.forEach(jQuery('.menu-item h6'),function(value,key){
				angular.element(value).toggleClass('strike');
				angular.element(value).toggleClass('non-strike');
			});			
		}
	}
	$scope.upVote = function(arg){
		if($scope.points - 25 >= 0){
			$scope.points = $scope.points - 25; 
			$scope.dares[arg].points = $scope.dares[arg].points + 25;

		}else{
			console.log('bong');
			jQuery('#pointsRemaining').addClass('red');
		}  

	}
	$scope.downVote = function(arg){
		if($scope.points - 25 >= 0){
			$scope.points = $scope.points - 25; 
			$scope.dares[arg].points = $scope.dares[arg].points - 25; 
		}else{
			console.log('bong');
		} 

	}	
});