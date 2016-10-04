angular.module('NerdCtrl', []).controller('NerdController', function($scope,$http) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	
	$http.get('/verify')
			.success(function(data){
				console.log('successful');
			})
			.error(function(data){
				console.log('Error: ' + data);
			});

});