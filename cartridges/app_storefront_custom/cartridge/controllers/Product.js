'use strict';

var server = require('server');

server.extend(module.superModule);


server.append("Show", (req,res,next)=> {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var CatalogMgr = require("dw/catalog/CatalogMgr");
    var ProductMgr = require("dw/catalog/ProductMgr");

    


    var productSearch = new ProductSearchModel();

    var srule = CatalogMgr.getSortingRule("price-low-to-high");
    var viewData = res.getViewData();
    var productID = req.querystring.pid;
    var product = ProductMgr.getProduct(productID);
    var cgid = product.primaryCategory.ID;
    productSearch.setSortingRule(srule)
    productSearch.setCategoryID(cgid)
    productSearch.search();

    viewData.productSearch= productSearch;
    

    res.setViewData(viewData);

        next();
    });

    module.exports = server.exports();