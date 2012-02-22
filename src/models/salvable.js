/**
 * @interface Saveble
 * @todo: ver se é melhor passa o site por aqui ou no server
 */

var Salvable = function () {
	var connections = require('../connections').connections;
	this.save = function(callback){
		var query = {
			//ad_id:this.ad_id,
			campaign_id:this.campaign_id,
			space_id:this.space_id,
			page_url:this.page_url,
			site_id: this.site_id,
			page_id: this.page_id
		};
		callback = callback || undefined;
		connections.impressions.request().img('/' + this.type + '/' + this.ad_id, query, callback);
	};
};
exports.Salvable = Salvable;