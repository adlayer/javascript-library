(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Page = require('../domain/page').Page;
	var request = require('../request/request').request;
	var ads = require('../ads/ads').ads;
	var spaces = require('../spaces/spaces').spaces;
		
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.connection;
	}
	// Page data model
	PageApi.prototype.getData = function(callback){

		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback'
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	// Page spaces iterator
	PageApi.prototype.scanSpaces = function(spaces, callback){

		for( var i = 0; i < spaces.length; i++ ){
			var space = spaces[i];
			var divSpace = this.document.getElementById(space._id);
			
			if ( divSpace ){
				space.element = divSpace;
				callback(null, space);
			} else {
				var error = {
					error: 'not found',
					id: space._id
				};
				callback(error, null);
			}
		}
	};
	
	// Page init
	PageApi.prototype.init = function(){
		var page = this;
		this.getData(function(err, data){
			if(data && data.spaces){
				page.scanSpaces(data.spaces, function(err, space){
					if(!err){
						var trackerUrl = page.tracker.connection.getUrl();
						space = spaces.create(space);
						var ad = ads.create(space.getRandomAd());

						ad.on('load', function(){
							page.tracker.track({
								type: 'impression', // should be required just in tracker server
								ad_id: ad.id,
								browser: 'firefox',
								campaign_id: 'skyelivre',
								page_url: 'http://adlayer.com.br',
								site_id: 'site123',
								page_id: 'page124',
								space_id: 'space123'
							});
						});

						space.placeAd(ad);

						// Needs to be called after ad placement to find the space.id
						var clickTag = ad.getClickTag(trackerUrl, 'ok', 'ok', 'ok');
						ad.element.href = clickTag;
					}
				});
			}
		});
	};
	exports.PageApi = PageApi;
})();