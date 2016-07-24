module.exports = {
    createUserStandUpEntryTable: createUserStandUpEntryTable
};

function createUserStandUpEntryTable(client) {
    var createSql = 'CREATE TABLE IF NOT EXISTS ' +
        'standup_entry (standup_entry_id SERIAL PRIMARY KEY, ' +
        'entry VARCHAR(40) not null, ' +
        'complete BOOLEAN, ' +
        'entry_date DATE DEFAULT now(), ' +
        'user_id Integer REFERENCES Users(user_id))';

    var query = client.query(createSql);
    query.on('end', function () {
        client.end();
    });
}



