/**
* @class Space
* @abstract
* @constructor
* @extends {Format}
* @param {string} id
*/
var Space = function(id){
	var queryString = require('../node_modules/querystring').querystring;
	var AdsFactory = require('../ads/ads_factory').ads_factory;
	var Format = require('../format').format;
	Format.apply(this, arguments);
	
	/* @property {string} id Id of html space */
	this.id         =   id;
	/* @property {string} type */
	this.type = "";
	/* @property {array} ads list of ads to this space */
	this.ads        =	[];
	/* @property {element} element Point to space in DOM */
	this.element    =	{};
	
	/**
	* @public
	* @param {Object} attributes
	* @return {Object}
	*/
	this.insertAd = function(attributes){
		if(attributes){
			var adElement = AdsFactory.create(attributes);
			if(adElement){
				//select the space by id
				this.element.appendChild(adElement);
				
				if(adElement.href){
					var link = queryString.parse(adElement.href);
					link.space_id = this.id;
					adElement.href = queryString.stringify(link);
				}
				
				return this.element;
			}
		} else{
			throw new Error("Ad attributes are needed");
		}
	};
	
	/* @public */
	this.insertRandomAd = function(){
		var randomAd = Math.floor(Math.random() * this.ads.length);
		if(this.ads[randomAd]){
			this.insertAd(this.ads[randomAd]);
		}
	};
	
	/* @public */
	this.setSizes = function(){
		this.element.style.height = this.size.height;
		this.element.style.width = this.size.width;
	};
	
	/**
	* @constructs
	* @private
	* @param {Object} _self
	* @todo: call factory(this.type)
	*/
	var __construct = function(_self){
		_self.element = document.getElementById(_self.id);
		return _self;	
	}(this);
};
exports.space = Space;