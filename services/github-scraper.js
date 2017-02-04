var GitHub = require('github-api');
var Contributions = require('github-user-contributions');

function analyzeGitHub() {
    var candidateGitHub = new Object();

    var gh = new GitHub();

    var user = gh.getUser('zcollins0');

    user.listRepos(function(err, repos) {
        //console.log(repos);
    });

    user.getProfile(function(err, person) {
        candidateGitHub.name = person.name;
        candidateGitHub.company = person.company;
        candidateGitHub.bio = person.bio;
        candidateGitHub.public_repo_count = person.public_repos;
        console.log(candidateGitHub);
    });
}

analyzeGitHub();