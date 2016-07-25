module.exports = function (app, entryDao) {
    app.post("/api/v1/entry", createEntry);
    app.get("/api/v1/entry", findAllEntries);
    // app.get("/f360/api/entry/:id", findUserById);
    // app.put("/f360/api/entry", updateUser);
    // app.delete("/f360/api/entry/:id", deleteUser);

    function createEntry(req, res) {
        var entry = req.body;
        entryDao.createEntry(entry)
            .then(function(response) {
                findAllEntries(req, res);
            });
    }

    function findAllEntries(req, res) {
        entryDao.findAllEntries().then(function(response) {
            res.json(response);
        });
    }
};