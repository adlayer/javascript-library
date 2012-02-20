// TODO: Remove browser sniffing and use feature detection
var userAgent = navigator.userAgent.toLowerCase();
var browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
	safari: /webkit/.test(userAgent),
	opera: /opera/.test(userAgent),
	msie: (/msie/.test(userAgent)) && (!/opera/.test( userAgent )),
	mozilla: (/mozilla/.test(userAgent)) && (!/(compatible|webkit)/.test(userAgent))
};

var scriptQuery = document.getElementById("adlayerScript").src.split("?")[1];

/**
 * @public
 * @return {String}
 */
function getPageId(){
	return queryString.parse(scriptQuery).page;
}

/**
 * @public
 * @return {String}
 */
function getSiteId(){
	return queryString.parse(scriptQuery).site;
}

/**
 * Redefine keys autodetects by browser env
 */
var keys = require('./keys').keys;
exports.keys.page = keys.page = getPageId();
exports.keys.site = keys.site = getSiteId();
exports.keys.domain = keys.domain = global.location.hostname;