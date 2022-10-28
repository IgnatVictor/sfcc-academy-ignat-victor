"use strict";

var server = require("server");

var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Transaction = require("dw/system/Transaction");
var URLUtils = require("dw/web/URLUtils");
var Resource = require("dw/web/Resource");
var CouponMgr = require("dw/campaign/CouponMgr");

server.get("Show", function(req, res, next) {
    var profileForm = server.forms.getForm("newsletter");
    profileForm.clear();

    res.render("newsletter/newsletter", {
        profileForm: profileForm,
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString()
    });

    next();
});

server.post("SubmitForm", function(req, res, next) {
    importPackage(dw.net);
    importPackage(dw.value);
    importPackage(dw.util);
    importPackage(dw.system);
    var Coupon =  CouponMgr.getCoupon('20Procent');

    function sendMail(mailTo, mailFrom, firstName, lastName, couponCode) {
        var template = new dw.util.Template("mail/mail.isml");
        var o = new dw.util.HashMap();
        o.put("firstName",firstName);
        o.put("lastName",lastName);
        o.put("couponCode",couponCode);
        var text = template.render(o);
        var mail = new dw.net.Mail();
        mail.addTo(mailTo);
        mail.setFrom(mailFrom);
        mail.setSubject("Newsletter Sign Up");
        mail.setContent(text);
        mail.send();
    }

    var profileForm = server.forms.getForm("newsletter");

    var id = profileForm.customer.email.value;
    var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);
    var formResponse = "";

    if (!object) {
        Transaction.wrap(function() {
            object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
            var probe = profileForm.customer.firstname.value;
            object.custom.firstName = profileForm.customer.firstname.value;
            object.custom.lastName = profileForm.customer.lastname.value;

            var nextCoupon = Coupon.getNextCouponCode();
            object.custom.couponCode = nextCoupon;

            if (nextCoupon) {
                var couponCode = `This is your coupon code: ${nextCoupon}`;
            } else {
                var couponCode = "Sorry, there are no more coupon codes left.";
            }

            sendMail(
                id,
                "noreply@dsalesforce.com",
                profileForm.customer.firstname.value,
                profileForm.customer.lastname.value,
                couponCode
            );
        });
    } 

    res.render("newsletter/newsletter", {
        profileForm: profileForm,
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString(),
        formResponse: formResponse
    });

    next();
});

module.exports = server.exports();