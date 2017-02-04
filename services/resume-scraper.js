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
/*        var ed = [item.text].find('Education');
        console.log(ed);
        if(ed){
          console.log("Help");
        }*/
     }
    else
      console.warn(item);
  });
}

var filename = process.argv[2];
if (!filename) {
  console.error("please provide the name of a PDF file");
}
else {
  console.warn("printing raw items from file:", filename, "...");
  printRawItems(filename, function(){
    console.warn("done.");
  });
}

/*var f = require('fs');
var word = "Education";
f.readFile("output.txt", function(e, cont){
  var re = new RegExp('^.*' + word + '.*$', 'm');
  var m = re.exec(cont);
  if (m)
    console.log('Word %j found on line: %j', word, m[0]);
  else
    console.log('Word %j not found', word);
});*/
var JFile=require('jfile');
var txtFile=new JFile("output.txt");
var buzzwords = ["c++", "java", "javascript", " iot ", "cloud", "parallel computing", " ai ", "artificial intelligence", "html", "css", "deep learning", "machine learning", "python"];
for(let word of buzzwords){
  var result = txtFile.grep(word);
  if(result.length>0) console.log(word);
}
/*var f = require('fs');
var s = fs.createReadStream("output.txt");
var found = false;
s.on('data', function(d){
  if(!found) found=!!('' + d).match("Education");
});
s.on('error', function(e){
  then(e, found);
});
s.on('close', function(e){
  then(e, found);
});*/