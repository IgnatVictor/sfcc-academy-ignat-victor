'use strict';

var server = require('server');


server.get('VarTest', function (req, res, next) {
  
    var myvariable = "Just a string"
    res.render("varTest/VarTest", { myvariable: myvariable });
    return next();
});


module.exports = server.exports();