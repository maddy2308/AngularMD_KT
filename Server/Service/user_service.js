module.exports = function (app, userDao) {
    app.post("/api/v1/user", createUser);
    app.get("/api/v1/user", findAllUsers);
    // app.get("/f360/api/user/:id", findUserById);
    // app.put("/f360/api/user", updateUser);
    // app.delete("/f360/api/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        userDao.createUser(user)
            .then(function(response) {
                findAllUsers(req, res);
            });
    }

    function findAllUsers(req, res) {
        userDao.findAllUsers().then(function(response) {
            res.json(response);
        });
    }
};