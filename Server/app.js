module.exports = function (app, client, pg, connectionString) {

    // User Table
    require("./model/user_model.js").createUserTable(client);
    var userDao = require("./DAO/user_dao.js")(pg, connectionString);
    require("./Service/user_service.js")(app, userDao);

    // Entry Table
    require("./model/standupEntry_model.js").createUserStandUpEntryTable(client);
    var standUpDao = require("./DAO/standupEntry_dao.js")(pg, connectionString);
    require("./Service/stanupEntry_service.js")(app, standUpDao);
};
