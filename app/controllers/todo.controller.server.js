var mongoose = require("mongoose"),
    ToDo = require("../models/todo.model.server.js");

module.exports = {
    createTodo: function(req, res) {
        console.log(req.body);
        var newTodo = new ToDo({
            title: req.body.title
                // dateCreated: Date.getDate()
        });
        newTodo.save(function(err, todo) {
            if (err) {
                console.log("couldnt save");
                return res.status(400).json(err);
            } else {
                res.status(200).send(todo);
            }
        });
    },

    getTodos: function(req, res) {
        ToDo.find({}, function(err, todos) {
            if (err) {
                console.log("couldnt find todos");
                return res.status(400).json(err);
            } else {
                res.status(200).send(todos);
            }
        });
    },

    getTodo: function(req, res) {
        ToDo.findById(req.params.id, function(err, todo) {
            if (err) {
                return res.status(400).json(err);
            } else {
                res.status(200).send(todo);
            }
        });
    },

    editTodo: function(req, res) {
        ToDo.update(req.params.id, req.body, function(err, updatedtodo) {
            if (err) {
                return res.status(400).json(err);
            } else {
                res.status(200).send(updatedtodo);
            }
        });
    },

    removeTodo: function(req, res) {
        ToDo.findById(req.params.id, function(err, todo) {
            if (err) {
              return res.status(400).json(err);
            }

            ToDo.findById(req.params.id).remove(function(err, resp) {
              if (err) {
                  return res.status(400).json(err);
              } else {
                  res.json({
                      message: 'Todo successfully removed',
                      data: todo
                  });
              }
            });
        });
    }
}
