$(document).ready(function(){
	console.log('DOM loaded. Loading RSS feeds...');
	parseRSS('http://www.rotoworld.com/rss/feed.aspx?sport=nfl', showFeed);
});

function parseRSS(url, callback) {
  $.ajax({
    //url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
	url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed);
    }
  });
}

function showFeed(data) {
	
}