/**
 * Controller for lookups
 */
var util = require('util');
var githubScraper = require('../services/github-scraper');
var resumeScraper = require('../services/resume-scraper.js');
//var resumeScraper = require('../services/resume-scraper');

exports.renderForm = function(req, res) {
    res.render('lookup');
}

exports.doLookup = function(req, res) {
    var github = req.body.github;
    var resume;
    try {
        resume = req.file.path;
    } catch (e) {
        console.log("Resume field blank");
    }
    
        console.log(req.session.IdealCandidate);

    req.validate('github', 'No Github Provided').notEmpty();
    // This might not work because I'm not sure if validate checks files
    req.validate('resume', 'No resume provided').notEmpty();

    req.getValidationResult().then(function(result) {
        if (result.length > 1) {
            res.send("No information entered!");
            return;
        }
    })


    if (github.indexOf('/') != -1) {
        github = github.substring(github.lastIndexOf('/'), github.length());
    }

    var githubInfo = githubScraper.getGitHubInfo(github);
    var resumeInfo;
    if (resume) {resumeInfo = resumeScraper.getResumeInfo(resume);}

    Promise.resolve(githubInfo).then(function(githubStuff) {
    //githubInfo.then(function() {
        res.render('profile', {profile: {
            name: githubStuff.name,
            location: githubStuff.location,
            bio: githubStuff.bio,
            repo_count: githubStuff.repo_count,
            languages: githubStuff.languages,
            commit_count: githubStuff.commit_count,
            skills: resumeInfo.skills,
            education: resumeInfo.education,
            experience: resumeInfo.experience
    }})
    })

}