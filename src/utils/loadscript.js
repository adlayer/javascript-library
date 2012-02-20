/**
 * Load an script on top of html
 * @param {string}
 * @return {element}
 */
function loadScript(url, sucess, error){
    var head = document.getElementsByTagName("head")[0] || document.insertBefore(document.firstChild.firstChild,document.createElement("head"));  
    var script = document.createElement("script");	

	script.onload = sucess || undefined;
	//script.onerror = error || undefined;

    script.type = "text/javascript";
    script.src = url;

    head.appendChild(script);
    return script;
}
exports.loadscript = loadScript;