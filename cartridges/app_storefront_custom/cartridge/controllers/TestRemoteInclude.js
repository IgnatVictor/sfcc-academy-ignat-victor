'use strict';

var server = require('server');


server.get('Render2', function (req, res, next) {
  
    var myvariable = "Just a string"
    res.render("render/renderSecond.isml", { myvariable: myvariable });
    return next();
});

server.get('TestDecorator', function (req, res, next) {
  
    var myvariable = "Just a string"
    res.render("render/page.isml", { myvariable: myvariable });
    return next();
});

module.exports = server.exports();