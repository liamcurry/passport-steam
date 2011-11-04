var vows = require('vows');
var assert = require('assert');
var util = require('util');
var google = require('passport-google');


vows.describe('passport-google').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(google.version);
    },
  },
  
}).export(module);
