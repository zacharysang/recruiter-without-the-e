var http = require('http');
// should get ip with request.connection.remoteAddress
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'

function getResultValues(objectIn){
  var formatResult = [];
  for(var x of objectIn){
    // console.log(x);
    var resultVals ={
      source: x.source,
      company:x.company,
      jobtitle: x.jobtitle,
      formattedLocation: x.formattedLocation,
      snippet: x.snippet


    };
    formatResult.push(resultVals);
  }

  console.dir(formatResult);
}

function getIndeedJobs(query,locat){
  if (typeof query === 'undefined') {
    query = ''
  }
  if (typeof locat === 'undefined') {
    locat = ''
  }
  var options = {
    host: 'api.indeed.com',
    path: '/ads/apisearch?publisher=907151921225947&q='+ query +'&l='+ locat +'&sort=&radius=&st=&jt=&start=&limit=10&fromage=7&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
  };

  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      // console.log(str);
      var temp = JSON.parse(str);
      getResultValues(temp.results);
    });
  }
  http.request(options, callback).end();


}


var call = getIndeedJobs('java','Cincinnati,+OH')
// console.log(call);
