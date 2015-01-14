
/**
 * Module dependencies.
 */

var path = require('path');
	extend = require('util')._extend,
	development = require('./env/development'),
	production = require('./env/production'),
	defaults = {
		root: path.normalize(__dirname + '/..')
	};

/**
 * Expose
 */

module.exports = {
	development: extend(development, defaults),
  	production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
