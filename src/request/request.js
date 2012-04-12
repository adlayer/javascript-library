function request(){
	
	var JsonpRequest = require('./jsonp_request').JsonpRequest;
	var ImgRequest = require('./img_request').ImgRequest;
	
	return {
		jsonp: JsonpRequest.make,
		img: ImgRequest.make
	}
}
exports.request = request;