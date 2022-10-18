// 'use strict';
 
// var server = require('server');
 
// server.get('Basket', function (req, res, next) {
//     var BasketMgr = require("dw/order/BasketMgr");
 
//     var currentBasket = BasketMgr.getCurrentBasket();
 
//     res.render("training/showBasket.isml", { currentBasket: currentBasket });
//     return next();

//     // Use ISML to display Basket object
//     // The rendered ISML should be showBasket.isml (Use the quickcard section "Giving control to ISML" for help)
// });
 
// module.exports = server.exports();


"use strict";

var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

server.get("Show", consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(
    req,
    res,
    next
) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");

    var profileForm = server.forms.getForm("training");
    profileForm.clear();

    res.render("trainingform", {
        title: Resource.msg("training.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("Training-SubmitRegistration").toString()
    });

    next();
});

server.post(
    "SubmitRegistration",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next) {
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");
        var profileForm = server.forms.getForm("training");
        res.render("trainingform", {
            title: Resource.msg("training.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("Training-SubmitRegistration").toString()
        });

        next();
    }
);

module.exports = server.exports();