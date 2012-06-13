/**
* @todo: Test in node
* @todo: Change getAd to page.getAd
*/

(function(){
	global.adlayer = {
		auth: exports.keys,
		connections: exports.connections,
		page: exports.page,
		getAd: exports.ad.getAd,
		track: exports.track
	};
})();