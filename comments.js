// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    var fileContent = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fileContent);
  } else if (pathname === '/add') {
    var comment = urlObj.query;
    comments.unshift(comment);
    res.end(JSON.stringify(comments));
  } else if (pathname === '/get') {
    var json = JSON.stringify(comments);
    res.end(json);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});
server.listen(8080, function() {
  console.log('server is running at http://localhost:8080');
});
//