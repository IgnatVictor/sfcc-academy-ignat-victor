'use strict';

var server = require('server');
const productMgr = require('dw/catalog/ProductMgr')


server.get('ShowProd', function (req, res, next) {
  
    const id = req.querystring.pid;
    const myProduct= productMgr.getProduct(id);
    res.render("product/productFound", { myProduct: myProduct,id:id });
    return next();
});


module.exports = server.exports();