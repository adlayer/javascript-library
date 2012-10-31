(function(){
	var copy = require('../utils/copy').copy;
	var Event = require('../domain/core').Event;
	/**
	* Responsible for make connections to tracker server
	*
	* @class Tracker
	* @constructor
	*/
	function Tracker(){
		/*
		* @property {Connection} connection instance
		* @public
		*/
		this.connection = {};
	}
	/*
	* @method track
	* @param {Object} data All data to track in an event
	* @public
	* @returns {undefined}
	*/
	Tracker.prototype.track = function(data){

		var event = new Event(data);

		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/' + event.type + '/' + event.ad_id;

		//  validate in client is necessary ? or is it just slow
		if( event.validate() ){
			opts.qs = event;
			var req = request().get(opts, function(err, data){
				if(err){
					throw new Error({'message': 'impossible to track'});
				}
			});
			this.connection.next(req);
		}
	};
	exports.Tracker = Tracker;
})();