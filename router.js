function route(handle, pathname, response, request) {
  console.log('request route is ' + pathname);

  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, request);
  } else {
    console.log(`未找到${pathname}对应的处理函数`);
    response.writeHead(404, {
      "Content-Type": "text/plain"
    });
    response.write('404 not found');
    response.end();
  }
}

exports.route = route;