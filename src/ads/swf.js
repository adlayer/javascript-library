/**
* @module ads
*/
/**
* @class Swf
* @property {String} align Alignment of html content.
* @property {Boolean} menu Control right click menu options (true, false).
* @property {String} quality Control quality of loaded movie ('low', 'medium', 'high').
* @property {String} scale Flash canvas mode ('noscale').
* @property {String} wmode Embed type relative to context.
* @property {String} type Default alias for 'application/x-shockwave-flash'.
* @property {String} type allowScriptAcess.
*/
var Swf = function(){
	this.align = "center";
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent"; //window,opaque,transparent
	this.type = "application/x-shockwave-flash";
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
};
exports.Swf = Swf;