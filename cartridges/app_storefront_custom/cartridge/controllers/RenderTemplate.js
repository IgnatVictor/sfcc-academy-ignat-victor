'use strict';

var server = require('server');


server.get('Render', function (req, res, next) {
  
    var myvariable = "Just a string"
    res.render("render/render.isml", { myvariable: myvariable });
    return next();
});


module.exports = server.exports();