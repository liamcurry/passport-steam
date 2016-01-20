var steam = require('../lib/passport-steam/index.js');

import test from 'ava';

test('Module >> version type', t => {
  t.same(typeof steam.version, "string")
});
