"use strict";

var server = require("server");

server.extend(module.superModule);

server.append("AddProduct", function(req, res, next) {

    const ProductMgr = require('dw/catalog/ProductMgr');
    const BasketMgr= require('dw/order/BasketMgr');

    var viewData= res.getViewData();
    var productId =req.form.pid;
    var product = ProductMgr.getProduct(productId);
    var basket= BasketMgr.getCurrentBasket();
    var image= product.getImage("large").absURL.toString();
    var email= basket.customer.profile.email;
   

    importPackage(dw.net);
    importPackage(dw.value);
    importPackage(dw.util);
    importPackage(dw.system);

   
        var template = new dw.util.Template("mail/mail.isml");

        var o = new dw.util.HashMap();
        o.put("product", product);
        o.put("image",image);
        var text = template.render(o);
        var mail = new dw.net.Mail();
        mail.addTo(email);
        mail.setFrom("noreply@salesforce.com");
        mail.setSubject("Confirmation of Your Order");
        mail.setContent(text);
        if(email) {
            mail.send();
        }

    next();
});

module.exports = server.exports();