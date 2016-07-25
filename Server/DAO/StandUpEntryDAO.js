module.exports = function (pg, connectionString) {

    var Q = require('q');
    return {
        createEntry: createEntry,
        findAllEntries: findAllEntries
    };

    function createEntry(userId, entry) {

        var deferred = Q.defer();

        // Get a Postgres client from the connection pool
        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                return deferred.reject({ success: false, data: err});
            }

            var promises = [];
            // SQL Query > Insert Data
            for (var index in entry) {
                promises.push(
                    client.query("INSERT INTO standup_entry (entry, user_id) VALUES($1, $2)", [entry[index]['plan'], userId]));
            }
            Q.all(promises).then(function(resp) {
                deferred.resolve("All inserts completed");
            }, function(err) {
                return deferred.reject({ success: false, data: err});
            })
        });

        return deferred.promise;
    }

    function findAllEntries() {
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
            var JOIN_QUERY = "SELECT entry, entry_date, email, display_name FROM standup_entry se " +
                "JOIN scrum_user su ON se.user_id = su.user_id " +
                "ORDER BY standup_entry_id ASC";

            client.query(JOIN_QUERY, function (err, result) {
                //call `done()` to release the client back to the pool
                done();

                if (err) {
                    return deferred.reject({success: false, data: err});
                }
                return deferred.resolve(result.rows);
            });
        });

        return deferred.promise;
    }
};
