/**
* @module ads
*/
/**
* @class Swf
*/
var Swf = function(){
	var queryString = require('../node_modules/querystring').querystring;
	/**
	* Alignment of html content.
	* @property align
	* @type string
	*/
	this.align = "center";
	/**
	* Control right click menu options (true, false).
	* @property menu
	* @type boolean
	*/
	this.menu = false;
	/**
	* @property quality
	* @type string
	*/
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	/**
	* @property scale
	* @type string
	*/
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	/**
	* @property wmode
	* @type string
	*/
	this.wmode = "transparent"; //window,opaque,transparent
	/**
	* @property type
	* @type string
	*/
	this.type = "application/x-shockwave-flash";
	/**
	* @property allowScriptAccess
	* @type string
	*/
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
	
	/**
	* @method getSrc
	* @return {String} src Will return the preloder url if defined
	*/
	this.getSrc = function(){
		if(!this.preloader){
			return this.src;
		}
		
		var url = this.preloader + '?' + queryString.stringify({
			src: this.src, 
			callback: this.callback, 
			value: this.id
		});
		
		return url;
	};
};
exports.Swf = Swf;