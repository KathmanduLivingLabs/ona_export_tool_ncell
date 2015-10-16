var http = require("http");
var fs = require("fs");
var spawn = require('child_process').spawn;

var page = fs.readFileSync("index.html")
var server = http.createServer(function(request, response) {
  //response.writeHead(200, {"Content-Type": "text/html"});
  //response.write(page);
  //response.end();
});

server.listen(8000);
console.log("Server is listening");

server.on('request', function(a,b){
  //console.log(a);
  console.log("hello");
  var deploySh = spawn('sh', [ 'ona-get-data-and-run-extractor.sh' ], {
  cwd: process.env.HOME + './',
  env:_.extend(process.env, { PATH: process.env.PATH + '/usr/local/bin' })
});
});