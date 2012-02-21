/**
 * @class Log
 */
var Log = function(){
	var keys = require('../keys').keys;
	this.campaign_id = "";
	this.site_id = keys.site;
	this.page_id = keys.page;
	this.space_id = "";
	this.page_url = document.URL;
};
exports.Log = Log;