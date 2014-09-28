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

*  **Data Access**

*  **DOM Scripting**

*  **Algorithms and Flow Control**

*  **Strings and RegExp**

*  **Responsive Interfaces**

*  **Ajax asynchronous & XML**

*  **Programming pratices**

*  **Building and deploying high-performance JS applications**



