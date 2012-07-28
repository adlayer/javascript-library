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