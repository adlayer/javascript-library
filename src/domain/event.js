/**
* @class
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
*	@public validate
*		eg new Event().validate();
*		// false
*/
var Event = function(){
	
	
	/***  WHAT ***/
	/*
	* Event type
	* @type string
	*/
	this.type;
	
	
	
	/***  WHERE ***/
	
	/*
	* Campaign Id
	* @type string
	*/
	this.campaign_id;
	/*
	* Ad id
	* @type string
	*/
	this.ad_id;
	/*
	* Space id
	* @type string
	*/
	this.space_id;
	/*
	* Site id
	* @type string
	*/
	this.site_id;
	/*
	* Page url
	* @type string
	*/
	this.page_url;
	
	
	
	/***  WHEN ***/
	
	/*
	* Date - iso 8601 format
	* @type string
	*/
	this.date;
	/*
	* Time of event
	* @type string
	*/
	this.time;
	
	
	
	/***  WHO ***/
	
	/*
	* Visitor ip
	* @type string
	*/
	this.ip;
	/*
	* User browser
	* @type string
	*/
	this.browser;
};