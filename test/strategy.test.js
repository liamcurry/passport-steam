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

test('Strategy >> _providerURL', t => {
  t.same(getStrategy()._providerURL, 'http://steamcommunity.com/openid')
});

test('Strategy >> name', t => {
  t.same(getStrategy().name, 'steam')
})
