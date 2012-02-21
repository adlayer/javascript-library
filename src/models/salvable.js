/**
 * @interface Saveble
 * @todo: ver se é melhor passa o site por aqui ou no server
 */

var Salvable = function () {};
Salvable.prototype.save = function(){
	var connections = require('../connection/connections').connections;
	var query = {
		//ad_id:this.ad_id,
		campaign_id:this.campaign_id,
		space_id:this.space_id,
		page_url:this.page_url,
		site_id: this.site_id,
		page_id: this.page_id
	};
	connections.impressions.request().img('/impression/' + this.ad_id, query);
};
exports.Salvable = Salvable;