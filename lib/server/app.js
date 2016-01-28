var express = require('express');
var app = express();
var port = 4000;

app.use(express.static(__dirname + '/../../build'));
app.listen(port, function (err) {
  if (err) return console.error(JSON.stringify(err));
  console.log('Listening on port ' + port);
});
