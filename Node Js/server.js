var http = require('http')
var enroll = 4091
var gr = 142001
http.createServer(function (req, res) {
  res.writeHead(200,{'content-type':'text/html'})
  res.write('<h2><b>Hemang Lakhadiya</b></h2><br>')
  res.write(`My Enrollment No <b>${enroll}</b><br>`)
  res.write(`My GR No <b>${gr}</b><br>`)
  res.end("Thank you for visiting my server<br>")
}).listen(4091)
console.log('Server running at http://127.0.0.1:4091/')