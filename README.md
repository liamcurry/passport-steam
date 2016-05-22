# Passport-Steam

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Steam](http://steamcommunity.com/) using OpenID 2.0.


## Installation

    $ npm install --save passport-steam

## Usage

#### Configure Strategy

The Steam authentication strategy authenticates users using a steam account,
which is also an OpenID 2.0 identifier.  The strategy requires a `validate`
callback, which accepts this identifier and calls `done` providing a user.
Additionally, options can be supplied to specify a return URL and realm.

    passport.use(new SteamStrategy({
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: 'your steam API key'
      },
      function(profile, done) {
        User.findByOpenID({ openId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

A Steam API key can be obtained at http://steamcommunity.com/dev/apikey. However if you wish not to use an API key, you can include `profile: false` into the SteamStrategy object, which will disable the fetching of user data.

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'steam'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/steam',
      passport.authenticate('steam'),
      function(req, res) {
        // The request will be redirected to Steam for authentication, so
        // this function will not be called.
      });

    app.get('/auth/steam/return',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [signon example](https://github.com/liamcurry/passport-steam/tree/master/examples/signon).

## Tests

If you would like to contribute, please provide accompanying tests with [AVA](https://github.com/sindresorhus/ava)

    $ npm install -g ava
    $ ava


[![Build Status](https://secure.travis-ci.org/liamcurry/passport-steam.png)](http://travis-ci.org/liamcurry/passport-steam)

## Contributors

  - [Jared Hanson](http://github.com/jaredhanson)
  - [elisee](https://github.com/elisee)
  - [welps](https://github.com/welps)
  - [mnzt](https://github.com/mnzt)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
