var express = require('express');
var app = express();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/maddy';

var client = new pg.Client(connectionString);
client.connect();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

require("./Server/app")(app, client, pg, connectionString);