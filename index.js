'use strict';
const http = require('http');
const pug = require('pug');
const server = http.createServer((req, res) => {
  console.info('Requested by ' + req.socket.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  switch (req.method) {
    case 'GET':

      （...中略...）

    case 'POST':
      let rawData = '';
      req.on('data', (chunk) => {
        rawData = rawData + chunk;
      }).on('end', () => {
        const qs = require('querystring');
        const answer = qs.parse(rawData);
        const body = answer['name'] + 'さんは' +
          answer['favorite'] + 'に投票しました';
        console.info(body);
        res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
          body + '</h1></body></html>');
        res.end();
      });
      break;
    default:
      break;
  }
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});