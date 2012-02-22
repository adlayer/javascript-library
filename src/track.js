var track = function(event, data, callback){
	var Impression = require('./models/impression').Impression;
	var eventList = {
		impression: Impression
	};
	var log = new eventList[event]();
	log.type = event;
	log.save(callback);
};
exports.track = track;