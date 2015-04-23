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
		}
	]);

	app.controller('FeedController', ['rssFeeds', '$scope', 'FeedLoaderService', function(rssFeeds, $scope, FeedLoader) {

		console.log('FeedController called.');

		$scope.feeds = rssFeeds;

		$scope.loadFeeds = function() {
			console.log('loadFeeds called.');

			FeedLoader.parseFeed('http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=article&count=12&format=atom').then(function(res){
				$scope.rotoWorld = res.data.responseData.feed.entries;
			});

			// for (var i = 0; i < rssFeeds.length; i++) {
			// 	FeedLoader.parseFeed(rssFeeds[i].url).then(function(res){
			// 		$scope.rotoWorld = res.data.responseData.feed.entries;
			// 	});
			// }

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