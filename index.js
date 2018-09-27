var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var dynamic = require('./routes/dynamic');
var app = express();
var port = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('assets'));
app.use('/api', api);
app.use('/', dynamic);


app.listen(port, function() {
  console.log('Server complete on localhost:' + port);
});
