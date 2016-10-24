var express = require("express");
var router = express.Router();
var userController = require("../controllers/user.controller.server.js");

module.exports = function(app) {
  router.route('/signup')
    .post(userController.signup);

  router.route('/login')
    .post(userController.login);

router.use(userController.middleware);

  router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  app.use("/", router);
}