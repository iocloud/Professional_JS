#基于yui的前端“团队开发”模式
---
如今web项目也越来越大，单人开发一个网站已经不是什么新鲜事了，这种web项目规模扩大的速度似乎超过我们的想象，对代码的管理，对项目的控制，对分工的把握，对进度的高效推进……一系列的问题开始在web开发中显现出来，其实团队开发不是什么新东西，就像当年炒作ajax的概念一样，只是新瓶装旧酒罢了，只因互联网的丰富应用给了web工程师很多“创意”的空间，包括功能上、也包括技术上：比如google wave将10年前的聊天室技术做了包装，将长联接大胆应用于ajax中，再比如yui用面向团队面向对象的开发方法对web站点重新包装，使得web项目也具备类似erp的项目特点，在java风靡的年代大概还有些新意，再比如web开发中的迭代和极限编程则是10年前软件工程教科书上的东西……，因此 web行业本身没有太多新元素值得推崇，我们所做的，仅仅是在web高速发展的时候，将很多古老的方法应用其中而已。

刚才提到，web开发越来越依赖于团队，web项目也越来越具有完整、典型的生命周期：需求，设计，开发，测试，上线。这个过程会周而复始，并且会有多个周期的重叠或迭代。这使得我们越来越依赖传统软件工程学的方法，使用它来规范web项目的开发。

在大型web项目开发中，比较常用的是迭代模型。迭代是在一个主题项目中作类似增量开发的开发模式，它建立在主干代码相对稳定的基础上，适合项目革命性的版本升级不频繁的情况下使用。通常稳定的线上版本作为主干代码，如果在a时刻有新需求提出，则从此时从主干打出分支，在分支上针对a时刻的需求进行开发，开发完成并测试通过后将代码合并至主干。图中分支b在合并代码的时候和其母主干已经有区别，红色的部分就是新的“区别”，分支b在d时刻合并代码的时候，用 svn merge很方便，有冲突解决冲突，无冲突合并代码。

还有一种常用的开发模式：极限编程。极限编程是对团队成员要求很高的一种开发模式，每个成员负责的是一个方面而不是单独某个模块，比如一名php程序员负责项目中所有的后端程序，一名wd负责页面展示，一名项目经理，如果前端工作量很大的话顶多外加一名前端脚本工程师。整个项目的开发由这四人完成，而且完成既定需求的同时保持代码良好的结构、性能和可扩展。这种开发模式很精简也很快速，但这种项目往往不是孤立的，经常是一个大项目的子项目，或者仅仅是从主干拉出来的分支而已，每次快速开发后都会多少产生冗余，比如css、js或img文件不能被并行开发的其他分支共享，自然也无法重用，因此这种开发模式也仅仅适合工期短的项目开发。比如下图中的b分支。

然而在这两种典型的开发模式中，前端的开发一直处于一种尴尬境地，前端文件是一种资源文件，除了html页面之外，js、css和img文件是作为资源被 php文件使用的，因此js、css或img不像php文件那样，新功能开发完后可以直接覆盖掉原有文件，除了在svn中作备份以便回滚之外，并无版本的概念。而css、js和img在增加新功能后则不能覆盖原有文件，必须在文件名后缀上一个新的版本号另存一份，供新的php文件访问，而老版本的 css、js和img仍然被其他不确定的php文件引用着。

那么如果并发的多个分支项目中同时修改相同的js或css，问题就出现了，php代码可以合并到主干中，同一份js或css代码如何合并两个同时开发的版本呢？svn能解决部分问题，但解决不了根本问题，因此我们只有期望两个并发项目不会同时升级同一份js文件，也只有将js或css的粒度做到很细很细，即每个js或css文件都很小，只有一丁点的功能，这样小的功能被同时两个项目修改的概率自然会很低。可将js文件瓜分成众多小文件而且管理方便是何等不易。

yui很好的解决了这个问题，yui给出了一个高效拆分并管理js和css的思路：模块化。从yui2到yui3的过渡可以看到这种趋势，未来的 web项目但凡有点规模都需要模块化，在yui中，模块是分层次的，每个模块都有其依赖的子模块，子模块也有其依赖的孙模块，最后发现复杂的模块是由简单的模块拼装而成的。而每个模块都可以单独做成一个文件，这样就可以在项目开始之初，在前端架构阶段就规定好模块的粒度，这个粒度是取决于项目变化的程度的，变化越频繁，粒度就应当更高，以免并行项目对同一份js或css文件作更新。

这样的话，一个功能性的页面需要引用的只是一个页面逻辑的js文件，这个js文件去load其需要的模块，模块再去load各自需要的子模块以及孙模块，模块文件的递归load和去重由yui完成，我们只需要关注页面的js文件即可，每个模块都会自动去引用所需的css，不用我们操心。

如此高粒度的js文件和css文件在页面装载的时候是个大麻烦，下图是现在雅虎关系load的js文件，这还是在没有瓜分js模块的情况下，每个js文件占用一个请求，会大大降低页面的装载速度。

yui 给我们提供了combo的方法，但也仅仅针对yui的模块提供，对于项目中的js和css文件则没有combo的支持，yui3虽然是 beta版，至今也没有要支持的迹象，只要硬生生的去改yui源代码了。combo后的结果就是这样，yui2的资源和基于yui2的js文件以及 yui3的资源和基于yui3的js文件各一个请求，外加一个yuiloader.js和yui.js各一，这样yui2和yui3并存的情况下的js请求顶多也只有这4个了。

改 yui的代码也不费劲，在yui2中combo的处理是在的yuiloader.js中的combine函数中，在yui3中则是yui.js 中的combine中，可以根据自己的项目资源存储情况修改。这样，修改后的yui可以更广泛的支持combo，项目js文件就会和yui文件一并 combo输出，页面展示也会一下子从D上升到B或者A。

在yui的框架下的前端开发变的如此高效率也更加轻松，这样的话，高粒度的js模块代替了功能性的js开发，更加有利于代码的抽象和重用，也大大降低了并行开发中升级同一个js文件的苦恼。项目迭代前进的效率也会越来越高，而前端页面的性能却丝毫不受影响。
