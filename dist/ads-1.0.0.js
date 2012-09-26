/**
* @module ads
*/
/**
* @class Swf
*/
var Swf = function(){
	/**
	* Alignment of html content.
	* @property align
	* @type string
	*/
	this.align = "center";
	/**
	* Control right click menu options (true, false).
	* @property menu
	* @type boolean
	*/
	this.menu = false;
	/**
	* @property quality
	* @type string
	*/
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	/**
	* @property scale
	* @type string
	*/
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	/**
	* @property wmode
	* @type string
	*/
	this.wmode = "transparent"; //window,opaque,transparent
	/**
	* @property type
	* @type string
	*/
	this.type = "application/x-shockwave-flash";
	/**
	* @property allowScriptAccess
	* @type string
	*/
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
};
exports.Swf = Swf;
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class EmbedAd
	* @constructor
	* @param {Object} attributes
	* @extends AdDom
	* @extends Swf
	*/
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class ObjectAd
	* @constructor
	* @param {Object} attributes
	*
	* @extends AdDom
	* @extends Swf
	*/	
	var ObjectAd = function(){
		var superclass = this;
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
	
		/**
		* @property CLASSID
		* @type string
		* @final
		* @private
		*/
		var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		/**
		* @property CODEBASE
		* @type string
		* @final
		* @private
		*/
		var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
		/**
		* @property PLUGINSPAGE
		* @type string
		* @final
		* @private
		*/
		var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
		
		/** 
		* @class Param
		* @constructor
		* @param {String} name
		* @param {String} value
		* @return HTMLElement
		*/
		var Param = function(name, value){
			/**
			* @property name
			* @type string
			*/
			this.name = name;
			/**
			* @property value
			* @type string
			*/
			this.value = value;
			/**
			* @property element
			* @type HTMLElement
			*/
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
* @extends AdDom
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
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
* @module ads
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