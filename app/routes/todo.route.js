var express = require("express");
var router = express.Router();
var todoController = require("../controllers/todo.controller.server.js");

module.exports = function(app) {
  router.route('/')
    .post(todoController.createTodo)
    .get(todoController.getTodos)

  router.route('/:id')
    .get(todoController.getTodo)
    .put(todoController.editTodo)
    .delete(todoController.removeTodo)

  app.use("/todo", router)
}