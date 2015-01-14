
/*!
 * Module dependencies
 */

var mongoose = require('mongoose'),
	userPlugin = require('mongoose-user'),
	Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  	name: { type: String, default: '' },
  	email: { type: String, default: '' },
  	hashed_password: { type: String, default: '' },
  	salt: { type: String, default: '' }
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * Register
 */

mongoose.model('User', UserSchema);
