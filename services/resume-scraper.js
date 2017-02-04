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
  if(result.length>0) resumeInfo.languages += (lang + ", ");
}
var skills = [" ui ", "user interface", "app ", " iot ", "cloud", "parallel computing", " ai ", "artificial intelligence", "deep learning", "machine learning"];
for(let skill of skills){
  var result = txtFile.grep(skill);
  if(result.length>0) resumeInfo.skills += (skill + ", ");
}
var experience = ["Experience"];
for(let exp of experience){
  var lin = txtFile.lines;
  var where = txtFile.grep(exp, true);
  var toPrint = [where[0].i, (where[0].i)+1, (where[0].i)+2, (where[0].i)+3];
  for(let k in toPrint){
    console.log(lin[k]);
    resumeInfo.experience += lin[k];
  }
 }
console.log(resumeInfo);
