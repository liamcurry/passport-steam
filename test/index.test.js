var steam = require('../lib/passport-steam/index.js');

import test from 'ava';

test('Checking version type is string', t => {
  t.same(typeof steam.version, "string")
});
