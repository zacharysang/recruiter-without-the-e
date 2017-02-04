var GitHub = require('github-api');

var gh = new GitHub();

var user = gh.getUser('zcollins0');

user.listRepos(function(err, repos) {

});