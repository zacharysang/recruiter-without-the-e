/**
 * Controller for creating ideal candidate
 */
var gitHub = require('../services/github-scraper');

exports.renderForm = function(req, res) {
    res.render('ideal');
}

exports.postIdeal = function(req, res) {
    var gpa = req.body.GPA;
    var experience = req.body.experience;
    var num_companies = req.body.num_companies;
    var commit_count = req.body.commit_count;
    
    req.session.IdealCandidate = {profile: {gpa: gpa, experience: experience, num_companies: num_companies, commit_count: commit_count}};
    res.redirect('lookup');
}

exports.compare = function(ideal, candidate) {
    Promise.resolve(candidate).then(function(x) {
        var resultlangs = [];
        for (var i = 0; i < ideal.langs.length; i++) {
            for (var k = 0; k < x.languages.length; k++) {
                if (ideal.langs[i] == x.languages[k]) {
                    resultlangs.push(ideal.langs[i]);
                }
            }
        }
        console.log(resultlangs);
    });
}

//compare(id, gitHub.getGitHubInfo('zcollins0'));