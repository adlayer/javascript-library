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