#High performance JavaScript
***

*  **Loading and Execution**
&nbsp;&nbsp;Script positioning
> Most browsers use a single process for both user interface (UI) updates and JavaScript execution, so only one can happen at any given moment in time. 
***
>Keep in mind that browsers don't start rendering anything on the page until the opening <body> tag is encountered. 
***
>Internet Explorer 8, Firefox 3.5, Safari 4, and Chrome 2 all allow parallel downloads of JavaScript files. This is good news because the &lt;script&gt; tags dont necessarily block other &lt;script&gt; tags from downloading external resources. Unfortunately, JavaScript downloads still block downloading of other resources, such as images. And even though downloading a script doesnt block other scripts from downloading, the page must still wait for the JavaScript code to be downloaded and executed before continuing. So while the latest browsers have improved performance by allowing parallel downloads, the problem hasnt been completely solved. Script blocking still remains a problem.
***
>Because scripts block downloading of all resource types on the page, it's recommended to place all &lt;script&gt; tags as close to the bottom of the <body> tag as possible so as not to affect the download of the entire page.

***
&nbsp;&nbsp;Grouping Scripts

>Since each &lt;script&gt; tag blocks the page from rendering during initial download, it's helpful to limit the total number of &lt;script&gt; tags contained in the page. 

***eg:***

`<script type="text/javascript"
src="http://yui.yahooapis.com/combo?2.7.0/build/yahoo/yahoo-min.js&2.7.0/build/event/event-min.js"></s cript>`
<p>&nbsp;&nbsp;Nonblocking scripts</p>

*  **Data Access**
*  **DOM Scripting**
*  **Algorithms and Flow Control**
*  **Strings and RegExp**
*  **Responsive Interfaces**
*  **Ajax asynchronous & XML**
*  **Programming pratices**
*  **Building and deploying high-performance JS applications**



