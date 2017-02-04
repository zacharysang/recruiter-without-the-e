var GitHub = require('github-api');
var unique = require('array-unique');
var usercontribs = require('github-user-contributions');

exports.getGitHubInfo = function(userToRead) {
    
    var gh = new GitHub({
<<<<<<< HEAD
        username: userToRead,
        password: 'abc283xyz'
=======
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD
>>>>>>> master
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
<<<<<<< HEAD
        'b92a8af596ecac300b9867b21f4422dc4a263b4e');
=======
        process.env.GITHUB_API_KEY);
>>>>>>> master

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

// How to use
// var prof = exports.getGitHubInfo('zcollins0');
// prof.then(function() {
//     console.log(prof);
//});
