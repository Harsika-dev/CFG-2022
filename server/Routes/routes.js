const routes = require("express").Router();
const controllers = require("../Controllers/controllers.js");

// routes.post("/signup", controllers.registerUser);

routes.post("/signin", controllers.authenticateUser);

routes.post("/createpost", controllers.createpost);

routes.post("/viewpost", controllers.viewpost);

routes.post("/update", controllers.updateAuthorization);

// routes.post("/orders",controllers.orders);

// routes.post("/verify",controllers.verify);

routes.post("/askForAuth", controllers.askForAuth);

routes.get("/allUsersRequested", controllers.allUsersRequested);
module.exports = routes;
