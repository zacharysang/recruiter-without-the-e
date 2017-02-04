var GitHub = require('github-api');
var unique = require('array-unique');
var usercontribs = require('github-user-contributions');

exports.getGitHubInfo = function(userToRead) {
    
    var gh = new GitHub({
        username: process.env.GITHUB_USERNAME,
        password: pcocess.env.GITHUB_PASSWORD
    });

    var user = gh.getUser(userToRead);

    var GitHubProfile = {
        name: '',
        company: '',
        location: '',
        bio: '',
        repo_count: '',
        languages: [],
        commit_count: 0
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
        '746755c3230fe2bda645',
        process.env.GITHUB_API_KEY);

    var commitcounter = new Promise(function(resolve, reject) {
        contribclient.commits(userToRead, function(err, data) {
            for (var i = 0; i < data.length; i++) {
                GitHubProfile.commit_count += data[i][0].commits.length;
            }
            resolve(GitHubProfile);
        })
    });

    return Promise.all([repos, profile, commitcounter]).then(function() {
        return GitHubProfile;
    });
}

/*var prof = getGitHubInfo('zcollins0');
prof.then(function() {
    console.log(prof);
});*/
