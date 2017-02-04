var GitHub = require('github-api');
var unique = require('array-unique');
var usercontribs = require('github-user-contribs');

var gh = new GitHub({
    username: 'zcollins0',
    password: ''
});

console.log(gh.password);

var user = gh.getUser('zcollins0');

function getGitHubInfo() {
    var GitHubProfile = {
        name: '',
        company: '',
        location: '',
        bio: '',
        repo_count: '',
        languages: []
    };

    var profile = user.getProfile(function(err, person) {
        GitHubProfile.name = person.name;
        GitHubProfile.company = person.company;
        GitHubProfile.location = person.location;
        GitHubProfile.bio = person.bio;
        GitHubProfile.repo_count = person.public_repos;
    });

    var repos = user.listRepos(function(err, repos) {
        for (var i = 0; i < repos.length; i++) {
            if (repos[i].language != null) {
                GitHubProfile.languages.push(repos[i].language);
            }
        }
        GitHubProfile.languages = unique(GitHubProfile.languages);
    });

    var contribclient = usercontribs.client(
        "",
        ""
    );

    contribclient.commits("zcollins0", function(err, data){
        console.log(data);
    });

    Promise.all([repos, profile]).then(function() {
        console.log(GitHubProfile);
    });

}

getGitHubInfo();
