var vows = require('vows');
var assert = require('assert');
var util = require('util');
var SteamStrategy = require('passport-steam/strategy');


vows.describe('SteamStrategy').addBatch({

  'strategy': {
    topic: function() {
      return new SteamStrategy({ returnURL: 'https://www.example.com/auth/steam/return' },
        function() {}
      );
    },

    'should be named steam': function (strategy) {
      assert.equal(strategy.name, 'steam');
    },
    'should have correct provider URL': function (strategy) {
      assert.equal(strategy._providerURL, 'http://steamcommunity.com/openid');
    },
  },

}).export(module);
