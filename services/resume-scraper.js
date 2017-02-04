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

var JFile=require('jfile');
var txtFile=new JFile("output.txt");
var buzzwords = [" app ", "c++", "java", "javascript", " iot ", "cloud", "parallel computing", " ai ", "artificial intelligence", "html", "css", "deep learning", "machine learning", "python"];
for(let word of buzzwords){
  var result = txtFile.grep(word);
  if(result.length>0) console.log(word);
}