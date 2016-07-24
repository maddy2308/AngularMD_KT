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

var todoDAO = require("./Server/DAO/TodoDAO.js");
require("./Server/model/Todo.js").createTable(client);

app.post('/api/v1/todos', function(req, res) {
    console.log("testing post api call");
    res.json(todoDAO.postTodoItem(pg, connectionString));
});


app.get('/api/v1/todos', function(req, res) {
    console.log("testing get api call");
    todoDAO.getAllTodos(pg, connectionString).then(function(response) {
        res.json(response);
    });
});