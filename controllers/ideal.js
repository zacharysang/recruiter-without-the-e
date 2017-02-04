/**
 * Controller for creating ideal candidate
 */
var gitHub = require('../services/github-scraper');

exports.renderForm = function(req, res) {
    res.render('ideal');
}

var id = {
    langs:["python","Java"]
}

function compare(ideal, candidate) {
    Promise.all([candidate]).then(function() {
        var resultlangs = [];
        for (var i = 0; i < ideal.langs.length; i++) {
            for (var k = 0; k < candidate.languages.length; k++) {
                if (ideal.langs[i] == candidate.languages[k]) {
                    resultlangs.push(ideal.langs[i]);
                }
            }
        }
        console.log(resultlangs);
    });
}

compare(id, gitHub.getGitHubInfo('zcollins0'));