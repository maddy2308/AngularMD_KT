module.exports = function (app, entryDao, userDao) {
    app.post("/api/v1/entry/:email", createEntry);
    app.get("/api/v1/entry", findAllEntries);
    // app.get("/f360/api/entry/:id", findUserById);
    // app.put("/f360/api/entry", updateUser);
    // app.delete("/f360/api/entry/:id", deleteUser);

    function createEntry(req, res) {
        var entries = req.body;
        var email = entries[0].email;

        userDao.findUserByEmail(email)
            .then(function (res) {
                return entryDao.createEntry(res[0]['user_id'], entries);
            }, function(err) {
                res.error("User not found");
            })
            .then(function (response) {
                findAllEntries(req, res);
            }, function(err) {
                res.error("User not found");
            });
    }

    function findAllEntries(req, res) {
        entryDao.findAllEntries().then(function(response) {
            res.json(response);
        });
    }
};