(function() {

	var app = angular.module('fantasyFeed',[]);

	//Globals
	app.value('rssFeeds', [
		{
			name: 'Rotoworld Articles',
			url: 'http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=article&count=12&format=atom', 
			description: 'Rotoworld Team articles'
		},{
			name: 'Rotoworld Player News',
			url: 'http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=news&count=12&format=atom',
			description: 'Rotoworld Player news'
		},{
			name: 'NFL Headlines',
			url: 'http://www.nfl.com/rss/rsslanding?searchString=home',
			description: 'NFL Headlines'
		}
	]);

	app.controller('FeedController', ['rssFeeds', '$scope', 'FeedLoaderService', function(rssFeeds, $scope, FeedLoader) {

		console.log('FeedController called.');

		$scope.feeds = rssFeeds;
		
		$scope.loadFeeds = function() {
			console.log('loadFeeds called.');

			//Closure necessary to keep track of index variable.
			function callBackCreator(i) {
				return function(res) {
					$scope.feeds[i].entries = res.data.responseData.feed.entries;
				};
			}
			
			for (var i = 0; i < rssFeeds.length; i++) {
				var callBack = callBackCreator(i);
			 	FeedLoader.parseFeed(rssFeeds[i].url).then(callBack);
			}

		};
		
		$scope.formatDate = function(date) {
			return new Date(date).toLocaleString();
		};

	}]);

	app.factory('FeedLoaderService', ['$http', function($http) {
		return {
			parseFeed : function(url) {
				return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
			}
		};
	}]);
})();