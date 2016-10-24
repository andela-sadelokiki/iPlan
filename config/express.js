var express = require("express");
var mongoose = require("mongoose");
var config = require("./config.js");
var bodyParser = require("body-parser");
mongoose.connect(config.database);

module.exports = function(){
	var app = express();
	app.set("secret", config.secret);
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static("./public"));
 
	// app.use(function(req, res, next) {
 //    next();
 //  });

  require("../app/routes/todo.route.js")(app);
  require("../app/routes/user.route.js")(app);
  return app;
}