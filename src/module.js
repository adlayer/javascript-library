/** Copyright 2011 Adlayer Adserver. All Rights Reserved. */

/**
 * @private
 * Implementation of common.js
 */
var node_modules = {};
var module = {};

module.exports = {};
var exports = module.exports;

/**
 * @example
 * EventEmitter = require('events').EventEmitter;
 * No mattter what you pass parameter, this will always find for last dirname, bacause in this implementation
 * Everything are in the same structure
 */
var require = function(path){
	return exports;	
};