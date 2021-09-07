var http = require('http');
var url = require('url');

function start() {
  var port = 9527;
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request pathname ' + pathname);

    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write('First Server');
    response.end();
  }).listen(port);
  
  console.log(`Server start in localhost:${port}`);
}

exports.start = start;