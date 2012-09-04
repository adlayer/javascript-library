/**
* @module ads
*/
/**
* @class Swf
*/
var Swf = function(){
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
};
exports.Swf = Swf;