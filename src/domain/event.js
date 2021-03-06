/**
* @module core
*/

/**
* Create any event
*
* @class Event
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	
	/**
	* Instance of current date
	* @property date
	* @type date
	* @private
	*/
	var date = new Date();
	
	/**
	* Event type
	* @property type
	* @type string
	*/
	this.type = undefined;
	/**
	* Campaign Id
	* @property campaign_id
	* @type string
	*/
	this.campaign_id = undefined;
	/**
	* @property ad_id
	* @type string
	*/
	this.ad_id = undefined;
	/**
	* @property space_id
	* @type string
	*/
	this.space_id = undefined;
	/**
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = undefined;
	/**
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = undefined;
	
	
	/**
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = undefined;
	/**
	* @property {String} time Time of event
	* @public
	*/
	this.time = undefined;
	/**
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = undefined;
	
	
	/**
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = undefined;
	/**
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = undefined;
	
	/**
	* @property {String} visible Visibility of event
	* @public
	*/
	this.visible = undefined;
	
	/**
	* @method getFullDate
	* @return {String} Even if date is not converted to string return ISOString
	*/
	this.getFullDate = function(){
		if( typeof date === 'object' ){
			date = date.toISOString();
			return date;
		}
		return date;
	};
	
	/*
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* Required List of all required attributes
	* 
	* @property required
	* @type {Array}
	* @static
	*/
	Event.required = [
		'type',
		'ad_id',
		'campaign_id'
	];
	/**
	* @method track
	* @static
	* @return {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/**
	* @method getDate
	* @public
	* @return {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/**
	* @method getTime
	* @public
	* @return {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/**
	* @method getHour
	* @public
	* @return {String || Boolean} String of hour or false
	*/
	Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
	/**
	* @method validate
	* @public
	* @return {Boolean} true for all attributes and false if any is missing
	*/
	Event.prototype.validate = function(){
		for( var i = 0; i < Event.required.length; i++ ){
			var attr = Event.required[i];
			if( !this[attr] ){
				return false;
			}	
		}
		// default
		return true;
	};
	/**
	* @method toQuery
	* @public
	* @return {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/**
	* @method save
	* @public
	* @return {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};

	exports.Event = Event;