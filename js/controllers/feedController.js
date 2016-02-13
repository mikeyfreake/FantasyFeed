(function(){

	var app = angular.module('fantasyFeed');

	app.controller('feedController', ['$scope', 'rssService', function($scope, rssService) {

		console.log('feedController called.');

		$scope.feeds = rssService.getFeedList();
		
		$scope.loadFeeds = function() {
			console.log('loadFeeds called.');

			//Closure necessary to keep track of index variable.
			function callBackCreator(i) {
				return function(res) {
					$scope.feeds[i].entries = res.data.responseData.feed.entries;
				};
			};
			
			var rssFeedList = rssService.getFeedList();
			for (var i = 0; i < rssFeedList.length; i++) {
				var callBack = callBackCreator(i);
			 	rssService.parseFeed(rssFeedList[i].url).then(callBack);
			};

		};
		
		$scope.formatDate = function(date) {
			return new Date(date).toLocaleString();
		};
		
		$scope.addFeed = function() {
			//TODO - validate.
			//TODO - parse feed name.
			rssService.addFeed(
				{
					league: $scope.league,
					url: $scope.url
				}
			);
		};

	}]);
})();