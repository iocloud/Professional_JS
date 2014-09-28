#High performance JavaScript
===

*  **Loading and Execution**
 
&nbsp;&nbsp;Script positioning
> Most browsers use a single process for both user interface (UI) updates and JavaScript execution, so only one can happen at any given moment in time. 
 
===
>Keep in mind that browsers don't start rendering anything on the page until the opening <body> tag is encountered. 

===
>Internet Explorer 8, Firefox 3.5, Safari 4, and Chrome 2 all allow parallel downloads of JavaScript files. This is good news because the &lt;script&gt; tags dont necessarily block other &lt;script&gt; tags from downloading external resources. Unfortunately, JavaScript downloads still block downloading of other resources, such as images. And even though downloading a script doesnt block other scripts from downloading, the page must still wait for the JavaScript code to be downloaded and executed before continuing. So while the latest browsers have improved performance by allowing parallel downloads, the problem hasnt been completely solved. Script blocking still remains a problem.

===
>Because scripts block downloading of all resource types on the page, it's recommended to place all &lt;script&gt; tags as close to the bottom of the <body> tag as possible so as not to affect the download of the entire page.

===

&nbsp;&nbsp;Grouping Scripts

>Since each &lt;script&gt; tag blocks the page from rendering during initial download, it's helpful to limit the total number of &lt;script&gt; tags contained in the page. 

***eg:***

`<script type="text/javascript"
src="http://yui.yahooapis.com/combo?2.7.0/build/yahoo/yahoo-min.js&2.7.0/build/event/event-min.js"></s cript>`

===

&nbsp;&nbsp;Nonblocking scripts

>JavaScript's tendency to block browser processes, both HTTP requests and UI updates, is the most notable performance issue facing developers. Keeping JavaScript files small and limiting the number of HTTP requests are only the first steps in creating a responsive web application. The richer the functionality an application requires, the more JavaScript code is required, and so keeping source code small isn't always an option. Limiting yourself to downloading a single large JavaScript file will only result in locking the browser out for a long period of time, despite it being just one HTTP request. To get around this situation, you need to incrementally add more JavaScript to the page in a way that doesn't block the browser.

===
>The secret to nonblocking scripts is to load the JavaScript source code after the page has finished loading. In technical terms, this means downloading the code after the window's load event has been fired. There are a few techniques for achieving this result.

===
Deferred Scripts

`<script defer>`

===

&nbsp;&nbsp;Dynmic Scripts Elements
>The Document Object Model (DOM) allows you to dynamically create almost any part of an HTML document using JavaScript. At its root, the &lt;cript&gt; element isn't any different than any other element on a page: references can be retrieved through the DOM, and they can be moved, removed from the document, and even created. 

`function loadScript(url, callback) {`

&nbsp;&nbsp;`var script = document.createElement('script');`

&nbsp;&nbsp;`script.type = 'text/javascript';`

&nbsp;&nbsp;`if (script.readyState) { //IE`

&nbsp;&nbsp;`script.onreadystatechange = function() {`

&nbsp;&nbsp;`if (script.readyState == 'loaded' ||script.readyState == 'complete') {`

&nbsp;&nbsp;`script.onreadystatechange = null;`

&nbsp;&nbsp;`callback();`

&nbsp;&nbsp;`}`

&nbsp;&nbsp;`};`

&nbsp;&nbsp;`} else { //Others`

&nbsp;&nbsp;&nbsp;&nbsp;`script.onload = function() {`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`callback();`

&nbsp;&nbsp;&nbsp;&nbsp;`};`

&nbsp;&nbsp;`}`

&nbsp;&nbsp;`script.src = url;`

&nbsp;&nbsp;`document.body.appendChild(script);`

`}`

===
>You can dynamically load as many JavaScript files as necessary on a page, but make sure you consider the order in which files must be loaded. Of all the major browsers, only Firefox and Opera guarantee that the order of script execution will remain the same as you specify. Other browsers will download and execute the various code files in the order in which they are returned from the server. 

&nbsp;&nbsp;XMLHttpRequest Script Injection

>Another approach to nonblocking scripts is to retrieve the JavaScript code using an XMLHttpRequest (XHR) object and then inject the script into the page. This technique involves creating an XHR object, downloading the JavaScript file, then injecting the JavaScript code into the page using a dynamic &lt;script&gt; element. 

`var xhr = new XMLHttpRequest(); `

`xhr.open("get", "file1.js", true);`

`xhr.onreadystatechange = function(){`

`if (xhr.readyState == 4){`

`if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){`

`var script = document.createElement ("script");`

`script.type = "text/javascript";`

`script.text = xhr.responseText;`

`document.getElementsByTagName('head')[0].appendChild(script);`

`}`


`}`


`};`


`xhr.send(null)`


>The primary advantage of this approach is that you can download the JavaScript code without executing it immediately. Since the code is being returned outside of a &lt;script&gt; tag, it won't automatically be executed upon download, allowing you to defer its execution until you're ready. Another advantage is that the same code works in all modern browsers without exception cases.

>The primary limitation of this approach is that the JavaScript file must be located on the same domain as the page requesting it, which makes downloading from CDNs impossible. For this reason, XHR script injection typically isn't used on large-scale web applications.

> ***Summary***
 
