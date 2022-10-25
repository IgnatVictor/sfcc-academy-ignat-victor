'use strict';

var server = require('server');

server.extend(module.superModule);

server.append("Show",(req,res,next)=> {
    var BasketMgr = require('dw/order/BasketMgr');
    var viewData = res.getViewData();
    var currentBasket= BasketMgr.getCurrentBasket();
    var totalPrice= currentBasket.totalGrossPrice;
    res.viewData.totalPrice= totalPrice.value;
    res.setViewData(viewData);

    next();
})


module.exports = server.exports();