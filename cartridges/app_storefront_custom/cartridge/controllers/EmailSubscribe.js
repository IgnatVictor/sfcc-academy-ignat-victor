// 'use strict';
// var server = require('server');

// server.extend(module.superModule);

// /**
//  * Checks if the email value entered is correct format
//  * @param {string} email - email string to check if valid
//  * @returns {boolean} Whether email is valid
//  */


// server.append('Subscribe', (req, res, next)=> {


//     var CustomObjectMgr = require('dw/object/CustomObjectMgr');
//     var Resource = require('dw/web/Resource');
//     var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
//     var CouponMgr = require('dw/campaign/CouponMgr');
//     var Mail = require('dw/net/Mail');
// 	var HashMap = require('dw/util/HashMap');
//     var couponCode;
//     var myCoupon = CouponMgr.getCoupon('20Procent');
//     var email = req.form.emailId;
   
   
//     var emailList= CustomObjectMgr.getAllCustomObjects('Subscription');
//     var customObjectInstance = CustomObjectMgr.createCustomObject('Subscription', email.toString());	

  
//     var email = req.form.emailId;
//     var isValidEmailid;

//     Transaction.wrap(function() {
      
//             var emailList= CustomObjectMgr.getCustomOject('email');
//             emailList.assign(email);

//     })

     


   
//     next();
// });


// module.exports = server.exports();
