/**
* @module request
*/
function request(){
	
	var JsonpRequest = require('./jsonp_request').JsonpRequest;
	var ImgRequest = require('./img_request').ImgRequest;
	
	return {
		jsonp: JsonpRequest.make,
		get: JsonpRequest.make,
		img: ImgRequest.make
	};
}
exports.request = request;