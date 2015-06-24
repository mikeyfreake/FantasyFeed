(function() {

	var app = angular.module('fantasyFeed',["ngRoute"]);

	//Globals
/* 	app.value('rssFeeds', [
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
	]); */
	
	app.config(function($routeProvider) {
        $routeProvider
            .when("/index", {
                templateUrl: "views/feedView.html",
                controller: "feedController"
            })
			.when("/addFeed", {
				templateUrl: "views/addFeedView.html",
				controller: "feedController"
			})
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "repo.html",
                controller: "RepoController"
            })
            .otherwise({
                redirectTo: "/index"
            });
    });

})();