'use strict';
var request = require('request');
const dev = require('../config/dev');

exports.index = function(req, res) {
  console.log("Request Body: " + Object.keys(req.body));
  request
    .post({
      url:'https://wwwcie.ups.com/rest/Track',
      body: JSON.stringify({
        "UPSSecurity": { "UsernameToken": {
          "Username": dev.username,
          "Password":  dev.password},
          "ServiceAccessToken": {
            "AccessLicenseNumber": dev.AccessLicenseNumber
          }
        },
          "TrackRequest": { "Request": {
            "RequestOption": "1", "TransactionReference": {
              "CustomerContext": "Your Test Case Summary Description" }
            },
            "InquiryNumber": req.body.trackingId
          }
        })
    }, function(error, response, body) {
      body = JSON.parse(body);

      var latestActivity = Array.isArray(body.TrackResponse.Shipment.Package.Activity)
        ? body.TrackResponse.Shipment.Package.Activity[0]
        : body.TrackResponse.Shipment.Package.Activity

      var result = {
        tracking: body.TrackResponse.Shipment.InquiryNumber.Value,
        description: latestActivity.Status.Description
      }
      res.send(result);
    });
};
