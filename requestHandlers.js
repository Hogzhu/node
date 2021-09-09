var exec = require('child_process').exec;
var formidable = require('formidable');
var fs = require('fs');

function start(response) {
  console.log('开始处理访问函数');

  // // 模拟休眠10秒
  // function sleep(time) {
  //   var startTime = new Date().getTime();
  //   while(new Date().getTime() < startTime + time);
  // }
  // sleep(10000);
  
  // // 读取文件列表并返回
  // exec('dir', function(error, stdout, stderr) {
  //   response.writeHead(200, {
  //     "Content-Type": "text/plain"
  //   });
  //   response.write(stdout);
  //   response.end();
  // })
  
  // 展示用户上传文件的表单
  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-type" content="text/html" charset=UTF-8 />' + 
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    // '<textarea name="text" rows="20" cols="60" /></textarea>' +
    '<input type="file" name="upload" />' +
    '<input type="submit" value="Submit file" />' +
    '</form>' +
    '</body>' +
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

  console.log('结束处理访问函数');
}

/**
 * 上传文件
 */
function upload(response, request) {
  console.log('开始处理上传函数');

  // 创建读取图片的表单
  var form = new formidable.IncomingForm();
  // parse
  form.parse(request, function(err, fields, files) {
    var currentPath = files.upload.path;
    var targetPath = __dirname + '/tmp/test.png';
    console.log(`开始迁移文件...\n当前文件路径：${currentPath}\n目标文件路径：${targetPath}`);
    fs.renameSync(currentPath, targetPath);
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write('已经接受到图片了: <br/>');
    response.write('<img src="./test.png" />');
    response.end();
  })
  

  console.log('结束处理上传函数');
}

/**
 * 读取展示文件
 */
function show(response, postData) {
  console.log('现在处理show函数');

  fs.readFile('./tmp/test.png', 'binary', function(err, file) {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '\n');
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(file, 'binary');
      response.end();
    }
  })
}

function deletePng() {
  var link = './tmp/test.png';
  fs.unlinkSync(link, function(err) {
    if (err) {
      console.log('删除出错' + err);
    } else {
      console.log('删除成功' + link);
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.deletePng = deletePng;