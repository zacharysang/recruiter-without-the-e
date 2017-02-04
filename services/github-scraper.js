var GitHub = require('github-api');

var gh = new GitHub();

var user = gh.getUser('zcollins0');

user.getProfile(function(err, person) {
    console.log(person);
});
