<h3>Six Things You Might Not Know About Promises</h3>

Promises are a simple concept, and even if you haven’t had a chance to use them, you may have already read up on them. 
They are a valuable construct that enables asynchronous code to be structured in a more readable fasion, rather than 
as a mess of nested anonymous functions. This article touches on six things that you might not know about promises.

Before diving into the list, here is a quick reminder of what JavaScript promises look like:
<code>
var p = new Promise(function(resolve, reject) {

  resolve("hello world");
  
});

p.then(function(str){
  alert(str);
});
</code>
<hr>
<h4>One: <code>then()</code> Returns a Forked Promise</h4>

What is the difference between the following two blocks of code?
<hr>
//Exhibit A
<code>
var p = new Promise(/*...*/);
p.then(fn1);
p.then(fn2);
</code>
//Exhibit B
<code>
var p = new Promise(/*...*/);
p.then(fn1).then(fn2);
</code>
<hr>
If you think both code blocks are equivalent, you may be thinking that promises are nothing more than one-dimensional
arrays of callbacks. However, that is not actually the case. Every call to then() returns a forked promise. So, in
Exhibit A, if fn1() throws an exception, fn2() will still be called as normal.

In Exhibit B, if fn1() throws an exception, fn2() won't be called, because the first call to then() returned a new
promise, which was rejected due to the exception in fn1(). The result is that fn2() is skipped over.

The takeaway: promises can fork into multiple paths like a complex flow chart.

<h4>Two: Callbacks should pass results</h4>

What gets alerts when you run the following code?
<hr>
<code>
var p = new Promise(function(resolve, reject){
  resolve('hello, world');
});

p.then(function(str){})
.then(function(str){
  alert(str);
});
</code>
The alert in the second then() does not display anything. This is because callbacks, in the context of promises, aren't
so much callbacks as they are transforms of results. The promise expects your callback to either return the same result
of a replacement, which then gets passed on to the next callback.

This idea is similar to using adapters to transform a result, as shown in the following example.
<code>
var feetToMetres = function	(ft)	{ return ft * 12 * 0.0254; };
var p = new Promise(/*...*/);
p.then(feetToMetres).
then(function	(metres)	{
  alert(metres);
});
</code>

<h4>Three: Only exceptions from previous levels are caught</h4>

What is the difference between these two code blocks:
<hr>
//Exhibit A
<code>
new Promise(function(resolve, reject){
  resolve('hello, world');
}).then(
  function(str){
    throw new Error('uh oh');
  }
).then(
  undefined, function(error){
    alert(error);
  }
);
</code>
//Exhibit B
<code>
new Promise(function(resolve, reject) {
  resolve("hello world");
})
.then(
  function(str) {
    throw new Error("uh oh");
  },
  function(error) {
    alert(error);
  }
);
</code>
In exhibit A, when an exception is thrown in the first then(), it is caught in the second then() and 'un oh' is alerted.
This follows the rule that only exceptions from previous levels are caught.

In exhibit B, the callback and the error callback are the same level, meaning when the exception is thrown in the callback,
it won't be caught. In fact, Exhibit B's error callback will only execute if the promise is in a rejected state or if the 
promise itself throw an exception.

<h4>Four: Errors can be recovered from</h4>

Inside an error callback, if you don't re-throw the error, the promise will assume that you're recovered from the error
and will revert to the resolved state. In the following example, "I am saved" is displayed because the error callback in
the first then() did not re-throw the exception.
<hr>
<code>
var p = new Promise(function(resolve, reject){
  reject(new Error('pebkac'););
});

p.then(undefined, 
  function(err){return err}).
then(
  function(str){}, 
  function(error){alert("bad computer");}
);
</code>
Promises can be seen as layers on an onion. Each then() adds another layer to the onion. Each layer represents one activity
that can be handle. After that layer is over, the result is assumed to be fixed and ready for the next layer.


<h4>Five: Promise can be paused</h4>

Just because you are already executing inside a then() function, doesn't mean you can't pause it to complete something else 
first.To pause the current promise, or to have it wait for the completion of another promise, simply return another promise 
from with then().
<hr>
<code>
var p = new Promise(/*...*/);
 
p.then(function(str) {
  if(!loggedIn) {
    return new Promise(/*...*/);
  }
})
.then(function(str) {
  alert("Done.");
})
</code>
In the previous code sample, the alert will not be shown until the new promise has been resolved. This is a convenient way 
to introduce additional dependencies inside an existing asynchronous code path. For example, you may find that the user 
session has timed out and you may want to initiate a seconary login before continuing on with the previous code path.


<h4>Six: Resolved promises don't execute immediately</h4>

What gets alerts when you run the following code?
<hr>
<code>
function runme(){
	 var i = 0;
	 new Promise(function(resolve){
		  resolve()
	 }).then(function(){
		  i += 2;
	 });
	 alert(i);
}
</code>
You may think it will alert 2, since the promises is resolved immediately and the then() function is executed immediately
(asynchronously). However, the promises specification requires all calls to be forcefully asynchronous in an effort to be 
uniform.Therefore, the alert is called before the value of i is modified.

Various implementations of the<a href="https://github.com/promises-aplus/promises-spec/blob/master/implementations.md"><span style="color:navy;">Promise/A+ API</span></a>
