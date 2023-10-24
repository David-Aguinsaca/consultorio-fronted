const config = require('./config.js');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public/'));

app.listen(config.PORT, config.HOST, function() {
  console.log("Link: "+config.HOST+":"+config.PORT+"");
});
