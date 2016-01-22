var SteamStrategy = require('../lib/passport-steam/strategy');
import test from 'ava';

function getStrategy () {
  return new SteamStrategy({
    returnURL: 'https://www.example.com/auth/steam/return',
    profile: false
  },
    function() {}
  );
}

test("Whether the providerURL is steam's", t => {
  t.same(getStrategy()._providerURL, 'http://steamcommunity.com/openid')
});

test("Whether the strategy name is 'steam'", t => {
  t.same(getStrategy()._name, 'steam')
})

test("Whether OpenID is statless", t => {
  t.same(getStrategy()._stateless, true)
})
