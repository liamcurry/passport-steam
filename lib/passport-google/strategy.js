/**
 * Module dependencies.
 */
var util = require('util')
  , OpenIDStrategy = require('passport-openid').Strategy;


function Strategy(options, validate) {
  options = options || {};
  options.providerURL = options.providerURL || 'https://www.google.com/accounts/o8/id';
  options.profile =  (options.profile === undefined) ? true : options.profile;

  OpenIDStrategy.call(this, options, validate);
  this.name = 'google';
}

/**
 * Inherit from `OpenIDStrategy`.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;
