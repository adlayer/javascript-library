 /**
 * @class Flash
 * @extends HtmlTag
 * */
var Flash = function(id,src,link,width,height,rel){
	var HtmlTag = require('../html_tag').html_tag;
	HtmlTag.apply(this, arguments);

	this.id = id;
	this.rel = rel;
	this.src = src;
	this.height = height;
	this.width = width;
	this.align = "center";
	this.link = link;
	this.name = id;
	
	
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent";//window,opaque,transparent
	this.allowScriptAccess = "always";// "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
	this.link = "";
};
exports.flash = Flash;