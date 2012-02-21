/**
 * @namespace
 * @public
 * @return {Object} api
 */
var page = (function(){
	var EventEmitter = require('./node_modules/events').events.EventEmitter;
	var keys = require('./keys').keys;
	var connections = require('./connections').connections;
	
	var api = new EventEmitter();
	
	/* @property {Object} */
	api.url = {
		/* @property {String} */
		domain: keys.domain
	};
	
	/**
	* @public
	* @return {String}
	*/	
	api.id = keys.page;
	
	/**
	* @public
	* @return {String}
	*/
	api.fromSite = keys.site;
	
	/**
	* @public
	* @param {Function} callback
	*/
	api.getData = function(callback, error){
		var query = { domain : api.url.domain };
		var url = '/page/' + this.id;
		connections.page.request().jsonp(url, query, callback, error);
	};

	/**
	* @public
	*/
	api.spaces = [];
	
	/**
	* @public
	* @param {Function} sucess
	* @param {Function} error
	* // TODO: pass document as param to be cross-plataform
	*/
	api.scan = function(sucess, error){
		if(api.spaces){
			for(var i = 0; i < api.spaces.length; i++){
				var spaceModel = api.spaces[i];
				var spaceId = api.spaces[i]._id;

				if(document.getElementById(spaceId) && sucess){
					sucess(spaceModel);
				} else if (error){
					error(spaceModel);
				}
			}
			return api.spaces;
		}
	};
	
	// Exposing api
	return api; 
})();

exports.page = page;