/*
* @class Swf
* @property {String} align Alignment of html content.
* @property {Boolean} menu Control right click menu options (true, false).
* @property {String} quality Control quality of loaded movie ('low', 'medium', 'high').
* @property {String} scale Flash canvas mode ('noscale').
* @property {String} wmode Embed type relative to context.
* @property {String} type Default alias for 'application/x-shockwave-flash'.
* @property {String} type allowScriptAcess.
*/
var Swf = function(){
	this.align = "center";
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent"; //window,opaque,transparent
	this.type = "application/x-shockwave-flash";
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
};
exports.Swf = Swf;
/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();
/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	var ObjectAd = function(){
		var superclass = this;
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
	
		var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
		var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
		
		/** @class Param
		* <param name="wmode" value="tranparent" />
		*/
		var Param = function(name,value){
			this.name = name;
			this.value = value;
			this.element = superclass.create("param");
			this.element.setAttribute("name", this.name);
			this.element.setAttribute("value", this.value);
			return this.element;
		};
	
		var __construct = (function(self){
			self.create('OBJECT');
			self.element.src = self.src;
			
			self.element.setAttribute("data", self.src);
			self.element.setAttribute("classid", CLASSID);
			self.element.setAttribute("codebase", CODEBASE);
			
			// http://stackoverflow.com/questions/1168494/how-do-i-programmatically-set-all-objects-to-have-the-wmode-set-to-opaque
			var clone = self.element.cloneNode(true);

			clone.appendChild(new Param("movie", self.src));
			clone.appendChild(new Param("quality", self.quality));		
			clone.appendChild(new Param("src", self.src));
			clone.appendChild(new Param("menu", self.menu));
			clone.appendChild(new Param("scale", self.scale));
			clone.appendChild(new Param("allowScriptAccess", self.allowScriptAccess));
			clone.appendChild(new Param("allowNetworking", "all"));
			clone.appendChild(new Param("base", self.base));
			clone.appendChild(new Param("wmode", self.wmode));

			self.element = clone;
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	ObjectAd.prototype = new AdDom();
	exports.ObjectAd = ObjectAd;
})();
/**
 * @class ImgAd
 */
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.src = self.src;
			var img = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			if(self.link){
				// subscribe img with link
				self.create('a');
				self.element.href = self.link;
				self.append(img);
			}
		
			return self.element;
		})(this);
	};
	ImgAd.prototype = new AdDom();
	exports.ImgAd = ImgAd;
})();
/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	var FlashAd = function(data){
		var __construct = (function(self){
			if(self.browser){
				return new ObjectAd(data);
			} else {
				return new Embed(data);
			}

		})(this);
		return __construct;
	};
	exports.FlashAd = FlashAd;
})();
/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			create: function(data){
				// mixin
				data.id = data._id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();