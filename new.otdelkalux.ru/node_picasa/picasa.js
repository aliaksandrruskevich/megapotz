var _ = require('underscore');

var readline = require('readline');
var Promise = require('promise');

var request = Promise.denodeify(require('request'));
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '213137771625-2r9oavbpisqk0cvcj68euq55sfvbkc7g.apps.googleusercontent.com';
var CLIENT_SECRET = 'qS6ReTgAiks7HWMHJSJJbXpN';
var REDIRECT_URL = 'https://www.otdelkalux.ru/oauth2callback';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
	// generate consent page url
	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline', // will return a refresh token
		scope: 'https://picasaweb.google.com/data/' // can be a space-delimited string or an array of scopes
	});

	console.log('Visit the url: ', url);
	rl.question('Enter the code here:', function (code) {
		// request access token
		oauth2Client.getToken(code, function (err, tokens) {
			// set tokens to the client
			// TODO: tokens should be set by OAuth2 client.
			oauth2Client.setCredentials(tokens);
			callback();
		});
	});
}

function getCollection(uri) {
	//console.info(uri, oauth2Client.credentials.access_token);
	return request({
		method: 'GET',
		headers: {
			'GData-Version': '2',
			'Authorization': 'Bearer' + ' ' + 'ya29.8wCCdaq4AU1iS1aHSRX6l_WH60ovXjuoxilK9yyY1sTo4eraEMvaOFkbYyUwp9jxy2qsqDvtgw7B8g',//*/oauth2Client.credentials.access_token,
			"Content-Type": 'text/xml;'
		},
		uri: uri
	});
}

// retrieve an access token
//getAccessToken(oauth2Client, function () {
	var keys = Object.keys(data);

	var promises = keys.map(function (key) {
		return getCollection(data[key].picasaURI);
	});

	Promise.all(promises).done(function (results) {
		keys.forEach(function (key, i) {
			var res = results[i];
			parser.parseString(res.body, function (err, result) {
				var transformed = {};
				transformed.title = result.feed.title[0];
				transformed.subtitle = result.feed.subtitle[0];
				transformed.location = result.feed['gphoto:location'][0];
				transformed.icon = result.feed.icon[0];

				transformed.entry = _.map(result.feed.entry, function (entry) {
					return {
						title: entry.title[0],
						summary: entry.summary[0],
						width: +entry['gphoto:width'][0],
						height: +entry['gphoto:height'][0],
						src: entry.content[0].$.src
					};
				});

				_.extend(data[key], transformed);
			});
		});

		fs.writeFileSync('res.json', JSON.stringify(data, undefined, 1), {flag: 'w'});
		process.exit(1);
	}, function (err) {
		console.info(err);
	});

//});

