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


// Creates a new image in the DB.
exports.create = function(req, res) {
  return res.json(201, {
    message: true
  });
};


function handleError(res, err) {
  return res.send(500, err);
}