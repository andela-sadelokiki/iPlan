var db = require("./config/config.js");
var app = require("./config/express")();
var port = process.env.PORT || 8000;
 
app.listen(port, function() {  
  console.log("App is running live on" + port)
});

module.exports = app;