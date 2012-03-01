/**
* @class
* @param {Object} attributes
* @todo:
*	@static track
*		eg Event.track('impression', {}, function(){});
*		// null
*	@public toQuery
*		eg new Event().toQuery() ;
*		// ?time="20:30:31"&page_id=10&type="impression"&date=2012-12-02
*	@public save
*		eg new Event().save(function(){});
*		// null
*/
var Event = function( attributes ){
	
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
	'ad_id',
	'space_id',
	'page_url'
];

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