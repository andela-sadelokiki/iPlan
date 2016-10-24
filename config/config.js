module.exports = {
	database: 'mongodb://localhost/todoapp',
	secret: 'drowssap'
};
 
module.exports = require("./env/" + process.env.NODE_ENV + ".js");