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
/**
* @class
*/
var Ad = function( attributes ){
	/*
	* Ad id
	* @type string
	*/
	this.id = '';
	/*
	* Name of ad creative
	* @type string
	*/
	this.name = '';
	/*
	* Id to campaign that belongs to
	* @type string
	*/
	this.campaign_id = '';
	/*
	* Ad type
	* @type string
	*/
	this.type = '';
	/*
	* Path to  ad file
	* @type string
	*/
	this.file = '';
	/*
	* Destiny link
	* @type string
	*/
	this.link = '';
	/*
	* Ad status
	* @type boolean
	*/
	this.status = true;
	/*
	* Alternative Ad is another instance of Ad with graceful degradation
	* @type object
	*/
	this.alternative = {};
	
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
/**
* @requires modules in browser
* @exports Ad as Ad
*/
exports.Ad = Ad;
/**
* @class
* @todo:
*	@static create
*		eg Space.create('teste', {});
*		// {}
*	@public getAd
*		eg new Space().getAd('1234');
*		// [{},{},{}]
*	@public save
*		eg new Event().save(function(){});
*		// null
*	@public place
*		eg new Event().place(new Ad());
*		// {}
*/
var Space = function( attributes ){
	/*
	* Unique page id
	* @type string
	*/
	this.id = '';
	/*
	* Space type
	* @type string
	*/
	this.type = '';
	/*
	* Space status - true for active and false for inactive
	* @type boolean
	*/
	this.status = '';
	/*
	* Collection of ads linked to space
	* @type array
	*/
	this.ads = [];
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
/**
* @requires modules in browser
* @exports Space as Space
*/
exports.Space = Space;
/**
* @class
*/
var Page = function( attributes ){
	/*
	* Unique page id
	* @type string
	*/
	this.id = '';
	/*
	* Page name
	* @type string
	*/
	this.name = '';
	/*
	* Collection of page spaces
	* @type array
	*/
	this.spaces = [];
	/*
	* Page status
	* @type boolean - true for active and false for inactive
	*/
	this.status = true;
	
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
/**
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
* @class
*/
var Site = function( attributes ){
	/*
	* Unique site id
	* @type string
	*/
	this.id = '';
	/*
	* Site name
	* @type string
	*/
	this.name = '';
	/*
	* Site status - true for active and  false for inactive
	* @type boolean
	*/
	this.status = true;
	/*
	* Collection of all allowed domains
	* @type array
	*/
	this.domains = [];
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