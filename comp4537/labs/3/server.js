const http = require('http');
const url = require('url');
const utils = require('./myModule');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text', 'Access-Control-Allow-Origin': '*' });
  const q = url.parse(req.url, true).query;
  if (q.name) {
    res.end(`Hello ${q.name}, the current server time is ${utils.formatAMPM(new Date())}`);
  } else {
    res.end('I do not know your name.');
  }
}).listen(8081);