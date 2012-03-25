/**
* @class
*/
var Page = function( attributes ){
	/*
	* Unique page id
	* @type string
	*/
	this.id = '';
	/*
	* Page name
	* @type string
	*/
	this.name = '';
	/*
	* Collection of page spaces
	* @type array
	*/
	this.spaces = [];
	/*
	* Page status
	* @type boolean - true for active and false for inactive
	*/
	this.status = true;
	
	/*
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = (function(self){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				self[attribute] = attributes[attribute];
			}
		}
		return self;
	})(this);
};
/**
* @public
* @returns {Object} new Page() - return the instance itself to improve chainability
* @requires Javascript 1.6
* __Warning:__ Don't use this in browser, because it can not work in old browsers
* @todo: should be readonly not modify the object just return filtered value
*/
Page.prototype.getActiveContent = function(){
	if( this.spaces && this.spaces.length >= 1 ){
		// Run over and redesign every space (removing ads with status false)
		this.spaces = this.spaces.map(function(space){
			if( space.ads && space.ads.length >= 1 ){
				space.ads = space.ads.filter(function(ad){
					// If ad has status equal to false will auto removed from array
					return ad.status;
				});
			}
			// re-assign modified space to spaces collection
			return space;
		});
	}
	return this;
};
/**
* @requires modules in browser
* @exports Page as Page
*/
exports.Page = Page;