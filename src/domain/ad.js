/**
* @module core
* @requires events
*/

/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @extends Core
* @uses EventEmiiter
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	/**
	* @event load
	*/
	var loaded = null;
	/**
	* @event placement
	*/
	var placed = null;
	
	
	/**
	* Id of ad
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of ad creative
	* @property name 
	* @type string
	*/
	this.name = '';
	/**
	* Id to campaign that belongs to
	* @property campaign_id 
	* @type string
	*/
	this.campaign_id = '';
	/**
	* Ad type
	* @property type 
	* @type string
	*/
	this.type = '';
	/**
	* file Path to ad file
	* @property file 
	* @type string
	*/
	this.file = '';
	/**
	* link destiny link
	* @property link 
	* @type string
	*/
	this.link = '';
	/**
	* status Ad status
	* @property status 
	* @type boolean
	*/
	this.status = true;
	/**
	* Alternative Ad is another instance of Ad with graceful degradation
	* @property alternative 
	* @type object
	*/
	this.alternative = {};
	

	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

exports.Ad = Ad;