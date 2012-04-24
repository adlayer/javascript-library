# class Page

# constructor 

* param Object attributes

<p>Abstract class for page</p>

<ul>
<li>@property {String} id unique page id</li>
</ul>

<ul>
<li>@property {String} name page name</li>
</ul>

<ul>
<li>@property {Array} spaces Collection of page spaces</li>
</ul>

<ul>
<li>@property {Boolean} true for active and false for inactive</li>
</ul>

<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>

<ul>
<li>@method getActiveContent
<ul><li>@public</li>
<li>@returns {Object} new Page() - return the instance itself to improve chainability</li>
<li>@requires Javascript 1.6</li>
<li><strong>Warning:</strong> Don't use this in browser, because it can not work in old browsers</li>
<li>@todo: should be readonly not modify the object just return filtered value</li></ul></li>
</ul>

<ul>
<li>@requires modules in browser
<ul><li>@exports Page as Page</li></ul></li>
</ul>
