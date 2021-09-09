var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 劫持console.log，不输出关于favicon.ico的任何信息
var originLog = console.log || global.console.log || window.console.log;
console.log = function(str) {
  if (!(/\.(ico|icon)/g).test(str)) {
    originLog(str);
  }
}

// 根据路由规则匹配处理函数
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;
handle['/deletePng'] = requestHandlers.deletePng;

server.start(router.route, handle);