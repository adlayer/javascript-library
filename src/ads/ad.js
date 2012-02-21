/**
 * @class Ad
 * @extends {Format}
 * @param {string} id
 */
var Ad = function(){
	var Format = require('../format').format;
	Format.apply(this, arguments);
	
	var configs = require('../configs').configs;
	var Log = require('../models/log').log;
	
	/*	@property {string} link */
	this.link			=	"";
	/*	@property {string} id Id of ad in DOM and couchdb */
	this.id				=	"";
	/**
	* @property	{object}	alternative	Properties	of	alternative	ad
	* @deprecated just in next version
	**/
	this.alternative	=	"";
	/**
	* @public
	* @property {string} file Link to external location of ad
	**/
	this.file			=	"";
	/**
	* @public
	* @property {string} element Reference to ad in DOM
	* @requires {this.id}
	**/
	this.element		=	{};

	this.width		=	"";
	this.height		=	"";
	
	this.setSpaceInLink = function(id){
		throw "Should subscribe it";
	};
	
	this.clickTag = function(){
		var protocol = global.location.protocol;
		
		var url = protocol + '//' + configs.tracker.host + ':' + configs.tracker.port;
		url += "/click";
		url += "/" + this.id;
		
		var data = new Log();
		data.campaign_id = this.campaign;
		data.link = this.link;
		url += "?" + queryString.stringfy(data);
		return url;
	};
	
};

/** @static **/
Ad.ads = {};
Ad.getAd = function(id){
	return Ad.ads[id];
};

exports.getAd = Ad.getAd;
exports.ad = Ad;