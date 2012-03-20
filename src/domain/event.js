/**
* @class
* @param {Object} attributes
*/
var Event = function( attributes ){
	/*
	* date of event
	* @type object
	* @private
	*/
	var date = new Date();
	
	/***  WHAT ***/
	/*
	* Event type
	* @type string
	*/
	this.type = '';
	
	
	
	/***  WHERE ***/
	
	/*
	* Campaign Id
	* @type string
	*/
	this.campaign_id = '';
	/*
	* Ad id
	* @type string
	*/
	this.ad_id = '';
	/*
	* Space id
	* @type string
	*/
	this.space_id = '';
	/*
	* Site id
	* @type string
	*/
	this.site_id = '';
	/*
	* Page url
	* @type string
	*/
	this.page_url = '';
	
	
	
	/***  WHEN ***/
	
	/*
	* Date - iso 8601 format
	* @type string
	*/
	this.date = '';
	/*
	* Time of event
	* @type string
	*/
	this.time = '';
	/*
	* First part of time hour
	* @type string
	*/
	this.hour = '';
	
	
	
	/***  WHO ***/
	
	/*
	* Visitor ip
	* @type string
	*/
	this.ip = '';
	/*
	* User browser
	* @type string
	*/
	this.browser = '';
	
	/**
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
* List of all required attributes
* @static
* @type array
*/
Event.required = [
	'type',
	'campaign_id',
	'space_id',
	'page_url',
	'page_id'
];
/*
* @static
*/
Event.track = function(attributes){
	return new Event(attributes).save();
};

/*
* @public
* @returns {String} The second part of a fulldate splited in T character
*/
Event.prototype.getDate = function(){
	return this.getFullDate().split('T')[0];
};

/*
* @public
* @returns {String} The second part of a fulldate splited in T character
*/
Event.prototype.getTime = function(){
	return this.getFullDate().split('T')[1];
};

/*
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
* @public
* @returns {String} convert object to network string
*/
Event.prototype.toQuery = function(){
	var querystring = require('../node_modules/querystring').querystring;
	return querystring.stringify(this);
};
/*
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