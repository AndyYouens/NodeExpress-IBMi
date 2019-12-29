/**
 * FormaServe General Utilities
 * 
 * December 2015
 */
'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
const session = require('client-sessions');
const { Connection, Statement } = require('idb-pconnector');

// Return current date & time
exports.CurrentDateTime = function() {
  return Date();
};

