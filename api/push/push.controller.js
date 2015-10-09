/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /categories             ->  index
 * POST    /categories              ->  create
 * GET     /categories/:id          ->  show
 * PUT     /categories/:id          ->  update
 * DELETE  /categories/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Q = require('q');
var fs = require('fs');
var path = require('path');
var pushbots = require('pushbots');
var Pushbots = new pushbots.api({
  id:'56076ca2177959bb2a8b4568',
  secret:'964a400367ed1e68a24f33ccb5f0c124'
});

// Creates a new image in the DB.
exports.create = function(req, res) {
  var data = req.body;
  Pushbots.setMessage(data.message ,1);
  Pushbots.customFields({"article_id": data.field});
  Pushbots.customNotificationTitle(data.title);
  Pushbots.push(function(response){
    res.json({ success: true, message: 'Push successfully!', data: data });
  }, function (err) {
    handleError(res, err)
  });
};


function handleError(res, err) {
  return res.send(500, err);
}