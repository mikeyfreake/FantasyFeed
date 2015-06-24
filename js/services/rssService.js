(function(){

	var app = angular.module('fantasyFeed');
	
	app.factory('rssService', ['$http', function($http) {
		
		var feedList = [
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
		];
		
		var parseFeed = function(url) {
			return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' 
				+ encodeURIComponent(url));
		};
		
		var getFeedList = function() {
			return feedList;
		};
		
		return {
			parseFeed : parseFeed,
			getFeedList : getFeedList
		};
	}]);
	
})();
