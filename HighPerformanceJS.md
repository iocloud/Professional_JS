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

> **Summary**
 
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
**Managing Scope**

**Scope Chains and Identifier Resolution**

>Every function in JavaScript is represented as an objectmore specifically, as an instance of Function. Function objects have properties just like any other object, and these include both the properties that you can access programmatically and a series of internal properties that are used by the JavaScript engine but are not accessible through code. One of these properties is [[Scope]], as defined by ECMA-262.

>A good rule of thumb is to always store out-of-scope values in local variables if they are used more than once within a function.

**Scope Chain Augmentation**

**Dynamic Scopes**

>Both the with statement and the catch clause of a try-catch statement, as well as a function containing (), are all considered to be dynamic scopes. A dynamic scope is one that exists only through execution of code and therefore cannot be determined simply by static analysis (looking at the code structure). 

**Closures, Scope, and Memory**

>Closures are one of the most powerful aspects of JavaScript, allowing a function to access data that is outside of its local scope. The use of closures has been popularized through the writings of Douglas Crockford and is now ubiquitous in most complex web applications. There is, however, a performance impact associated with using closures.


**Object Members**

>Most JavaScript is written in an object-oriented manner, either through the creation of custom objects or the use of built-in objects such as those in the Document Object Model (DOM) and Browser Object Model (BOM). As such, there tends to be a lot of object member access.


**Prototypes**

>Objects in JavaScript are based on prototypes. A prototype is an object that serves as the base of another object, defining and implementing members that a new object must have. This is a completely different concept than the traditional object-oriented programming concept of classes, which define the process for creating a new object. Prototype objects are shared amongst all instances of a given object type, and so all instances also share the prototype object's members.



>Objects can have two types of members: instance members (also called "own" members) and prototype members. Instance members exist directly on the object instance itself, whereas prototype members are inherited from the object prototype.


**Prototype Chains**

>The prototype of an object determines the type or types of which it is an instance. By default, all objects are instances of Object and inherit all of the basic methods, such as toString(). You can create a prototype of another type by defining and using a constructor. 

**Nested Members**

>Since object members may contain other members, it's not uncommon to see patterns such as window.location.href in JavaScript code. These nested members cause the JavaScript engine to go through the object member resolution process each time a dot is encountered. 


>It should come as no surprise, then, that the deeper the nested member, the slower the data is accessed. Evaluating location.href is always faster than window.location.href, which is faster than window.location.href.toString(). If these properties aren't on the object instances, then member resolution will take longer as the prototype chain is searched at each point.


**Caching Object Member Values**

>Generally speaking, if you\'re going to read an object property more than one time in a function, it's best to store that property value in a local variable. The local variable can then be used in place of the property to avoid ￼￼￼￼￼the performance overhead of another property lookup. This is especially important when dealing with nested object members that have a more dramatic effect on execution speed.


**Summary**

>Where you store and access data in JavaScript can have a measurable impact on the overall performance of your code. There are four places to access data from: literal values, variables, array items, and object members. These locations all have different performance considerations.

> * Literal values and local variables can be accessed very quickly, whereas array items and object members take longer.

> * Local variables are faster to access than out-of-scope variables because they exist in the first variable object of the scope chain. The further into the scope chain a variable is, the longer it takes to access. Global variables are always the slowest to access because they are always last in the scope chain.

> * Avoid the with statement because it augments the execution context scope chain. Also, be careful with the catch clause of a try-catch statement because it has the same effect.

> * Nested object members incur significant performance impact and should be minimized.

> * The deeper into the prototype chain that a property or method exists, the slower it is to access.

> * Generally speaking, you can improve the performance of JavaScript code by storing frequently used object members, array items, and out-of-scope variables in local variables. You can then access the local variables faster than the originals.
 
===

*  **DOM Scripting**

>DOM scripting is expensive, and it's a common performance bottleneck in rich web applications. 

> * Accessing and modifying DOM elements
> * Modifying the styles of DOM elements and causing repaints and reflows
> * Handling user interaction through DOM events

What is DOM and why is it slow?

**DOM in the Browser World**

>The Document Object Model (DOM) is a language-independent application interface (API) for working with XML and HTML documents. In the browser, you mostly work with HTML documents, although it's not uncommon for web applications to retrieve XML documents and use the DOM APIs to access data from those documents.

