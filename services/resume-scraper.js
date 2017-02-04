var LOG = require("C:/Users/ltebb/node_modules/pdfreader/lib/LOG.js").toggle(false);
var PdfReader = require("C:/Users/ltebb/node_modules/pdfreader/index.js").PdfReader;
var fs = require('graceful-fs');


function printRawItems(filename, callback){
 new PdfReader().parseFileItems(filename, function(err, item){
    if (err)
      callback(err);
    else if (!item)
      callback();
    else if (item.file)
      console.log("file =", item.file.path);
    else if (item.page)
      console.log("page =", item.page);
    else if (item.x)
     {
        var logStream = fs.createWriteStream("C:/Users/ltebb/workdir/recruiter-without-the-e/services/output.txt");
        fs.appendFile('output.txt', "\n" + item.text, function(er){
          callback(er);
        });
     }
    else
      console.warn(item);
  });
}

var resumeInfo = {
  languages: '',
  skills: '',
  education: '',
  experience: '',
};

var filename = process.argv[2];
if (!filename) {
  console.error("please provide the name of a PDF file");
}
else {
  console.warn("printing raw items from file:", filename, "...");
  printRawItems(filename, function(){
  });
}

var JFile=require('jfile');
var txtFile=new JFile("output.txt");
var languages = [" c ", "c#", "php", "ruby", " go ", "c++", "java", "javascript",  "html", "css", "python"];
for(let lang of languages){
  var result = txtFile.grep(lang);
  if(result.length>0){
    resumeInfo.languages += (lang + ", ");
  }
}

var skills = [" ui ", "user interface", "app ", " iot ", "cloud", "parallel computing", " ai ", "artificial intelligence", "deep learning", "machine learning"];
for(let skill of skills){
  var result = txtFile.grep(skill);
  if(result.length>0) resumeInfo.skills += (skill + ", ");
}

var experience = ["Work History", "Experience"];
var found = false;
for(let exp of experience){
  if(!found){
    var lin = txtFile.lines;
    var where = txtFile.grep(exp, true);
    if(where.length>0){
      var toPrint = where[0].i;
      for(var k=toPrint; k<75; k++){
        resumeInfo.experience += lin[k];
        found = true;
      }
    }
  }
}

var education = ["Education", "University", "High School"];
var found = false;
for(let edu of education){
  if(!found){
    var lin = txtFile.lines;
    var where = txtFile.grep(edu, true);
    if(where.length>0){
      var toPrint = where[0].i;
      for(var k=toPrint; k<25; k++){
        resumeInfo.education += lin[k];
        found = true;
      }
    }
  }
}
console.log(resumeInfo);
return(resumeInfo);
