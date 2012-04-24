# class DomElement

# link https://developer.mozilla.org/en/DOM/element


<p>Abstract class for dom/html elements </p>

<ul>
<li>@property {String} id Id attribute of object</li>
</ul>

<ul>
<li>@property {Object} element Dom element itself</li>
</ul>

<ul>
<li>@method create
<ul><li>@param {String} tagName</li>
<li>@param {Object} document</li>
<li>@static</li>
<li>@returns {Object} element</li></ul></li>
</ul>

<ul>
<li>@method create
<ul><li>@param {String} tagName</li>
<li>@param {Object} document</li>
<li>@public</li>
<li>@returns {Object} this - Chainable method</li></ul></li>
</ul>

<ul>
<li>@method setAttributes
<ul><li>@param {Object} attributes</li>
<li>@public</li>
<li>@returns {Object} this - Chainable method</li></ul></li>
</ul>

<ul>
<li>@method append
<ul><li>@param {Object} child</li>
<li>@public</li>
<li>@returns {Object} this - Chainable method</li></ul></li>
</ul>

<ul>
<li>@method findParentTag
<ul><li>@param {String} tag UPPERCASE tag name</li>
<li>@public</li>
<li>@returns {Object} parentElement</li></ul></li>
</ul>

<ul>
<li>@method addDomEventListener
<ul><li>@param {String} type Event name like 'click', 'load', 'mouseover'</li>
<li>@param {Function} eventListener Callback for event trigger</li>
<li>@public</li>
<li>@returns {Object} return this to allow chainability</li></ul></li>
</ul>