===

>It's common across browsers to keep DOM and JavaScript implementations independent of each other. In Internet Explorer, for example, the JavaScript implementation is called JScript and lives in a library file called jscript.dll, while the DOM implementation lives in another library, mshtml.dll (internally called Trident). This separation allows other technologies and languages, such as VBScript, to benefit from the DOM and the rendering functionality Trident has to offer. Safari uses WebKit's WebCore for DOM and rendering and has a separate JavaScriptCore engine (dubbed SquirrelFish in its latest version). Google Chrome also uses WebCore libraries from WebKit for rendering pages but implements its own JavaScript engine called V8. In Firefox, Spider-Monkey (the latest version is called TraceMonkey) is the JavaScript implementation, a separate part of the Gecko rendering engine.

===
>Even though the DOM is a language-independent API, in the browser the interface is implemented in JavaScript. Since most of the work in client-side scripting has to do with the underlying document, DOM is an important part of everyday JavaScript coding.


**Inherently Slow**

>Simply having two separate pieces of functionality interfacing with each other will always come at a cost. An excellent analogy is to think of DOM as a piece of land and JavaScript (meaning ECMAScript) as another piece of land, both connected with a toll bridge (see John Hrvatin, Microsoft,
MIX09, http://videos.visitmix.com/MIX09/T53F). Every time your ECMAScript needs access to the DOM, you have to cross this bridge and pay the performance toll fee. The more you work with the DOM, the more you pay. So the general recommendation is to cross that bridge as few times as possible and strive to stay in ECMAScript land. The rest of the chapter focuses on what this means exactly and where to look in order to make user interactions faster.


**DOM Access and Modification DOM**

>Simply accessing a DOM element comes at a pricethe "toll fee" discussed earlier. Modifying elements is even more expensive because it often causes the browser to recalculate changes in the page geometry.

>Naturally, the worst case of accessing or modifying elements is when you do it in loops, and especially in loops over HTML collections.

>The more you access the DOM, the slower your code executes. Therefore, the general rule of thumb is this: touch the DOM lightly, and stay within ECMAScript as much as possible.


**innerHTML Versus DOM methods**

>Using innerHTML will give you faster execution in most browsers in performance-critical operations that require updating a large part of the HTML page. But for most everyday cases there isn't a big difference, and so you should consider readability, maintenance, team preferences, and coding conventions when deciding on your approach.


**Cloning Nodes**

>Another way of updating page contents using DOM methods is to clone existing DOM elements instead of creating new onesin other words, using element.cloneNode() (where element is an existing node) instead of document.createElement().

===

>Cloning nodes is more efficient in most browsers, but not by a big margin. Regenerating the table from the previous example by creating the repeating elements only once and then copying them results in slightly faster execution time


**HTML Collections**

>HTML collections are array-like objects containing DOM node references. Examples of collections are the values returned by the following methods:

> * document.getElementsByName()
> * document.getElementsByClassName()
> * document.getElementsByTagName_r()

The following properties also return HTML collections:
> * document.images: All img elements on the page
> * document.links: All a elements
> * document.forms: All forms
> * document.forms[0].elements: All fields in the first form on the page

>
These methods and properties return HTMLCollection objects, which are array-like lists. They are not arrays (because they don't have methods such as push() or slice()), but provide a length property just like arrays and allow indexed access to the elements in the list. For example, document.images[1] returns the second element in the collection. As defined in the DOM standard, HTML collections are "assumed to be live, meaning that they are automatically updated when the underlying document is updated" (seehttp://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-75708506).

===
>The HTML collections are in fact queries against the document, and these queries are being reexecuted every time you need up-to-date information, such as the number of elements in the collection (i.e., the collection's length). This could be a source of inefficiencies.


**Expensive collections**

`// an accidentally infinite loop`

`var alldivs = document.getElementsByTagName_r('div');`

` for (var i = 0; i < alldivs.length; i++) {`

`document.body.appendChild(document.createElement('div'))`

` }`

>This code looks like it simply doubles the number of div elements on the page. It loops through the existing divs and creates a new div every time, appending it to the body. But this is in fact an infinite loop because the loop's exit condition, alldivs.length, increases by one with every iteration, reflecting the current state of the underlying document.

===
>Looping through HTML collections like this may lead to logic mistakes, but it's also slower, due to the fact that the query needs to run on every iteration

===

>For many use cases that require a single loop over a relatively small collection, just caching the length of the collection is good enough. But looping over an array is faster that looping over a collection, so if the elements of the collection are copied into an array first, accessing their properties is faster. Keep in mind that this comes at the price of an extra step and another loop over the collection, so it's important to profile and decide whether using an array copy will be beneficial in your specific case.

===

**Local variables when accessing collection elements**

>In general, for any type of DOM access it's best to use a local variable when the same DOM property or method is accessed more than once. When looping over a collection, the first optimization is to store the collection in a local variable and cache the length outside the loop, and then use a local variable inside the loop for elements that are accessed more than once.

===

**Walking the DOM**

>The DOM API provides multiple avenues to access specific parts of the overall document structure. In cases when you can choose between approaches, it's beneficial to use the most efficient API for a specific job.

===


**Crawling the DOM**

>Often you need to start from a DOM element and work with the surrounding elements, maybe recursively iterating over all children. You can do so by using the childNodes collection or by getting each element's sibling using nextSibling.


===
>Many modern browsers offer APIs that only return element nodes. It's better to use those when available, because they'll be faster than if you do the filtering yourself in JavaScript. Table 3-1 lists those convenient DOM properties.

===

>Looping over children instead of childNodes is faster because there are usually less items to loop over. Whitespaces in the HTML source code are actually text nodes, and they are not included in the children collection. children is faster than childNodes across all browsers, although usually not by a big margin1.5 to 3 times faster. One notable exception is IE, where iterating over the children collection is significantly faster than iterating over childNodes24 times faster in IE6 and 124 times faster in IE7.


**The Selectors API**

>When identifying the elements in the DOM to work with, developers often need finer control than methods such as getElementById() and getElementsByTagName() can provide. Sometimes you combine these calls and iterate over the returned nodes in order to get to the list of elements you need, but this refinement process can become inefficient.

===

>Now recent browser versions provide a method called querySelectorAll() as a native browser DOM method. Naturally this approach is faster than using JavaScript and DOM to iterate and narrow down a list of elements.

> #####The Selectors API is supported natively in browsers as of these versions: Internet Explorer 8, Firefox 3.5, Safari 3.1, Chrome 1, and Opera 10.

===


**Repaints and Reflows**

>Once the browser has downloaded all the components of a pageHTML markup, JavaScript, CSS, imagesit parses through the files and creates two internal data structures:

>A DOM tree: A representation of the page structure

>A render tree: A representation of how the DOM nodes will be displayed

===
>The render tree has at least one node for every node of the DOM tree that needs to be displayed (hidden DOM elements don't have a corresponding node in the render tree). Nodes in the render tree are called frames or boxes
in accordance with the CSS model that treats page elements as boxes with padding, margins, borders, and position. Once the DOM and the render trees are constructed, the browser can display ("paint") the elements on the page.


===

>When a DOM change affects the geometry of an element (width and height)such as a change in the thickness of the border or adding more text to a paragraph, resulting in an additional linethe browser needs to recalculate the geometry of the element as well as the geometry and position of other elements that could have been affected by the change. The browser invalidates the part of the render tree that was affected by the change and reconstructs the render tree. This process is known as a reflow. Once the reflow is complete, the browser redraws the affected parts of the screen in a process called repaint.

===
>Not all DOM changes affect the geometry. For example, changing the background color of an element won't change its width or height. In this case, there is a repaint only (no reflow), because the layout of the element hasn't changed.

===
>Repaints and reflows are expensive operations and can make the UI of a web application less responsive. As such, it's important to reduce their occurrences whenever possible.


**When Does a Reflow Happen?**

> * Visible DOM elements are added or removed
> * Elements change position
> * Elements change size (because of a change in margin, padding, border thickness, width, height, etc.)

> * Content is changed, e.g., text changes or an image is replaced with one of a different size

> * Page renders initially
> * Browser window is resized

>Depending on the nature of the change, a smaller or bigger part of the render tree needs to be recalculated. Some changes may cause a reflow of the whole page: for example, when a scroll bar appears.


===


**Queuing and Flushing Render Tree Changes**

>Because of the computation costs associated with each reflow, most browsers optimize the reflow process by queuing changes and performing them in batches. However, you may (often involuntarily) force the queue to be flushed and require that all scheduled changes be applied right away. Flushing the queue happens when you want to retrieve layout information, which means using any of the following:

> * offsetTop, offsetLeft, offsetWidth, offsetHeight
> * scrollTop, scrollLeft, scrollWidth, scrollHeight
> * clientTop, clientLeft, clientWidth, clientHeight
> * getComputedStyle() (currentStyle in IE) IE ￼ currentStyle

>The layout information returned by these properties and methods needs to be up to date, and so the browser has to execute the pending changes in the rendering queue and reflow in order to return the correct values.

===
>During the process of changing styles, it's best not to use any of the properties shown in the preceding list. All of these will flush the render queue, even in cases where you're retrieving layout information that wasn't recently changed or isn't even relevant to the latest changes.

===

**Minimizing Repaints and Reflows**

>Reflows and repaints can be expensive, and therefore a good strategy for responsive applications is to reduce their number. In order to minimize this number, you should combine multiple DOM and style changes into a batch and apply them once.

**Style changes**

>A more efficient way to achieve the same result is to combine all the changes and apply them at once, modifying the DOM only once. This can be done using the cssText property.

>Another way to apply style changes only once is to change the CSS class name instead of changing the inline styles. This approach is applicable in cases when the styles do not depend on runtime logic and calculations. Changing the CSS class name is cleaner and more maintainable; it helps keep your scripts free of presentation code, although it might come with a slight performance hit because the cascade needs to be checked when changing classes.

**Batching DOM changes**

>When you have a number of changes to apply to a DOM element, you can reduce the number of repaints and reflows by following these steps:

> * Take the element off of the document flow.
> * Apply multiple changes.
> * Bring the element back to the document.

>This process causes two reflowsone at step 1 and one at step 3. If you omit those steps, every change you make in step 2 could cause its own reflows.

===

>There are three basic ways to modify the DOM off the document:

> * Hide the element, apply changes, and show it again.
> * Use a document fragment to build a subtree outside of the live DOM and then copy it to the document.
> * Copy the original element into an off-document node, modify the copy, and then replace the original element once you're done.
> 

**Caching Layout Information**

>As already mentioned, browsers try to minimize the number of reflows by queuing changes and executing them in batches. But when you request layout information such as offsets, scroll values, or computed style values, the browser flushes the queue and applies all the changes in order to return the updated value. It is best to minimize the number of requests for layout information, and when you do request it, assign it to local variables and work with the local values.

===

**Take Elements Out of the Flow for Animations**

>Showing and hiding parts of a page in an expand/collapse manner is a common interaction pattern. It often includes geometry animation of the area being expanded, which pushes down the rest of the content on the page.


===

>Reflows sometimes affect only a small part of the render tree, but they can affect a larger portion, or even the whole tree. The less the browser needs to reflow, the more responsive your application will be. So when an animation at the top of the page pushes down almost the whole page, this will cause a big reflow and can be expensive, appearing choppy to the user. The more nodes in the render tree that need recalculation, the worse it becomes.


===
>A technique to avoid a reflow of a big part of the page is to use the following steps:

> * Use absolute positioning for the element you want to animate on the page, taking it out of the layout flow of the page.
> * Animate the element. When it expands, it will temporarily cover part of the page. This is a repaint, but only of a small part of the page instead of a reflow and repaint of a big page chunk.
> * When the animation is done, restore the positioning, thereby pushing down the rest of the document only once.

**Event Delegation**

>When there are a large number of elements on a page and each of them has one or more event handlers attached (such as onclick), this may affect performance. Attaching every handler comes at a priceeither in the form of heavier pages (more markup or JavaScript code) or in the form of runtime execution time. The more DOM nodes you need to touch and modify, the slower your application, especially because the event attaching phase usually happens at the onload (or DOMContentReady) event, which is a busy time for every interaction-rich web page. Attaching events takes processing time, and, in addition, the browser needs to keep track of each handler, which takes up memory. And at the end of it, a great number of these event handlers might never be needed(because the user clicked one button or link, not all 100 of them, for example), so a lot of the work might not be necessary.

===
>A simple and elegant technique for handling DOM events is event delegation. It's based on the fact that events bubble up and can be handled by a parent element. With event delegation, you attach only one handler on a wrapper element to handle all events that happen to the children descendant of that parent wrapper.

According to the DOM standard, each event has three phases:

> * Capturing
> * At target
> * Bubbling

**Summary**
>DOM access and manipulation are an important part of modern web applications. But every time you cross the bridge from ECMAScript to DOM-land, it comes at a cost. To reduce the performance costs related to DOM scripting, keep the following in mind:

> * Minimize DOM access, and try to work as much as possible in JavaScript.
> * Use local variables to store DOM references you'll access repeatedly.
> * Be careful when dealing with HTML collections because they represent the live, underlying document. Cache the collection length into a variable and use it when iterating, and make a copy of the collection into an array for heavy work on collections.
> * Use faster APIs when available, such as querySelectorAll() and firstElementChild.
> * Be mindful of repaints and reflows; batch style changes, manipulate the DOM tree "offline," and cache and minimize access to layout information.
> * Position absolutely during animations, and use drag and drop proxies.
> * Use event delegation to minimize the number of event handlers.

===


*  **Algorithms and Flow Control**

>The overall structure of your code is one of the main determinants as to how fast it will execute. Having a very small amount of code doesn't necessarily mean that it will run quickly, and having a large amount of code doesn't necessarily mean that it will run slowly. A lot of the performance impact is directly related to how the code has been organized and how you're attempting to solve a given problem.

**Loops**

>In most programming languages, the majority of code execution time is spent within loops. Looping over a series of values is one of the most frequently used patterns in programming and as such is also one of the areas where efforts to improve performance must be focused. Understanding the performance impact of loops in JavaScript is especially important, as infinite or long-running loops severely impact the overall user experience.

**Types of Loops**

**Loop Performance**

>A constant source of debate regarding loop performance is which loop to use. Of the four loop types provided by JavaScript, only one of them is significantly slower than the others: the for-in loop.

===
>Since each iteration through the loop results in a property lookup either on the instance or on a prototype, the for-in loop has considerably more overhead per iteration and is therefore slower than the other loops. For the same number of loop iterations, a for-in loop can end up as much as seven times slower than the other loop types. For this reason, it's recommended to avoid the for-in loop unless your intent is to iterate over an unknown number of object properties. If you have a finite, known list of properties to iterate over, it is faster to use one of the other loop types and use a pattern such as this:

`var props = ["prop1", "prop2"],`

`i=0;`

`while(i<props.length){`

`process(obj[props[i]])`

`}`

>This code creates an array whose members are property names. The while loop is used to iterate over this small number of properties and process the appropriate member on object. Rather than looking up each and every property on object, the code focuses on only the properties of interest, saving loop overhead and time.

===

>If loop type doesn't contribute to loop performance, then what does? There are actually just two factors:

> * Work done per iteration
> * Number of iterations

By decreasing either or both of these, you can positively impact the overall performance of the loop.

**Decreasing the work per iteration**

>You can also increase the performance of loops by reversing their order. Frequently, the order in which array items are processed is irrelevant to the task, and so starting at the last item and processing toward the first item is ￼￼￼￼an acceptable alternative. Reversing loop order is a common performance optimization in programming languages but generally isn't very well understood. In JavaScript, reversing a loop does result in a small performance improvement for loops, provided that you eliminate extra operations as a result:


**Conditionals**

**if-else Versus switch**

>The prevailing theory on using if-else versus switch is based on the number of conditions being tested: the larger the number of conditions, the more inclined you are to use a switch instead of if-else. This typically comes down to which code is easier to read. The argument is that if-else is easier to read when there are fewer conditions and switch is easier to read when the number of conditions is large.

**Recursion Patterns**

Iteration

>Any algorithm that can be implemented using recursion can also be implemented using iteration. Iterative algorithms typically consist of several different loops performing different aspects of the process, and thus introduce their own performance issues. However, using optimized loops in place of long-running recursive functions can result in performance improvements due to the lower overhead of loops versus that of executing a function.

**Memoization**

>Work avoidance is the best performance optimization technique. The less work your code has to do, the faster it executes. Along those lines, it also makes sense to avoid work repetition. Performing the same task multiple times is a waste of execution time. Memoization is an approach to avoid work repetition by caching previous calculations for later reuse, which makes memoization a useful technique for recursive algorithms.

**Summary**

>Just as with other programming languages, the way that you factor your code and the algorithm you choose affects the execution time of JavaScript. Unlike other programming languages, JavaScript has a restricted set of resources from which to draw, so optimization techniques are even more important.

> * The for, while, and do-while loops all have similar performance characteristics, and so no one loop type is significantly faster or slower than the others.
> * Avoid the for-in loop unless you need to iterate over a number of unknown object properties.
> * The best ways to improve loop performance are to decrease the amount of work done per iteration and decrease the number of loop iterations.
> * Generally speaking, switch is always faster than if-else, but isnt always the best solution.
> * Lookup tables are a faster alternative to multiple condition evaluation using if-else or switch.
> * Browser call stack size limits the amount of recursion that JavaScript is allowed to perform; stack overflow errors prevent the rest of the code from executing.
> * If you run into a stack overflow error, change the method to an iterative algorithm or make use of memoization to avoid work repetition.

>The larger the amount of code being executed, the larger the performance gain realized from using these strategies.

===



*  **Strings and RegExp**


>Practically all JavaScript programs are intimately tied to strings. For example, many applications use Ajax to fetch strings from a server, convert those strings into more easily usable JavaScript objects, and then generate strings of HTML from the data. A typical program deals with numerous tasks like these that require you to merge, split, rearrange, search, iterate over, and otherwise handle strings; and as web applications become more complex, progressively more of this processing is done in the browser.

**String Concatenation**

>String concatenation can be surprisingly performance intensive. It's a common task to build a string by continually adding to the end of it in a loop (e.g., when building up an HTML table or an XML document), but this sort of processing is notorious for its poor performance in some browsers.

Method            Example

The + operator    str = "a" + "b" + "c";

The += operator   str = "a"; str += "b"; str += "c";

array.join()      str = ["a", "b", "c"].join('');

string.concat()   str = "a"; str = str.concat("b", "c");

>All of these methods are fast when concatenating a few strings here and there, so for casual use, you should go with whatever is the most practical. As the length and number of strings that must be merged increases, however, some methods start to show their strength.


===
*  **Responsive Interfaces**

**The Browser UI Thread**

>The process shared by JavaScript and user interface updates is frequently referred to as the browser UI thread (though the term "thread" is not necessarily accurate for all browsers). The UI thread works on a simple queuing system where tasks are kept until the process is idle. Once idle, the next task in the queue is retrieved and executed. These tasks are either JavaScript code to execute or UI updates to perform, which include redraws and reflows (discussed in Chapter 3). Perhaps the most interesting part of this process is that each input may result in one or more tasks being added to the queue.

**Browser Limits**

>Browsers place limits on the amount of time that JavaScript take to execute. This is a necessary limitation to ensure that malicious coders can't lock up a user's browser or computer by performing intensive operations that will never end. There are two such limits: the call stack size limit (discussed in Chapter 4) and the long-running script limit. The long-running script limit is sometimes called the long-running script timer or the runaway script timer, but the basic idea is that the browser keeps track of how long a script has been running and will stop it once a certain limit is hit. 

**How Long Is Too Long?**

>If whole seconds are too long for JavaScript to execute, what is an appropriate amount of time? As it turns out, even one second is too long for a script to execute. The total amount of time that a single JavaScript operation should take (at a maximum) is 100 milliseconds. This number comes from research conducted by Robert Miller in 1968. Interestingly, usability expert Jakob Nielsen noted in his book Usability Engineering (Morgan Kaufmann, 1994) that this number hasn't changed over time and, in fact, was reaffirmed in 1991 by research at Xerox-PARC.


**Yielding with Timers**

>Despite your best efforts, there will be times when a JavaScript task cannot be completed in 100 milliseconds or less because of its complexity. In these cases, it's ideal to yield control of the UI thread so that UI updates may occur. Yielding control means stopping JavaScript execution and giving the UI a chance to update itself before continuing to execute the JavaScript. This is where JavaScript timers come into the picture.


**Timer Basics**

>The way that timers interact with the UI thread is helpful for breaking up long-running scripts into shorter segments. Calling setTimeout() or setInterval() tells the JavaScript engine to wait a certain amount of time and then add a JavaScript task to the UI queue.

===

>Keep in mind that the timer code can never be executed until after the function in which it was created is completely executed. For example, if the previous code is changed such that the timer delay is smaller and there is another function call after the timer is created, it's possible that the timer code will be queued before the onclick event handler has finished executing.


**Timer Precision**

>JavaScript timer delays are often imprecise, with slips of a few milliseconds in either direction. Just because you specify 250 milliseconds as the timer delay doesn't necessarily mean the task is queued exactly 250 milliseconds after setTimeout() is called. All browsers make an attempt to be as accurate as possible, but oftentimes a slip of a few milliseconds in either direction occurs. For this reason, timers are unreliable for measuring actual time passed.

===
>Timer resolution on Windows systems is 15 milliseconds, meaning that it will interpret a timer delay of 15 as either 0 or 15, depending on when the system time was last updated. Setting timer delays of less than 15 can cause browser locking in Internet Explorer, so the smallest recommended delay is 25 milliseconds (which will end up as either 15 or 30) to ensure a delay of at least 15 milliseconds.

**Array Processing with Timers**

>One common cause of long-running scripts is loops that take too long to execute. If you've already tried the loop optimization techniques presented in Chapter 4 but haven't been able to reduce the execution time enough, then timers are your next optimization step. The basic approach is to split up the loop's work into a series of timers.

**Two determining factors for whether a loop can be done asynchronously using timers:**

> * Does the processing have to be done synchronously?
> * Does the data have to be processed sequentially?

**Splitting Up Tasks**

>What we typically think of as one task can often be broken down into a series of subtasks. If a single function is taking too long to execute, check to see whether it can be broken down into a series of smaller functions that complete in smaller amounts of time. This is often as simple as considering a single line of code as an atomic task, even though multiple lines of code typically can be grouped together into a single task. Some functions are already easily broken down based on the other functions they call. 

**Timed Code**

>If you keep 100 milliseconds in mind as the absolute maximum amount of time that JavaScript should be allowed to run continuously, then you can start optimizing the previous patterns. My recommendation is to cut that number in half and never let any JavaScript code execute for longer than 50 milliseconds continuously, just to make sure the code never gets close to affecting the user experience.


===

>It's possible to track how long a piece of code has been running by using the native Date object. This is the way most JavaScript profiling works.

===

>Since each new Date object is initialized with the current system time, you can time code by creating new Date objects periodically and comparing their values. The plus operator (+) converts the Date object into a numeric representation so that any further arithmetic doesn't involve conversions. This same basic technique can be used to optimize the previous timer patterns.


**Timers and Performance**

>Timers can make a huge difference in the overall performance of your JavaScript code, but overusing them can have a negative effect on performance. The code in this section has used sequenced timers such that only one timer exists at a time and new ones are created only when the last timer has finished. Using timers in this way will not result in performance issues.

===

>Thomas found that low-frequency repeating timersthose occurring at intervals of one second or greaterhad little effect on overall web application responsiveness. The timer delays in this case are too large to create a bottleneck on the UI thread and are therefore safe to use repeatedly. When multiple repeating timers are used with a much greater frequency (between 100 and 200 milliseconds), however, Thomas found that the mobile Gmail application became noticeably slower and less responsive.

**Summary**

>JavaScript and user interface updates operate within the same process, so only one can be done at a time. This means that the user interface cannot react to input while JavaScript code is executing and vice versa. Managing the UI thread effectively means ensuring that JavaScript isn't allowed to run so long that the user experience is affected. To that end, the following should be kept in mind:

> * No JavaScript task should take longer than 100 milliseconds to execute. Longer execution times cause a noticeable delay in updates to the UI and negatively impact the overall user experience.
> * Browsers behave differently in response to user interaction during JavaScript execution.
Regardless of the behavior, the user experience becomes confusing and disjointed when JavaScript takes a long time to execute.
> * Timers can be used to schedule code for later execution, which allows you to split up long-running scripts into a series of smaller tasks.
> * Web workers are a feature in newer browsers that allow you to execute JavaScript code outside of the UI thread, thus preventing UI locking.


===
*  **Ajax asynchronous & XML**






