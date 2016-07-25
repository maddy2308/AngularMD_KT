module.exports = {
    createUserTable: createUserTable
};

function createUserTable(client) {
    var createSql = 'CREATE TABLE IF NOT EXISTS scrum_user ( ' +
        'user_id SERIAL PRIMARY KEY,' +
        'email VARCHAR(80) NOT NULL, ' +
        'display_name VARCHAR(50) NOT NULL,' +
        'password CHAR(41) NOT NULL);';

    var query = client.query(createSql);
    query.on('end', function () {
        client.end();
    });
}

