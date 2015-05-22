(function(){

	var app = angular.module('fantasyFeed');
	
	app.factory('rssService', ['$http', function($http) {
		
		var parseFeed = function(url) {
			return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' 
				+ encodeURIComponent(url));
		};
		
		return {
			parseFeed : parseFeed
		};
	}]);
	
})();
