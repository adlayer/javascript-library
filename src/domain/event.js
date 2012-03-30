/**
* Create any event
*
* @class Event
* @param {Object} attributes
*/
var Event = function( attributes ){
	/*
	* @property {Object} date Instance of current date
	* @private
	*/
	var date = new Date();
	
	/*
	* @property {String} type Event type
	* @public
	*/
	this.type = '';
	
	
	/*
	* @property {String} campaign_id Campaign Id
	* @public
	*/
	this.campaign_id = '';
	/*
	* @property {String} ad_id Ad id
	* @public
	*/
	this.ad_id = '';
	/*
	* @property {String} space_id Space id
	* @public
	*/
	this.space_id = '';
	/*
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = '';
	/*
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = '';
	
	
	/*
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = '';
	/*
	* @property {String} time Time of event
	* @public
	*/
	this.time = '';
	/*
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = '';
	
	
	/*
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = '';
	/*
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = '';
	
	/**
	* @method getFullDate
	* @privileged
	* @returns {String} Even if date is not converted to string return ISOString
	*/
	this.getFullDate = function(){
		if( typeof date === 'object' ){
			return date = date.toISOString();
		}
		return date;
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = (function(self){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				self[attribute] = attributes[attribute];
			}
		}
		return self;
	})(this);
};

	/*
	* @property {Array} required List of all required attributes
	* @static
	*/
	Event.required = [
		'type',
		'campaign_id',
		'space_id',
		'page_url',
		'page_id'
	];
	/*
	* @method track
	* @static
	* @returns {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/*
	* @method getDate
	* @public
	* @returns {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/*
	* @method getTime
	* @public
	* @returns {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/*
	* @method getHour
	* @public
	* @returns {String || Boolean} String of hour or false
	*/
	Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
	/*
	* @method validate
	* @public
	* @returns {Boolean} true for all attributes and false if any is missing
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
	/*
	* @method toQuery
	* @public
	* @returns {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/*
	* @method save
	* @public
	* @returns {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};
	/**
	* @requires modules in browser
	* @exports Event as Event
	*/
	exports.Event = Event;