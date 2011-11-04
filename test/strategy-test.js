var vows = require('vows');
var assert = require('assert');
var util = require('util');
var GoogleStrategy = require('passport-google/strategy');


vows.describe('GoogleStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new GoogleStrategy({ returnURL: 'https://www.example.com/auth/google/return' },
        function() {}
      );
    },
    
    'should be named google': function (strategy) {
      assert.equal(strategy.name, 'google');
    },
    'should have correct provider URL': function (strategy) {
      assert.equal(strategy._providerURL, 'https://www.google.com/accounts/o8/id');
    },
  },
  
}).export(module);