>Managing JavaScript in the browser is tricky because code execution blocks other browser processes such as UI painting. Every time a &lt;script&gt; tag is encountered, the page must stop and wait for the code to download (if external) and execute before continuing to process the rest of the page. There are, however, several ways to minimize the performance impact of JavaScript:

 > * Put all &lt;script&gt; tags at the bottom of the page, just inside of the closing &lt;\/body&gt; tag. This ensures that the page can be almost completely rendered before script execution begins.
 > * Group scripts together. The fewer &lt;script&gt; tags on the page, the faster the page can be loaded and become interactive. This holds true both for &lt;script&gt; tags loading external JavaScript files and those with inline code.
 > * There are several ways to download JavaScript in a nonblocking fashion:
 
Use the defer attribute of the &lt;script&gt; tag (Internet Explorer and Firefox 3.5+ only)
 Dynamically create &lt;script&gt; elements to download and execute the code
 Download the JavaScript code using an XHR object, and then inject the code into the page

===

*  **Data Access**

> There are four basic places from which data can be accessed in JavaScript:

> * Literal values: Any value that represents just itself and isn't stored in a particular location. JavaScript can represent strings, numbers, Booleans, objects, arrays, functions, regular expressions, and the special values null and undefined as literals.

> * Variables: Any developer-defined location for storing data created by using the var keyword.

> * Array items: A numerically indexed location within a JavaScript Array object.

> * Object members: A string-indexed location within a JavaScript object.

===
***Managing Scope***

***Scope Chains and Identifier Resolution***

>Every function in JavaScript is represented as an objectmore specifically, as an instance of Function. Function objects have properties just like any other object, and these include both the properties that you can access programmatically and a series of internal properties that are used by the JavaScript engine but are not accessible through code. One of these properties is [[Scope]], as defined by ECMA-262.

>A good rule of thumb is to always store out-of-scope values in local variables if they are used more than once within a function.

***Scope Chain Augmentation***

***Dynamic Scopes***

>Both the with statement and the catch clause of a try-catch statement, as well as a function containing (), are all considered to be dynamic scopes. A dynamic scope is one that exists only through execution of code and therefore cannot be determined simply by static analysis (looking at the code structure). 

***Closures, Scope, and Memory***

>Closures are one of the most powerful aspects of JavaScript, allowing a function to access data that is outside of its local scope. The use of closures has been popularized through the writings of Douglas Crockford and is now ubiquitous in most complex web applications. There is, however, a performance impact associated with using closures.


***Object Members***

>Most JavaScript is written in an object-oriented manner, either through the creation of custom objects or the use of built-in objects such as those in the Document Object Model (DOM) and Browser Object Model (BOM). As such, there tends to be a lot of object member access.


***Prototypes***

>Objects in JavaScript are based on prototypes. A prototype is an object that serves as the base of another object, defining and implementing members that a new object must have. This is a completely different concept than the traditional object-oriented programming concept of classes, which define the process for creating a new object. Prototype objects are shared amongst all instances of a given object type, and so all instances also share the prototype object's members.



>Objects can have two types of members: instance members (also called "own" members) and prototype members. Instance members exist directly on the object instance itself, whereas prototype members are inherited from the object prototype.


***Prototype Chains***

>The prototype of an object determines the type or types of which it is an instance. By default, all objects are instances of Object and inherit all of the basic methods, such as toString(). You can create a prototype of another type by defining and using a constructor. 

***Nested Members***

>Since object members may contain other members, it's not uncommon to see patterns such as window.location.href in JavaScript code. These nested members cause the JavaScript engine to go through the object member resolution process each time a dot is encountered. 


>It should come as no surprise, then, that the deeper the nested member, the slower the data is accessed. Evaluating location.href is always faster than window.location.href, which is faster than window.location.href.toString(). If these properties aren't on the object instances, then member resolution will take longer as the prototype chain is searched at each point.


***Caching Object Member Values***

>Generally speaking, if you\'re going to read an object property more than one time in a function, it's best to store that property value in a local variable. The local variable can then be used in place of the property to avoid ￼￼￼￼￼the performance overhead of another property lookup. This is especially important when dealing with nested object members that have a more dramatic effect on execution speed.


***Summary***

>Where you store and access data in JavaScript can have a measurable impact on the overall performance of your code. There are four places to access data from: literal values, variables, array items, and object members. These locations all have different performance considerations.

> * Literal values and local variables can be accessed very quickly, whereas array items and object members take longer.

> * Local variables are faster to access than out-of-scope variables because they exist in the first variable object of the scope chain. The further into the scope chain a variable is, the longer it takes to access. Global variables are always the slowest to access because they are always last in the scope chain.

> * Avoid the with statement because it augments the execution context scope chain. Also, be careful with the catch clause of a try-catch statement because it has the same effect.

> * Nested object members incur significant performance impact and should be minimized.

> * The deeper into the prototype chain that a property or method exists, the slower it is to access.

> * Generally speaking, you can improve the performance of JavaScript code by storing frequently used object members, array items, and out-of-scope variables in local variables. You can then access the local variables faster than the originals.
 

*  **DOM Scripting**

===


*  **Algorithms and Flow Control**

===
*  **Strings and RegExp**

===
*  **Responsive Interfaces**

===
*  **Ajax asynchronous & XML**

===
*  **Programming pratices**

===
*  **Building and deploying high-performance JS applications**



