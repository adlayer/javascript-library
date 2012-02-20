/**
* @constructor HtmlTag
* @return {Object} HtmlTag
* @link https://developer.mozilla.org/en/DOM/element
*/

var HtmlTag = function(){
	this.element = {};
	this.id = "";
	this.link = "";
	this.rel = "";
	this.src = "";
	
	this.addEventListener = function(type,fn){
		if (global.addEventListener) {
			this.element.addEventListener(type, fn, false);
		}
		else if (global.attachEvent) {
			this.element.attachEvent('on' + type, fn);
		}
		else {
			this.element['on' + type] = fn;
		}
		return this;
	};
	
	this.extendAttributes = function(attributes){
		for(var attr in attributes){
			if(attributes.hasOwnProperty(attr) && attr !== "element" && typeof attributes[attr] !== "function"){
				this.element.setAttribute(attr, attributes[attr]);
			}
		}
		return this;
	};
};
exports.html_tag = HtmlTag;