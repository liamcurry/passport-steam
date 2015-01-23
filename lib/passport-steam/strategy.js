/**
 * Module dependencies.
 */
var util = require('util')
  , OpenIDStrategy = require('passport-openid').Strategy
  , SteamWebAPI = require('steam-web');


/**
 * `Strategy` constructor.
 *
 * The Steam authentication strategy authenticates requests by delegating to
 * Steam using the OpenID 2.0 protocol.
 *
 * Applications must supply a `validate` callback which accepts an `identifier`,
 * and optionally a service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `returnURL`  URL to which Steam will redirect the user after authentication
 *   - `realm`      the part of URL-space for which an OpenID authentication request is valid
 *   - `profile`    enable profile exchange, defaults to _true_
 *
 * Examples:
 *
 *     passport.use(new SteamStrategy({
 *         returnURL: 'http://localhost:3000/auth/steam/return',
 *         realm: 'http://localhost:3000/'
 *       },
 *       function(identifier, profile, done) {
 *         User.findByOpenID(identifier, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, validate) {
  options = options || {};
  options.providerURL = options.providerURL || 'http://steamcommunity.com/openid';
  options.profile =  (options.profile === undefined) ? true : options.profile;
  options.stateless = true; //Steam only works as a stateless OpenID

  if(options.profile) {
    var steam = new SteamWebAPI({ apiKey: options.apiKey, format: 'json' });

    function getUserProfile() {
      var req = arguments[options.passReqToCallback ? 0 : undefined];
      var identifier = arguments[options.passReqToCallback ? 1 : 0];
      var profile = arguments[options.passReqToCallback ? 2 : 1];
      var done = arguments[options.passReqToCallback ? 3 : 2];

      steam.getPlayerSummaries({
        steamids: [ identifier ],
        callback: function(err, result) {
          profile = {
            provider: 'steam',
            _json: result.response.players[0],
            id: result.response.players[0].steamid,
            displayName: result.response.players[0].personaname,
            photos: [ { value: result.response.players[0].avatar }, { value: result.response.players[0].avatarmedium }, { value: result.response.players[0].avatarfull } ]
          };

          options.passReqToCallback ?
            validate(req, identifier, profile, done):
            validate(identifier, profile, done);
        }
      });
    }

    OpenIDStrategy.call(this, options, getUserProfile);
  } else {
    OpenIDStrategy.call(this, options, validate);
  }

  this.name = 'steam';
}

/**
 * Inherit from `OpenIDStrategy`.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
