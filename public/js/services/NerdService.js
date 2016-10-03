angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/challenges');
        },

        
        post : upvote() = function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },
        /*
        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
        */
    }     
	

}]);