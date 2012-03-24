var vows = require('vows');
var assert = require('assert');
var util = require('util');
var steam = require('passport-steam');


vows.describe('passport-steam').addBatch({

  'module': {
    'should report a version': function (x) {
      assert.isString(steam.version);
    },
  },

}).export(module);
