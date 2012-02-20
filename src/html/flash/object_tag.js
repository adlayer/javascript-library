
/**
 * @class ObjectTag
 * @see http://kb2.adobe.com/cps/127/tn_12701.html
 */
var ObjectTag = function(){
	var Size = require('../../size').size;
	var Flash = require('./flash').flash;
	Size.apply(this, arguments);
	Flash.apply(this, arguments);

	var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
	var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
	var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
	
	/** @class Param
	* <param name="wmode" value="tranparent" />
	*/
	var Param = function(name,value){
		this.name = name;
		this.value = value;
		this.element = document.createElement("param");
		this.element.setAttribute("name",this.name);
		this.element.setAttribute("value",this.value);
		return this.element;
	};

	var __construct = function(_self) {
		_self.element = document.createElement("object");
		
		_self.element.setAttribute("type","application/x-shockwave-flash");
		_self.element.setAttribute("width",_self.width);
		_self.element.setAttribute("height",_self.height);
		_self.element.setAttribute("data",_self.getSrc());
		_self.element.setAttribute("id",_self.id);
		_self.element.setAttribute("rel",_self.rel);
		_self.element.setAttribute("classid",CLASSID);
		_self.element.setAttribute("codebase",CODEBASE);
		
		// http://stackoverflow.com/questions/1168494/how-do-i-programmatically-set-all-objects-to-have-the-wmode-set-to-opaque
		var clone = _self.element.cloneNode(true);

		clone.appendChild(new Param("movie",_self.getSrc()));
		clone.appendChild(new Param("quality",_self.quality));		
		clone.appendChild(new Param("src",_self.getSrc()));
		clone.appendChild(new Param("menu",_self.menu));
		clone.appendChild(new Param("scale",_self.scale));
		clone.appendChild(new Param("allowScriptAccess",_self.allowScriptAccess));
		clone.appendChild(new Param("allowNetworking","all"));
		clone.appendChild(new Param("base",_self.base));
		clone.appendChild(new Param("wmode",_self.wmode));
		
		_self.element = clone;
		
	}(this);
	return this.element;
};