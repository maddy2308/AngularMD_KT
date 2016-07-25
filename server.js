var express = require('express');
var multer = require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/maddy';

var client = new pg.Client(connectionString);
client.connect();

/*Run the server.*/

var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

require("./Server/app")(app, client, pg, connectionString);