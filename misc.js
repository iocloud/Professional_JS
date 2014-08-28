// 函数节流
var processor = {
  timeoutId: null,
  //实际进行处理的代码
  performProcessing: function(){
  },
  // 初始处理调用的方法
  process: function(array, process, context){
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

// 自定义事件 亦称 pubsub模式
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
      for(var i = o, max = handlers.length; i < max; i++){
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

//或者其他对象可以继承EventTarget

//寄生组合式继承
function inheritPrototype(subType, superType){
  var prototype = superType.prototype;
  prototype.constructor = subType;
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
