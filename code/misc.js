/*|
|*| 临时代码
|*/

//发布/订阅模式

var publisher = {
  subscribers: {any: []},
  on: function(type, fn, context) {
    type = type || 'any';
      fn = typeof fn == 'function' ? fn : context[fn];
      if(typeof this.subscribers[type] == 'undefined'){
        this.subscribers[type] = [];
      }
      this.subscribers[type].push({fn:fn, context: context||this});
  },
  off: function(type, fn, context) {
    this.visitSubscribers('unsubscribe', type, fn, context);
  },
  fire: function(type, publication) {
    this.visitSubscribers('publish', type, publication);
  },
  visitSubscribers: function(action, type, arg, context) {
    var pubtype = type || 'any',
    i,
    subscribers = this.subscribers[pubtype],
    max = subscribers ? subscribers.length : 0;
    for(i = 0; i < max; i++){
      if(action === 'publish'){
        subscribers[i].fn.call(subscribers[i].context, arg);
      }else{
        if(subscribers[i].fn === arg && subscribers[i].context === context){
          subscribers[i].splice(i,1);
        }
      }
    }
  }
};

function makePublisher(o){
  for(var i in publisher){
    if(publisher.hasOwnProperty(i) && typeof publisher[i] == 'function'){
      o[i] = publisher[i];
    }
  }
  o.subscribers = {any: []};
}



// 函数节流
var processor = {
  timeoutId: null,
  //实际进行处理的代码
  performProcessing: function(){
  },
  // 初始处理调用的方法
  process: function(){
    clearTimeout(this.timeoutId);
    var that = this;
    this.timeoutId = setTimeout(function(){
      that.performProcessing();
    }, 100);
  }
};

//throttle函数简化processor
function throttle(method, context){
  clearTimeout(method.tId);
  method.tId = setTimeout(function(){
    method.call(context);
  }, 100);
}


// 数组分块Array chunking
function chunk(array, process, context){
  setTimeout(function inner(){
    var item = array.shift();
    process.call(context, item);
    if(array.length > 0){
      setTimeout(inner, 100);
    }
  }, 100);
}

// 自定义事件 OR pubsub模式
function EventTarget(){
  this.handlers = {};
}
EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function(type, handler){
    if(typeof this.handlers[type] == 'undefined'){
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },
  removeHandler: function(type, handler){
    if(this.handlers[type] instanceof Array){
      var handlers = this.handlers[type];
      for(var i = 0, max = handlers.length; i < max; i++){
        if(handlers[i] === handler){
          break;
        }
      }
      handlers.splice(i,1);
    }
  },
  fire: function(event){
    if(!event.target){
      event.target = this;
    }
    if(this.handlers[event.type] instanceof Array){
      var handlers = this.handlers[event.type];
      for(var i = 0, max = handlers.length; i < max; i++){
        handlers[i](event);
      }
    }
  }
};

//用法
/*
//创建一个新对象
var target = new EventTarget;

//添加一个事件处理程序
target.addHandler('message', handleMessage);

//触发事件
target.fire({type: 'message', message: 'hello, world'});

//删除事件处理程序
target.removeHandler('message', handleMessage);

function handleMessage(event){
  alert('Message received: ' + event.message || 'is null');
}
*/

//或者其他对象可以继承EventTarget

//寄生组合式继承
function inheritPrototype(subType, superType){
  var prototype = superType.prototype;
  //prototype.constructor = subType;
  subType.prototype = prototype;
}

function Person(name, age){
  EventTarget.call(this);
  this.name = name;
  this.age = age;
}

inheritPrototype(Person, EventTarget);
Person.prototype.say = function(message){
  this.fire({type: 'message', message: message});
}


//拖放
var DragDrop = function(){
  var dragging = null,
      dragdrop = new EventTarget,
      diffX = 0,
      diffY = 0;
  function handleEvent(event){
    //获取事件和目标
    event = event || window.event;
    var target= event.target || event.srcElement;
    //确定事件类型
    switch(event.type){
    case 'mousedown':
      if(target.className.indexOf('draggable') > -1){
        dragging = target;
        diffX = event.clientX - target.offsetLeft;
        diffY = event.clientY - target.offsetTop;
        drapdrop.fire({type: 'dragstart', target: dragging, x: event.clientX, y: event.clientY});
      }
      break;
    case 'mouseup':
      dragdrop.fire({type: 'dragend', target: dragging, x: event.clientX, y: event.clientY});
      dragging = null;
      break;
    case 'mousemove':
      if(dragging !== null){
        //get event
        event = event || window.event;
        //assign location
        dragging.style.left = (event.clientX - diffX) + 'px';
        dragging.style.top = (event.clientY - diffY) + 'px';
        //触发自定义事件
        dragdrop.fire({type: 'drag', target: dragging, x: event.clientX, y: event.clientY});
      }
      break;
    }
  }
  //公共接口
 dragdrop.enable = function(){
    if(document.addEventListener){
      document.addEventListener('mousedown', handleEvent, false);
      document.addEventListener('mouseup',   handleEvent, false);
      document.addEventListener('mousemove', handleEvent, false);
    }else{
      document.attach('onmousedown', handleEvent);
      document.attach('onmouseup', handleEvent);
      document.attach('onmousemove', handleEvent);
    }
  };
  dragdrop.disable = function(){
    if(document.removeEventListener){
      document.removeEventListener('mousedown', handleEvent, false);
      document.removeEventListener('mouseup',   handleEvent, false);
      document.removeEventListener('mousemove', handleEvent, false);
    }else{
      document.detach('onmousedown', handleEvent);
      document.detach('onmouseup', handleEvent);
      document.detach('onmousemove', handleEvent);
    }
  };
  return dragdrop;
  };
}();


function extend(o,p){
  for(var prop in p){
    o[prop] = p[prop];
  }
  return o;
}
function inherit(p){
  if(Object.create){
    return Object.create(p);
  }
  if(typeof p !== 'object'){
    return false;
  }
  function F(){}
  F.prototype = p;
  F.uber = p;
  return new F();
}
function merge(o,p){
  for(var prop in p){
    if(o.hasOwnProperty(prop)){
      continue;
    }
    o[prop] = p[prop];
  }
  return o;
}
function restrict(o,p){
  for(var prop in o){
    if(!(prop in o)){
      delete o[prop];
    }
  }
  return o;
}
function substrace(o,p){
  for(var prop in o){
    if(prop in o){
      delete o[prop];
    }
  }
  return o;
}


