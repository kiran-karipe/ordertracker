'use strict';
var request = require('request');

exports.index = function(req, res) {
  request
    .post({
      url:'https://wwwcie.ups.com/rest/Track',
      body: JSON.stringify({
        "UPSSecurity": { "UsernameToken": {
          "Username": "kiran.karipe",
          "Password": "Mahesh12#" },
          "ServiceAccessToken": {
            "AccessLicenseNumber": "ED353F2BC9ECDE9D"
          }
        },
          "TrackRequest": { "Request": {
            "RequestOption": "1", "TransactionReference": {
              "CustomerContext": "Your Test Case Summary Description" }
            },
            "InquiryNumber": req.params.trackingId
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
