/**
* Core class
*
* @class Core
* @constructor
* @requires merge
*/
var Core = function(){
	var merge = require('../utils/merge').merge;
	var queryString = require('../node_modules/querystring').querystring;
	
	/*
	* @method extend
	* @privileged
	* @returns {Object} return this to allow chain pattern
	*/
	this.extend = function(attributes){
		return merge(this, attributes);
	};
	
};
exports.Core = Core;
/**
* Create any event
*
* @class Event
* @constructor
* @param {Object} attributes
*/
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	
	/*
	* @property {Object} __date__ Instance of current date
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
			date = date.toISOString();
			return date;
		}
		return date;
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
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
/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @param {Object} attributes
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
	/*
	* @property {String} id Id of ad
	* @public
	*/
	this.id = '';
	/*
	* @property {String} name Name of ad creative
	* @public
	*/
	this.name = '';
	/*
	* @property {String} campaign_id Id to campaign that belongs to
	* @public
	*/
	this.campaign_id = '';
	/*
	* @property {String} type Ad type
	* @public
	*/
	this.type = '';
	/*
	* @property {String} file Path to ad file
	* @public
	*/
	this.file = '';
	/*
	* @property {String} link destiny link
	* @public
	*/
	this.link = '';
	/*
	* @property {Boolean} status Ad status
	* @public
	*/
	this.status = true;
	/*
	* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
	* @public
	*/
	this.alternative = {};
	

	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

/**
* @requires modules in browser
* @exports Ad as Ad
*/
exports.Ad = Ad;
/**
* Interface for space behaviour
*
* @interface ISpaceBehaviour
* @constructor
*/
var ISpaceBehaviour = function(){
	this.getAd = function(context){ throw new Error('Implement it'); };
};
exports.ISpaceBehaviour = ISpaceBehaviour;

/**
* Random behaviour for spaces
*
* @class RandomBehaviour
* @constructor
*/
var RandomSpaceBehaviour = function(){
	/**
	* @method getAd
	* @param {Space} context Expect space 'this' as argument
	* @return {Object} Ad
	*/
	this.getAd = function(context){ 
		var total = context.ads.length;
		var index = Math.floor(Math.random() * total);
		return context.ads[index];
	};
};

/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id Unique space id
	*/
	this.id = '';
	/**
	* @property {String} type Type of space
	*/
	this.type = '';
	/**
	* @property {Boolean} status true for active and false for inactive
	*/
	this.status = '';
	/**
	* @property {Array} ads Collection of ads linked to space
	*/
	this.ads = [];
	
	/**
	* @property {SpaceBehaviour} behaviour a part of strategy pattern
	*/
	this.behaviour = {};

	/**
	* @method setBehaviour
	* @param {Object} behaviour 
	* @return {Object} Ad
	*/
	this.setBehaviour = function(behaviour){
		this.behaviour = behaviour;
		return this.behaviour;
	};
	
		
	/**
	* @method getAd
	* @return {Object} Ad
	*/
	this.getAd = function(){
		return this.behaviour.getAd(this);
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
		self.setBehaviour(new RandomSpaceBehaviour());
	}(this);
};

	/**
	* @requires modules in browser
	* @exports Space as Space
	*/
	exports.Space = Space;
/**
* Abstract class for page
*
* @class Page
* @constructor
* @param {Object} attributes
*/
var Page = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id unique page id
	*/
	this.id = '';
	/**
	* @property {String} name page name
	*/
	this.name = '';
	/**
	* @property {Array} spaces Collection of page spaces
	*/
	this.spaces = [];
	/**
	* @property {Boolean} true for active and false for inactive
	*/
	this.status = true;
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};
	/**
	* @method getActiveContent
	* @public
	* @returns {Object} new Page() - return the instance itself to improve chainability
	* @requires Javascript 1.6
	* __Warning:__ Don't use this in browser, because it can not work in old browsers
	* @todo: should be readonly not modify the object just return filtered value
	*/
	Page.prototype.getActiveContent = function(){
		if( this.spaces && this.spaces.length >= 1 ){
			// Run over and redesign every space (removing ads with status false)
			this.spaces = this.spaces.map(function(space){
				if( space.ads && space.ads.length >= 1 ){
					space.ads = space.ads.filter(function(ad){
						// If ad has status equal to false will auto removed from array
						return ad.status;
					});
				}
				// re-assign modified space to spaces collection
				return space;
			});
		}
		return this;
	};
	/**
	* @requires modules in browser
	* @exports Page as Page
	*/
	exports.Page = Page;
/*
* Abstract class for site
*
* @class Site
* @constructor
* @param {Object} attributes
*/
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id Unique site id
	*/
	this.id = '';
	/**
	* @property {String} name Name of site
	*/
	this.name = '';
	/**
	* @property {Boolean} status true for active and  false for inactive
	*/
	this.status = true;
	/**
	* @property {Array} domains Collection of all allowed domains
	*/
	this.domains = [];
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* @description Find for exact domain or subdomain
	* @public
	* @param {String} entry - Domain string
	* @returns {Boolean} - True when found a domain and false for not
	* @todo: change to regex
	*/
	Site.prototype.hasDomain = function(entry){
		var self = this;
		var result = false;

		function found(content, context){
			return context.indexOf(content) !== -1;
		}
	
		// Found exact domain ?
		if( found(entry, this.domains ) ){
			result = true;
		} else {
			// Run in all domains
			this.domains.forEach(function(domain){
				// Current domain is a wildcard ?
				var wildcard = found('*', domain);
				if( wildcard ){
					// Remove star
					domain = domain.replace('*', '');
					if( found(domain, entry) ) result = true;
				}
			});
		}
		return result;
	};

	/**
	* @requires modules in browser
	* @exports Event as Event
	*/
	exports.Site = Site;