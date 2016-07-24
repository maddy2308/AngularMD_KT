module.exports = function (pg, connectionString) {

    var Q = require('q');
    return {
        createEntry: createEntry,
        findAllEntries: findAllEntries
    };

    function createEntry(entry) {
        var results = [];
        var deferred = Q.defer();

        // Get a Postgres client from the connection pool
        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return deferred.reject({ success: false, data: err});
            }

            // SQL Query > Insert Data
            client.query("INSERT INTO standup_entry(email, display_name, password) values($1, $2, $3)",
                [entry['entry'], entry['complete'], entry['user_id']]);

            // SQL Query > Select Data
            var query = client.query("SELECT * FROM standup_entry ORDER BY standup_entry_id ASC");

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return deferred.resolve(results);
            });
            return deferred.promise;
        });
    }

    function findAllEntries() {
        var results = [];
        var deferred = Q.defer();

        // Get a Postgres client from the connection pool
        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return deferred.reject({ success: false, data: err});
            }

            // SQL Query > Select Data
            var query = client.query("SELECT * FROM standup_entry ORDER BY standup_entry_id ASC");

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return deferred.resolve(results);
            });
        });

        return deferred.promise;
    }
};
