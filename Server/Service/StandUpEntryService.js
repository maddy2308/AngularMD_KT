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
            .then(function (res, error) {
                if (!error) {
                    return entryDao.createEntry(res[0]['user_id'], entries);
                } else {
                    console.log(error);
                }
            })
            .then(function (resp) {
                findAllEntries(req, res);
            });
    }

    function findAllEntries(req, res) {
        entryDao.findAllEntries().then(function (response, error) {
            if (!error) {
                res.send(response);
            } else {
                res.error("User not found");
            }
        });
    }
};