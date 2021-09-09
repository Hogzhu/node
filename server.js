var http = require('http');
var url = require('url');

// 处理访问的请求
function start(route, handle) {
  var port = 9527;
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request pathname ' + pathname);

    route(handle, pathname, response, request);

  }).listen(port);
  
  console.log(`Server start in localhost:${port}`);
}

exports.start = start;