(function(){

	var app = angular.module('fantasyFeed');

	app.controller('FeedController', ['rssFeeds', '$scope', 'rssService', function(rssFeeds, $scope, rssService) {

		console.log('FeedController called.');

		$scope.feeds = rssFeeds;
		
		$scope.loadFeeds = function() {
			console.log('loadFeeds called.');

			//Closure necessary to keep track of index variable.
			function callBackCreator(i) {
				return function(res) {
					$scope.feeds[i].entries = res.data.responseData.feed.entries;
				};
			};
			
			for (var i = 0; i < rssFeeds.length; i++) {
				var callBack = callBackCreator(i);
			 	rssService.parseFeed(rssFeeds[i].url).then(callBack);
			};

		};
		
		$scope.formatDate = function(date) {
			return new Date(date).toLocaleString();
		};

	}]);
})();