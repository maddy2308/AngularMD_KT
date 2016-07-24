module.exports = {
    createTable: createTable
};

function createTable(client) {
    var query = client.query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
    query.on('end', function () {
        client.end();
    });
}