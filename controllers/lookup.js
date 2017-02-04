/**
 * Controller for lookups
 */

var githubScraper = require('../services/github-scraper');
//var resumeScraper = require('../services/resume-scraper');

exports.renderForm = function(req, res) {
    res.render('lookup');
}

exports.createProfile = function(req, res) {
    var github = req.body.github;
    var resume = req.files.resume;

    req.checkBody('github', 'No Github Provided').notEmpty();
    // This might not work because I'm not sure if validate checks files
    req.validate('resume', 'No resume provided').notEmpt();

    req.getValidationResult().then(function(result) {
        if (result.length() > 1) {
            res.send("No information entered!");
            return;
        }
    })

    if (github.indexOf('/') != -1) {
        github = github.substring(github.lastIndexOf('/'), github.length());
    }

    var githubInfo = githubScraper.getGitHubInfo(github);
    githubInfo.then(function() {
        console.log(githubInfo);
    });

    //Promise.all([githubInfo, resumeInfo]).then(function() {})

}