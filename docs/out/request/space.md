# class Space

# constructor 

* param Object attributes

<p>Abstract class for spaces</p>

<ul>
<li>@property {String} id Unique space id</li>
</ul>

<ul>
<li>@property {String} type Type of space</li>
</ul>

<ul>
<li>@property {Boolean} status true for active and false for inactive</li>
</ul>

<ul>
<li>@property {Array} ads Collection of ads linked to space</li>
</ul>

<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>

<ul>
<li>@method getRandomAd
<ul><li>@return {Object} Ad</li></ul></li>
</ul>

<ul>
<li>@requires modules in browser
<ul><li>@exports Space as Space</li></ul></li>
</ul>
