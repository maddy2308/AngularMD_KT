module.exports = function (app, client, pg, connectionString) {

    // User Table
    require("./model/UserModel.js").createUserTable(client);
    var userDao = require("./DAO/UserDAO.js")(pg, connectionString);
    require("./Service/UserService.js")(app, userDao);

    // Entry Table
    require("./model/StandUpEntryModel.js").createUserStandUpEntryTable(client);
    var standUpDao = require("./DAO/StandUpEntryDAO.js")(pg, connectionString);
    require("./Service/StanUpEntryService.js")(app, standUpDao);
};
