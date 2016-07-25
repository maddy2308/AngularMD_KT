module.exports = function (pg, connectionString) {

    var Q = require('q');
    return {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByEmail: findUserByEmail
    };

    function createUser(user) {
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
            client.query("INSERT INTO scrum_user(email, display_name, password) values($1, $2, $3)",
                [user['email'], user['display_name'], user['password']]);

            // SQL Query > Select Data
            var query = client.query("SELECT * FROM scrum_user ORDER BY user_id ASC");

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

    function findAllUsers() {
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
            var query = client.query("SELECT * FROM scrum_user ORDER BY user_id ASC;");

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
    
    function findUserByEmail(email) {
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
            var query = client.query("SELECT * FROM scrum_user WHERE email = $1;", [email]);

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