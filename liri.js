var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');
var fs = require('fs');


var userInput = process.argv[2];

var args = process.argv;

var song; 

var movie; 

if (userInput === "my-tweets"){
	var twitclient = new twitter(keys.twitterKeys);
	var parameters = {screen_name: 'sunnny_e'};
	twitclient.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error){
			for (var i=0; i<tweets.length; i++){
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log('next tweet');
			}
		} else {
			console.log('Could not get tweets');
		}
	});
}

if (userInput === "spotify-this-song"){
	var songToSearch = process.argv[3];
	spotify.search({type: 'track', query: songToSearch}, function(err, data){
		if (err){
			console.log('Something went wrong we could not find your song');
			return;
		}
		var results = data.tracks.items;

		for (var i=0; i<results.length; i++){
			console.log("result #" + (i+1));
			console.log('Artist name: ' + results[i].artists);
			console.log('Track name: ' + results[i].name);
			console.log('Preview: ' + results[i].preview_url);
			console.log('album name: ' + results[i].album.name);
			console.log('---');
		}
	});
};

if (userInput === 'movie-this'){
	var movie = process.argv.slice(3).join('+');
	request('http://www.omdb.com/?t=' + movie + '&y=&plot=short&r=json&tomatoes=true', function(error, response, body ){
	if (!error){
		var response = JSON.parse(body);
		console.log('Title: ' + response.Title);
		console.log('Release Year: ' + response.Year);
		console.log('IMDB Rating: ' + response.imdbRating);
		console.log('Country: ' + response.Country);
		console.log('Language: ' + response.Language);
		console.log('Plot: ' + response.Plot);
		console.log('Actors: ' + response.Actors);
		console.log('Rotten tomatoes rating: ' + response.tomatoRating);
		console.log('Rotten tomatoes Url: ' + response.tomatoURL);
	}	
	});
}

if(userInput === "do-what-it-says"){
	fs.readFile('random.txt', 'utf8', function(error, data){
		if(error){
			console.log("There is an error");
		}else{
			var result = data.split(',');
			console.log(result);
			var song = result[2]
			spotify.search({type: 'track', query: songToSearch}, function(err, data){
		if (err){
			console.log('Something went wrong we could not find your song');
			return;
		}
		var results = data.tracks.items;

		for (var i=0; i<results.length; i++){
			console.log("result #" + (i+1));
			console.log('Artist name: ' + results[i].artists);
			console.log('Track name: ' + results[i].name);
			console.log('Preview: ' + results[i].preview_url);
			console.log('album name: ' + results[i].album.name);
			console.log('---');
		}
	});
		} 
	})
} 