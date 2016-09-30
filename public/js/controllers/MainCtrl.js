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
.controller('MainController', function($scope, $log, uiGmapGoogleMapApi, Nerd) {
	
	//add markers here in the function to hit API
	$scope.currentPage = 0;
	$scope.pageSize = 4; 
	$scope.numberOfPages = function(){
		return Math.ceil($scope.dares.length/$scope.pageSize);
	}

	$scope.all = [];
	$scope.marker= [];

	Nerd.get().then(function(nerds) {
        console.log(nerds);
        angular.forEach(nerds.data,function(value,key){
        	if(value.place != ""){
        		$scope.all.push(value);
        	}
        });
        console.log($scope.all);
		angular.forEach($scope.all,function(value,key){
			$scope.marker.push({coords: {latitude: value.lat, longitude: value.long }, id: key, options: {icon: '../assets/gold_bolt.png'} })
		});
		console.log($scope.marker);
		 uiGmapGoogleMapApi.then(function(marker) {
		  	console.log(marker);
		  });
		$scope.map = {
	  					center: {latitude: 29.960126, longitude: -90.033251 }, 
	  					zoom: 13       
	      			};

    });

	jQuery( document ).ready(function() {
		console.log('here');
	});	
	jQuery(window).scroll(function() {
    var height = jQuery(window).scrollTop();

    if(height  > 350) {
        // do something
        jQuery('.navCustom').removeClass('hide');
    }else{
    	jQuery('.navCustom').addClass('hide');
    }
	});
	jQuery(document).mouseup(function (e)
	{
    var container = jQuery('.popup');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.addClass('hide');
  		jQuery('body').css('overflow', 'auto').off('touchmove');      
    }
	});	
$scope.exit = function(){
	var container = jQuery('.popup');
	container.addClass('hide');
  	jQuery('body').css('overflow', 'auto').off('touchmove');      
}
  // $scope.popupChallenge = '';
  $scope.points = 100;
  $scope.front = 1; 
  $log.currentLevel = $log.LEVELS.debug;


	$scope.date = 'August 19, 2016';
	$scope.weekend=[{
		place: 'Tipitinas',
		points: 75,
		description: 'Alexis of Alexis and the Samauri covers the whole Little Jagged Pill Album',
		lat: 29.9279,
		long: -90.1279
	},{
		place: 'Art for Artsake',
		points: 100,
		description: 'Steal a bottle of wine',
		lat: 29.951065,
		long: -90.071533
		
	}]
	$scope.oldAll=[{
		place: 'St. Charles, Uptown',
		points: 75,
		description: 'take a walk down st. charles from Napoleon to Audobon park at night and finish a bottle of red wine.',
		lat: 29.9279,
		long: -90.1279
	},{
		place: 'Frenchman Street',
		points: 100,
		description: 'Make out with 3 different people in one night on Frenchman St.',
		lat: 29.951065,
		long: -90.071533
		
	},{
		place: 'Bacchanal',
		points: 125,
		description: 'Smoke a joint somewhere in Bacchanal',
		lat: 29.960126,
		long: -90.033251		
	},{
		place: 'Apple Barrel',
		points: 50,
		description: 'Take A Shot with Morgan, the bartender',
		lat: 29.9638,
		long: -90.0577					
	},{
		place: 'The Country Club',
		points: 50,
		description: 'Go to the Saturday drag brunch and tip the queens',
		lat: 29.962687,
		long: -90.044142					
	},{
		place: 'Chickie Wah Wah',
		points: 75,
		description: 'See Alexis and the Samauri Monday residential',
		lat: 29.9667653,
		long: -90.0917809					
	},{
		place: 'Heavens Gate',
		points: 100,
		description: 'Go to a house show here and bring dorritos',
		lat: 29.948919,
		long: -90.117925					
	},]

	$scope.dares = $scope.all;
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

	$scope.currentPage = 0;
	$scope.pageSize = 4; 
	$scope.numberOfPages = function(){
		return Math.ceil($scope.dares.length/$scope.pageSize);
	}

	$scope.upVote = function(arg){
		if($scope.points - 25 >= 0){
			$scope.points = $scope.points - 25; 
			$scope.dares[arg].points = $scope.dares[arg].points + 25;
			if($scope.points == 0){
				jQuery('#pointsRemaining').addClass('red');
			}

		}else{
			console.log('bong');
			jQuery('#pointsRemaining').addClass('red');
		}  

	}
	$scope.downVote = function(arg){
		if($scope.points - 25 >= 0){
			$scope.points = $scope.points - 25; 
			$scope.dares[arg].points = $scope.dares[arg].points - 25;
			if($scope.points == 0){
				jQuery('#pointsRemaining').addClass('red');
			}			 
		}else{
			console.log('bong');
			jQuery('#pointsRemaining').addClass('red');		
		} 

	}
	$scope.lightning = function(arg){
		$scope.popupChallenge = $scope.dares[arg].description;
		jQuery('.popup').removeClass('hide');
		/*
		jQuery('body').css('overflow','hidden');
		jQuery('body').css('position','fixed');
		*/
		jQuery('body').css('overflow', 'hidden').on('touchmove', function(e) {
         e.preventDefault();
    });
	}
	
	
});