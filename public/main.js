var urlString = window.location.href;
var hashSplit = urlString.split("#");
var furtherSplit = hashSplit[1].split("&");
var tokenString = furtherSplit[0];
var tokenSplit = tokenString.split("=");
var token = tokenSplit[1];

var echonestJsonResponse;
var spotifyJsonResponse;

var mySpotifyRequest;
var myEchonestRequest;

var artistUri = encodeURIComponent(artistName);
var trackUri = encodeURIComponent(trackName);
var echonestUri = "http://developer.echonest.com/api/v4/song/search?api_key= PDLZEPLPQZILVK7MU&format=json&results=50&artist="
			+ artistUri + "title=" + trackUri + "&bucket=audio_summary&sort=energy-desc";




var artistName;
var trackName;

var tempo;


var table = document.getElementById("oktable");

var spotifyUri = "https://api.spotify.com/v1/me/tracks?limit=50";


mySpotifyRequest = new XMLHttpRequest();
mySpotifyRequest.open("GET", spotifyUri, true);
mySpotifyRequest.setRequestHeader("Authorization", "Bearer " + token);
mySpotifyRequest.onreadystatechange = processSpotifyResponse;
mySpotifyRequest.send();
	

function processSpotifyResponse() {
	if (this.readyState === 4 && this.status === 200) {
		spotifyJsonResponse = JSON.parse(mySpotifyRequest.responseText);
		
		processEchonestResponse();
		listTracks();
	}
}

function processEchonestResponse() {
	for (i = 0; i < spotifyJsonResponse.items.length; i++) {
		artistName = spotifyJsonResponse.items[i].track.artists[0].name;
		trackName = spotifyJsonResponse.items[i].track.name;
		echonestUri = "http://developer.echonest.com/api/v4/song/search?api_key=PDLZEPLPQZILVK7MU&format=json&results=1&artist="
				+ encodeURIComponent(artistName) + "&title=" + encodeURIComponent(trackName) + "&bucket=audio_summary";

		myEchonestRequest = new XMLHttpRequest();
		myEchonestRequest.open("GET", echonestUri, true);
		myEchonestRequest.onreadystatechange = processEchonestResponse;
		myEchonestRequest.send();
		if (this.readyState === 4 && this.status === 200) {
				echonestJsonResponse = JSON.parse(myEchonestRequest.responseText);
				console.log(echonestJsonResponse);
		}
	}
}


function listTracks() {
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = "Artist"
		cell2.innerHTML = "Track Name"

	for (i = 0; i < spotifyJsonResponse.items.length; i++) {
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = spotifyJsonResponse.items[i].track.artists[0].name;
		cell2.innerHTML = spotifyJsonResponse.items[i].track.name;
	}
	 //yo
}



