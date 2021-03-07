 

# Vue文档

## 1. 认识与准备

Vue是**渐进式**JavaScript框架

特定: 易用, 灵活, 高效(超快的虚拟DOM)

渐进式理解:

1. 如果你已经有一个现成的服务端应用, 你可以将vue作 为该应用的一部分嵌入到里面,带来更加丰富的交互体验
2. 如果想将更多的交互放在前端来实现, 那么Vue的核心库及其生态系统也可以满足你的各式需求(core+vuex+vue-router).和其他的前端框架一样Vue允许你讲一个网页分割成可复用的组件,每个组件都包含自己的HTML,css,javascript以用来渲染网页中相应的地方
3. 如果我们构建一个大型的应用,在这一点上,我们可以需要将东西分割成为各自的组件和文件,vue可以用脚手架搭建开发的工程
4. 所谓的渐进式就是: 从中心的视图层开始向外扩散的结构工具层.这个过程会经历: 视图层渲染 -> 组件机制 -> 路由机制 -> 状态管理 -> 构建工具这五个层级

![28-1615129053992.png](https://gitee.com/feng_wenshan/web_style/raw/master/Vue/28-1615129053992.png)

**兼容性**:  Vue不支持IE8及以下版本,因为Vue如果使用了IE8无法模拟的ECMAScript5特性。但它支持所有兼容ECMAScrip5t的浏览器

**Vue Devtools**: 浏览器安装Vue Devtools, 用来调试与审查应用

**使用Vue**

```html
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue()
  </script>
</body>
```

源码

```js
function Vue (options) {
  /**
   * 如果在开发环境下,并且this不是Vue对象构造函数实例, 则对象构造函数调用warn函数并传入字符串作为一个参数,通知开发者使用new关键字将Vue作为构造函数来调用
   * 
   * 开发环境下什么情况this不指向Vue
   */
  // 如果当前是生产环境 && 
  if (process.env.NODE_ENV !== 'production' &&
    // 检查this是否不是Vue对象构造函数实例, 这句话也就是问用户是否new Vue
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // Vue构造函数, 调用this._init传入options
  this._init(options)
}
```

## 2. MVVM与MVC

**MVC(Model-View-Controller)** 

![](D:\Web\Vue\MVC-1615129053995.png)



这里的M、V和MVVM中的M、V意思一样,C页面业务逻辑, 使用MVC就是为了将M和V分离,MVC是单向的通信也就是View到Model.必须通过Controller来承上启下.

**MVVM(Model-View-ViewModel)**

![](D:\Web\Vue\MVVM.png)

MVVM就是MVC的改进版, MVVM就是将其中的View的状态和行为抽象化,让我们将视图和业务逻辑分开。

模型: 后端传递的数据

视图: 所看见的页面

视图模型: MVVM核心, 它是连接view和model的桥梁,可以分为两个方向: 

- 将model转化为view,将后端的数据转化为所看到的页面. 实现方式数据绑定
- 将view转化为model,页面转化为后端的数据, 实现方式DOM事件监听

这两个方法都实现我们称为`双向数据绑定`

在MVVM的框架下试图和模型不能直接通信.他们通过ViewModel来通信,ViewModel通常要实现一个observer观察者,当数据发生改变, ViewModel能够监听到这种变化,然后通过对应的视图做出更新。当用户操作视图ViewModel也能监听到视图变化,然后通过数据做改动,这实际上就实现了数据的双向绑定

MVC和MVVM并不是ViewModel取代Controller, ViewModel存在目的是在于抽离Controller中展示的业务逻辑,而不是Controller,其他视图操作业务等还是放在Controller里面实现,也就是说MVVM实现的是业务逻辑组件重用

在Vue中

- model: js中的数据,如对象,数组等.
- View: 页面视图view
- ViewModel: Vue实例化对象

## 3. 基础

### 3.1 Vue生命周期

[Vue生命周期图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

`beforeCreate`: 是new Vue()之后触发的第一个钩子, 在当前阶段data、methods、computed以及watch上的数据都不能访问; 

`created`: 在实例创建完成后发生,当前阶段已经完成数据观测,也就是可以用数据,更改数据,在这里更改数据不会触发updated函数,可以做一些初始数据的获取,在当前阶段无法与DOM进行交互, 如果想要交互, 可以通过vm.$nextTick来访问DOM

`beforeMount`: 发生在挂载之前,在这之前tempate模板已导入渲染函数编译。而当前阶段虚拟DOM已经创建完成,即将开始渲染。在此时也尅对数据进行更改,不会触发updated

`mounted`在挂载完成后发生,在当前阶段,真实的DOM挂载完毕,数据完成双向绑定,可以访问到DOM节点,使用$refs属性对DOM进行操作

`beforeUpdate`: 发生在更新之前,也就是响应式数据发生更新,虚拟dom重新渲染之前触发,你可以在当前阶段进行数据更改,不会操作重渲染

`updated`发生在更新完成之后, 当前阶段组件DOM以完成更新,要注意的是避免在此期间更改数据,因为可能导致无限循环更新

`beforeDestory`发生在实例销毁之前,在当前阶段实例完全可以被使用,我们可以在这时进行售后收尾工作,比如清除计时器

`destoryed`发生在实例销毁之后,这时候只剩下dom空壳. 组件已被拆解,数据绑定被卸除,监听被移出,自实例也统统被销毁 

[生命周期列表](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

相比上面添加了, 三个生命周期`activated`、`deactivated`、`errorCaptured`

`activated`: 被`keep-alive`缓存的组件激活时调用, 该钩子在服务器端渲染期间不被调用

`deactivated`: 被`keep-alive`缓存的组件停用时调用

`errorCaptured`: 

- 类型: (err: Error, vm: Component, info: string) => ?boolean
- 详情: 当捕获一个来自子孙组件的错误时被调用。此钩子会接受三个参数: 错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子返回false以阻止该错误继续向上传播

注意: 可以在这个钩子里面修改组件的状态。因此在捕获错误时,在模板或渲染函数中有一条件判断来绕过其他内容就很重要; 不然该组件可能会进入一个无限的渲染循环

**错误传播规则**

- 默认情况下, 如果全局的`config.errorHandler`被定义,所有的错误扔会发送它, 因此这些错误仍然会向单一的分析服务的地方进行汇报
- 如果一个组件的继承或父级从属链路中存在多个`errorCaptured`钩子,则它们将会被相同错误逐个唤起
- 如果此`errorCaptured`钩子自身抛出一个错误,则这个新错误和原本被捕获的错误都会发送给全局的`config.errorHandler`
- 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`。

###  3.2 声明式渲染

Vue核心就是允许采用简洁的模板语法来声明式地将数据渲染进DOM的系统

通过描述状态和dom之间的映射关系,就可以将状态渲染成dom呈现在用户界面中,也就是渲染到网页上

模板语法在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应式系统，Vue能够只能地计算出最少需要中心渲染多少组件，并把DOM操作次数减到最少

如果不喜欢虚拟DOM，喜欢原生的JS，可以不用模板，直接写渲染(render)函数，使用可选的JSX语法

如果模板语法中使用表达式：`{{ message.split('').reverse().join('') }}`这些表达式会在所属Vue实例的数据作用域下作为JavaScript被解析

这里涉及14中指令中v-text、v-html、v-pre、v-once、v-cloak

```html
<body>
  <div id="app">
    <!-- 这种差值表达式, 仔细看会有闪动效果: 从 {{message}} 变成 Hello Vue! -->
    <div>{{message}}</div>
    
    <!-- 
      v-cloak: 这个指令保持在元素上知道关联实例结束编译,
          和CSS规则`[v-cloak]{display: none}`一起使用,
          这个指令可以隐藏未编译的Mustache标签知道实例准备完毕(不会显示,直到编译结束)
      于是这种办法闪动问题
      -->
    <style> [v-cloak] { display: none;}</style>
    <div v-cloak>{{message}}</div>
    <!-- v-text: 的值会把div中的数据全部替换,部分替换,只能差值表达式,没有闪动 -->
    <div v-text="message"></div>
    
    <!-- 
        v-once: 只渲染元素和组件一次. 后面的重新渲染,元素,组件及其所有的子节点将被视为静态内容跳过
        这个可以优化性能(只会渲染一次,后面的响应式直接跳过) 
    -->
    <div v-once>{{message}}</div>

    <!-- 
      v-html: 更新元素的innerHTML, 
        注意: 内容按照普通的HTML插入-不会作为Vue模板编译 
      所以data里面的html模板直接插入下面, 里面的{{message}}不会编译
      -->
      <div v-html="html"></div>

    <!--v-pre: 跳过这个元素和子元素编译过程, 可以用来显示原始数据与标签, 跳过大量没有指令的节点加快编译-->
    <div v-pre>{{message}}</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      // 基于querySelector获取视图容器: 指定的容器不能是html与body标签
      el: '#app',
      data() {
        return {
          message: 'Hello Vue!',
          html: `
            <div>{{message}}</div>
          `
        }
      }
    })
  </script>
</body>
```

注意上面的message是响应式的, 修改下面data里面的message,上面的div里面的内容也会相应的修改

浏览器渲染成

```html
<div id="app">
    <div>Hello Vue!</div> 
    <div>Hello Vue!</div> 
    <div>Hello Vue!</div> <div>
    <div>{{message}}</div>
    </div> 
    	<div>Hello Vue!
    </div> 
    <div>{{message}}</div>
</div>
```

#### 7.13 Vue.set

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

使用方法: `vue.set(target, propertyName/index, value)`

### 7.14 Vue.delete

删除对象的属性。如果对象是响应式的,确保删除能触发更新视图

使用方法: `Vue.delete(target, propertyName/index)`

### 3.3 属性、class和Style绑定

#### 3.3.1 绑定属性

指令`v-bind`: 动态绑定属性:`v-bind:attribute = "value"`, 简写`:attribute="value"`

```html
<body>
  <div id="app">
    <div v-bind:title="message">123</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          message: 'Hello Vue!'
        }
      }
    })
  </script>
</body>
```

浏览器渲染成

```html
<body>
  <div id="app">
    <div title="Hello Vue!">123</div>
  </div>
</body>
```

#### 3.3.2 绑定class

对象语法与数组语法、还有个组件上使用请看下面

```html
<body>
  <style>
    .active { color: red }
  </style>
  <div id="app">
    <!-- 注意如果属性是 'text-danger' 连接类型需要加上引号-->
    <div v-bind:class="{active: isActive, 'text-danger': hasError}">
        绑定类型在内联样式上
    </div>
    <!-- 如果已经有class属性, 则会追加 -->
    <div class="static" 
         v-bind:class="{active: isActive, 'text-danger': hasError}">
        	456
      </div>

    <!-- 2. 绑定类名在对象上 -->
    <div class="static" :class="classObj">绑定类型在对象上</div>

    <!-- 3. 绑定返回计算属性, 这是一个非常强大的模式 -->
    <div class="static" :class="classObject">类名在计算属性上</div>

    <!-- 4. 绑定类名在给数组-->
    <div :class="[activeClass, errorClass]">类名绑定在数组上</div>
    <!-- 根据条件切换类名 -->
    <div :class="[isActive ? activeClass:'', errorClass]">根据条件切换数组类名</div>
    <!-- 根据条件写,如果太多逻辑很负责, 所以也可以在数组中使用对象 -->
    <div :class="[{active: isActive}, errorClass]">数组中使用对象语法切换</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          isActive: true,
          hasError: false,
          error: null,
          classObj: {
            active: true,
            'text-danger': false,
          },
          activeClass: 'active',
          errorClass: 'text-danger'
        }
      },
      computed: {
        classObject() {
          return {
            // !this.error = null 返回true
            active:　this.isActive && !this.error,
            'text-danger': this.error && this.error.type == 'fatal'
          }
        }
      }
    })
  </script>
</body>
```

浏览器渲染效果

```html
<div id="app">
    <div class="active">绑定类型在内联样式上</div> 
    <div class="static active">456</div> 
    
    <div class="static active">绑定类型在对象上</div> 
    <div class="static active">类名在计算属性上</div> 
 
    <div class="active text-danger">类名绑定在数组上</div> 
    <div class="active text-danger">根据条件切换数组类名</div> 
    <div class="active text-danger">数组中使用对象语法切换</div>
</div>
```

组件上使用

```html
<body>
  <div id="app">
    <my-component 
      class="baz boo"
      :class="{ active: isActive}">
    </my-component>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    Vue.component('my-component', {
      template:`<div class="foo bar">class绑定在组件上</div>`
    })
    new Vue({
      el: '#app',
      data() {
        return {
          isActive: true
        }
      }
    })
  </script>
</body>
```

浏览器效果

```html
<div id="app">
    <div class="foo bar baz boo active">class绑定在组件上</div>
</div>
```

#### 3.3.3 绑定style

`v-bind:style`使用有个好处, 当需要添加浏览器引擎前缀的`CSS property`时,Vue.js会自动侦测并添加相应的前缀

从2.3.0起可以为`style`绑定中的`property`提供一个包含多个值的数组,常用于提供多个带前缀的值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个呗浏览器支持的值, 如果浏览器一个一个不支持前缀,那么就会渲染`display: flex`

```html
<body>
  <style>
  </style>
  <div id="app">
    <!-- 如果属性名是两个连接在一起的: 属性名可以写成小驼峰式或者用引用引起来 -->
    <div :style="{color: activeColor, fontSize: fontSize}">style属性绑定</div>
    <div :style="{color: activeColor, 'font-size': fontSize}">style属性绑定</div>

    <!-- 直接绑定到一个样式对象更好, 代码更清晰 -->
    <div :style="styleObj">把属性与属性值写入对象中</div>

    <!-- 返回对象的计算属性 -->
    <div :style="styleObject"> 把属性用计算属性返回</div>
    <!-- 绑定多个类名在数组, 与class优点区别, 因为class是一个类名, 而这个是多个属性 -->
    <div :style="[styleObject]">绑定多个类名在数组</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          activeColor: 'red',
          fontSize: '20px',
          styleObj: {
            color: 'red',
            fontSize: '20px',
            'border-bottom': '1px solid red'
          }
        }
      },
      computed: {
        styleObject() {
          return {
            color: 'red',
            fontSize: '20px'
          }
        }
      }
    })
  </script>
</body>
```

浏览器渲染效果

```html
<div id="app">
    <div style="color: red; font-size: 20px;">style属性绑定</div> 
    <div style="color: red; font-size: 20px;">style属性绑定</div> 
    <div style="color: red; font-size: 20px; border-bottom: 1px solid red;">
        把属性与属性值写入对象中
    </div> 
    <div style="color: red; font-size: 20px;"> 把属性用计算属性返回</div> 
    <div style="color: red; font-size: 20px;">绑定多个类名在数组</div>
</div>
```

### 3.4 条件与循环

14个指令上面已经接触了6个: v-text、v-html、v-pre、v-once、v-cloak、v-bind

循环与条件指令： v-if、v-else、v-else-if、v-for、v-show

#### 3.4.1 条件渲染

```html
<body>
  <div id="app">
    <div v-if="isShow">显示</div>
    <div v-else>隐藏</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          isShow: true
        }
      }
    })
  </script>
</body>
```

一般用于`<template>`元素上使用`v-if`条件渲染分组

```html
<body>
  <div id="app">
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else>A | B</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          type: 'C'
        }
      }
    })
  </script>
</body>
```

`v-show`用于根据条件展示元素的选项, , 与`v-if`不同的是的元素始终会被渲染并保留在DOM中,`v-show`只是简单地切换元素的CSS属性`display`

注意: `v-show`不支持`<template>`元素,也不支持`v-else`

**`v-if`与`v-show`区别**

`v-if`是"真正"的条件渲染,因为他会确保在切换过程中条件内的事件监听和子组件适当地被销毁和重建

`v-if`也是懒惰的: 如果在初始渲染时条件为假,则什么也不做, 一直到条件第一次变为真时,才会开始渲染条件块

相比之下,`v-show`就简单很多,不管初始条件是什么,元素总是会被渲染,并且只是简单的基于css进行切换

一般来说, `v-if`有更高的开销,而`v-show`有更高的初始渲染开销。因此如果需要非常频繁的切换,则使用`v-show`较好; 如果在运行条件很少改变,则使用`v-if`较好

#### 3.5.2 列表渲染

可以使用`v-for`指令基于一个数组或对象来渲染一个列表。

渲染的是数组`item`就是代表被迭代的数组元的每一项元素的别名, `index`代表的是当前项的索引值,可以省略

渲染的是对象`value`必选, 代表当前被迭代的属性值,;`name`可选, 代表当前被迭代的属性名;`index`可选, 当前项的索引

注意: 遍历对象时, 会按`Object.keys()`的结果遍历,但是不能保证它的结果在不同的JavaScript引擎下都一致

当Vue正在更新使用`v-for`渲染的元素列表时, 它默认使用"就地更新"策略。如果数据项的顺序被改变,Vue将不会移动DOM元素来匹配数据项的顺序,而是就地更新每个元素,确保他们在每个索引位置正确渲染。这个模式是高效的, 但是`只适用于不依赖子组件状态或DOM状态(例如: 表单输入值)的列表渲染输出`。为了给Vue一个提示,以便它能耿总每个节点的身份,从而重用和重新排序现有的元素,需要为每项提供一个唯一的`key`属性

注意: 不要使用对象或者数组之类的非基本类型值作为`v-for`的key

尽可能在使用`v-for`时提供`key`属性,除非遍历输出的DOM内容非常简单或者刻意依赖默认行为以获取性能的提升

因为它是Vue识别节点的一个通用机制, `key`并不仅与`v-for`特别关联

```html
<body>
  <div id="app">
    <div class="arr" v-for="(item, index) in arr" v-bind:key="index">
        {{item.name}} -- {{index}}
    </div>
    <div class="obj" v-for="(value, name, index) of obj" v-bind:key="id">
        {{name}} -- {{value}} -- {{index}}
      </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          arr: [
            { name: '张三' },
            { name: '李四' }
          ],
          obj: {
            id: 1,
            title: '科技',
            author: 'lisi'
          }
        }
      }
    })
  </script>
</body>
```

- `v-for`可以在`<template>`上使用, 来循环渲染一段包含多个元素的内容, `v-if`也可以用在`<template>`上, 但是`v-show`与`v-else`不支持`<template>`
- 不推荐同时使用`v-if`与`v-for`, 当他们两一起使用的时候, `v-for`比`v-if`更高的优先级, 这就意味着`v-if`将分别重复运行于每个`v-for`循环中; 如果想要跳过`for`循环的优先级, 可以将`v-if`置于外层元素(或者`<template>`)上

### 3.5 conputed与watch

#### 3.5.1 计算属性

模板内的表达式非常便利,但是设计他们的初衷是用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

上面模板不在是简单的声明逻辑。你必须看一段时间才能意识到,这里是想要显示变量`message`的反转字符串.当你想要在模板中多包含此处的反转字符串时,就会更加难以处理, 所以对于任何复杂逻辑,应该使用计算属性

 ```html
<body>
  <div id="app">
    <div>{{message}}</div>
    <div>计算属性: {{reverMessage}}</div>
    <div>方法: {{reverMethodsMessage()}}</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello'
      },
      computed: {
        // 计算属性的getter
        reverMessage() {
          // 这里this指向Vue的实例
          return this.message.split('').reverse().join('')
        }
      },
      methods: {
        reverMethodsMessage() {
          return this.message.split('').reverse().join('')
        }
      }
    })
  </script>
</body>
 ```

但是方法也可以达到这个结果, 我们可以将同一函数定义为一个方法而不是计算属性。两种方式最终结果确实是完全相同的。然而,不同的是`计算属性是基于它们的响应式依赖进行缓存的`。只有在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要`message`还没有发生改变,对此访问`reverdMessage`计算属性会立即返回之前的计算结果,而不必再次执行函数

着也意味着下面的计算属性将不再更新,因为Date.noe()不是响应式依赖

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

相比之下,每当触发重新渲染时,调用方法将总会再次执行函数

我们为什么需要混存呢? 假设我们有一个性能开销比较大的计算属性A,它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于A。如果没有缓存,我们将不可避免的多次执行A的getter, 如果不希望有缓存,就用方法替代

#### 3.5.2 setter

计算属性默认只有getter,不过在需要时可以提供setter

```html
<body>
  <div id="app">
    计算属性: {{fullNames}}
    <button v-on:click="handle">点我</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        firstName: 'foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      methods: {
        handle: function() {
          this.firstName = 'GOO'
        }
      },
      computed: {
        fullNames: {
          get() { // getter
            return this.firstName + this.lastName
          },
          set(val) { // setter
            var name = val.split(' ')
            this.firstName = name[0]
            this.lastName = name[name.length -1]
          }
        }
      }
    })
  </script>
</body>
```

#### 3.5.3 侦听器

Vue提供一种更通用的方式来观测和相应Vue实例上的数据变动: `侦听属性`。当你有一些数据需要随着其他数据变动而变动时,你很容易滥用`watch`, 然而,通常更好的做法是使用计算属性而不是命令式的`watch`回调

虽然大部分的情况下计算属性更合适, 但是有时也需要一个自定义的侦听器。这就是为什么Vue通过`watch`选项提供一个更通用的方法,来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作的时候,这个方法更适合

```html
<body>
  <div id="app">
    侦听器: 
    {{fullName}}
    {{firstName}}
    <button v-on:click="handle">点我</button>
    计算属性: {{fullNames}}
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        firstName: 'foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      methods: {
        handle: function() {
          this.firstName = 'GOO'
        }
      },
      watch: {
        firstName(val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName(val) {
          this.fullName = this.lastName + ' ' + val
        }
      },
      computed: { // 这种的比侦听器相比好的多, 上面代码重复
        fullNames() {
          return this.firstName + this.lastName
        }
      }
    })
  </script>
</body>
```

## 4. 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

在组件的选项中定义本地过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建Vue实例之前全局定义过滤器

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

当全局过滤器和局部过滤器重名的时候， 会采用局部过滤器

## 5. 事件处理

### 5.1 事件处理方法

 前面已经接触了14个指令中的11个, 现在使用`v-on`指令监听事件,并在触发时运行一些JavaScript代码

有时候也需要在内联语句处理中访问原始的DOM事件, 可以用特殊变量`$event`把它传入方法

**监听事件**

```html
<body>
  <div id="app">
    {{count}}
    <button v-on:click="count++">点我</button>
    <button v-on:click="handleAdd">事件处理方法</button>
    <button v-on:click="handle(3)">内联处理器中的方法</button>
    <button type="submit" @click="submitHandle('Hello', $event)">提交表单</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        handleAdd() {
          this.count += 1
        },
        handle(val) {
          console.log(val)
          this.count += val
        },
        submitHandle(val, event) {
          if(event) event.peventDefault()
        }
      }
    })
  </script>
</body>
```

### 5.2 事件修饰符

在事件处理程序中调用`event.preventDefault()`或`eventPropagation()`是非常常见的需求。尽管我们可以在方法中实现这点, 但跟高的当时是: 方法只有纯粹的数据逻辑, 而不是去处理DOM事件细节

为了处理这个问题, Vue.js为`v-on`提供事件修饰符: `.stop`、`.prevent`、`.capture`、`.self`、`.once`、`.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面,阻止默认提交事件 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

不要把`.passive`与`.prevent`一起使用, 因为`.prevent`将会被忽略, 同时浏览器可能打印出警告。`.passive`会告诉浏览器你不想阻止事件的默认行为

**为什么在HTML中监听事件？**

因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

## 6. 表单

### 6.1 表单使用

第13个指令： `v-model`

`v-model`指令在表单`<input>`、`<textarea>`、`<select>`元素上创建双向绑定。他会根据控件类型自动选取正确的方式来更新元素。但是`v-model`本质上是`v-bind`与`input`事件的语法糖而已。它负责监听用户输入事件以更新数据。

注意: v-model不能放表达式, 如果需要放表达式, 使用`v-bind`与`@input`

```html
<body>
  <div id="app">
    <input type="text" v-on:input="handle" v-bind:value="message">
    {{message}}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return { message: '123'}
      },
      methods: {
        handle(e) {
          this.message = e.target.value
        }
      }
    })
  </script>
</body>
```

`v-model`会忽略所有表单元素`value`、`checked`、`selected`属性的初始值，总是将Vue实例的数据作为数据来源

`v-model`在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text和textarea元素使用`value`属性和`input`事件
- checkbox和radio使用`checked`属性和`change`事件
- select字段将`value`作为prop并将`change`作为事件

注意: 多行文本`<textarea>{{text}}</textarea>`, 不会生效, 应用`v-model`来代替

```html
	<body>
		<div id="app">
			<form action="https://www.baidu.com/">
				<div>
					<span>姓名: </span>
					<span>
						<input type="text" v-model="uname">
					</span>
				</div>
				<div>
					<span>性别: </span>
					<span>
						<input type="radio" id = 'male' v-model="gender" value = '1'>
						<label for='male'>男</label>
						<input type="radio" id='monmale' v-model = "gender" value = '2'> 
						<label for='monmale'>女</label>
					</span>
				</div>
				<div>
					<span>爱好: </span>
					<input type="checkbox" id = 'ball' v-model="hobby" value="1">
					<label for = 'ball'>篮球</label>
					<input type="checkbox" id='sing' v-model="hobby" value="2">
					<label for="sing">唱歌</label>
					<input type="checkbox" id = 'code' v-model="hobby" value="3">
					<label for = "code">写代码</label>
				</div>
				<div>
					<span>职业: </span>
					<select v-model="occupation">
						<option value="1" >选择职业...</option>
						<option value="2">教师</option>
						<option value="3">软件工程师</option>
						<option value="4">律师</option>
					</select>
				</div>
				<div class = "item">
					<span style = "vertical-align: top;">职业: </span>
					<select v-model="occupation1" multiple="multiple">
						<option value="1" >选择职业...</option>
						<option value="2">教师</option>
						<option value="3">软件工程师</option>
						<option value="4">律师</option>
					</select>
				</div>
				<div>
					<span style = "vertical-align: top;">个人简介: </span>
					<textarea rows="10px" cols="20px" style="resize:none;overflow: hidden;"
					v-model="desc">
						
					</textarea>
				</div>
				<div>
					<input type="submit" value = "提交" @click.prevent="handle"/>
				</div>
			</form>
		</div>
		<script type="text/javascript" src="../vue.js"></script>
		<script type="text/javascript">
			let vm = new Vue({
				el: '#app',
				data: {
					uname: '123',
					gender: 1,
					hobby: [],
					occupation: 1,
					occupation1: [1,2],
					desc: 'nihao'
				},
				methods: {
					handle: function() {
						console.log(this.hobby.toString()+ '---'+this.occupation);
					}
				}
			});
		</script>
	</body>
```

### 6.2 修饰符

- `.lazy`

在默认情况下, `v-model`在每次`input`事件触发后将输入框的值与数据进行同步, 可以添加`lazy`修饰符,从而转为`change`事件(失去交单触发)

- `.number`

如果想自动`将用户输入的值转为数值类型`, 可以给`v-model`添加`number`修饰符, 这通常很有用, 因为即使在`type="number"`时,HTML输入元素的值也总会返回字符串。如果这个值无法被`parseFloat()`解析, 则会返回原始值

注意: 最开始如果输入字符串, 那么可以直接输入字符串, 但是如果开始输入数字, 那么后面就输入不了字符串, 如果想要表单只能输入数字, 那么就需要用正则匹配内容: `value.replace(/[^0-9]/g,'');`

- `trim`

如果要自动过滤用户输入的首尾空白字符,可以给`v-model`添加`trim`修饰符

```html
<input v-model.lazy="msg">
<input v-model.number="age" type="number">
<input v-model.trim="msg">
```

## 7. 模板语法

在底层的实现上, Vue将模板语法编译成虚拟DOM渲染函数。结合响应式系统,Vue能够智能地计算出最少需要重新渲染多少组件,并把DOM操作次数减到最少

```html
<body>
  <div id="app">
    {{count}} <button @click="handle(2)">点我+2</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data() {
        return {
          count: 1
        }
      },
      methods: {
        handle(e) {
          this.count += e
        }
      }
    })
    // 输出Vue替我们生成的渲染函数
    console.log(vm.$options.render)
  </script>
</body>
```

输出:

```js
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_v("\n    "+_s(count)+" "),_c('button',{on:{"click":function($event){return handle(2)}}},[_v("点我+2")])])}
})
```

```html
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data() {
        return {
          count: 1
        }
      },
      methods: {
        handle(e) {
          this.count += e
        }
      },
      render() { // 这个是上面#app模板语法里面编译, 生成的渲染函数, 执行它也能得到模板一样的结果
        with(this){
          return _c('div',{attrs:{"id":"app"}},[_v("\n    "+_s(count)+" "),_c('button',{on:{"click":function($event){return handle(2)}}},[_v("点我+2")])])
        }
      }
    })
  </script>
</body>
```



## 8. 组件基础

### 8.1 组件使用

 在注册一个组件的时候，需要给组件一个名字， 该组件名就是`Vue.component`的第一个参数， 给与组件的名字可能依赖于你打算拿它干什么。当直接在DOM中使用一个组件(不是字符串模板或单文件组件)的时候, 组钉子组件名(字母全小写且必须包含一个连字符)。这会避免和当前以及未来的HTML元素起冲突

### 7.2 全局组件

全局注册的组件可以用在被注册之后的任何(通过 `new Vue`)新创建的Vue根实例, 也包括其组件树中的所有子组件的模板中

```html
<body>
  <div id="app">
      <!-- 组件复用 -->
      <button-count></button-count>
      <button-count></button-count>
  </div>
  <!--
    <template id="temp">
    	<div>
    		{{count}}
    		<button @click="handle(2)">点我加2</button>
    	</div>
    </template>
  -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    Vue.component('button-count', {
      data() {
        return { count: 0 }
      },
      methods: {
        handle(e) {
          this.count += e
        }
      },
      template: `<div>{{count}}<button @click="handle(2)">点我加2</button></div>`
      // template: '#temp'
    })
    new Vue({
      el: '#app',

    })
  </script>
</body>
```

组件是可复用的Vue实例, 且带有一个名字: 上面例子中`<button-count>`。我们可以通过`new Vue()`创建的Vue根实例中,把这个组件作为自定义元素使用

因为组件是可复用Vue实例, 所以他们与`new Vue`接收相同选项,例如: `data`、`computed`、`watch`、`methods`以及生命周期钩子等。仅有的例外是像`el`这样根实例特有的选项

**一个组件的data选项必须是一个函数**, 因此每个实例可以维护一份被返回对象对立的拷贝

### 7.3 局部组件

全局注册往往是不够理想的。比如,如果使用一个像webpack这样的构建系统,全局注册所有的组件意味着即便你已经不在需要这个组价了, 它仍然会被包含在你最终的构建结果中。这造成用户下载的JavaScript的无谓的增加

这种情况下, 可以通过一个普通的JavaScript对象来定义组件

```js
var HelloTom = { // 局部组件
    data() {
        return {
            msg1: 'Hell0 局部组件'
        };
    },
    template: `<div>{{msg1}}</div>`
};
let vm = new Vue({
    el: '#app',
    components: {// 局部组件
        'hello-tom': HelloTom,
    } 
});
```

### 7.4 prop

所有的prop都使得其父子prop之间形成一个**单向下行绑定**: 父级prop的更新会向下流动到子组件中,但是反过来则不行。这样会阻止从子组件意外变更父级组件的状态,从而导致你的应用的数据流难以理解, 另外每次父组件发生变更时,子组件中所有的prop都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变prop。如果这样做了, Vue会在浏览器的控制台发生警告

有两种情况试图更改本地prop的情形:

- 这个prop用来向下传递初始值, 这个子组件接下来希望将其作为一个本地的prop数据来使用, 在这种情况下, 最好定义一个本地的data属性并将这个prop用作其初始值
- 这个prop以一种原始的值传入且需要进行转换。在这种情况下最好使用这个prop值来定义一个计算属性

**props验证**

```js
Vue.component('my-component', {
  // propps: ['propA', 'propB', 'propC', ...] // 不建议使用, 一般用于项目的初稿,快速开发
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

当prop验证失败的时候, 开发环境下Vue将会产生一个控制台警告

### 7.4 父→子通信

`Prop`是你可以在组件上注册的一些自定义属性,当一个值传递给一个prop属性的时候,它就变成那个组件实例的一个property

 一个组件默认可以拥有任意数量的prop,任何值都可以传递给任何prop。在下面模板中能够在组件实例中访问这个值, 就像访问`data`中的值一样

注意: 

- 如果父组件向子组件传递`data-count`这种格式, 那么子组件中props接收就需要大驼峰式接收DataCount或小驼峰dataCount
- 如果父组件向子组件传递`DATA`这种全大写, 那么子组件props接收就需要转成全小写`data`
- 父主件身上的标签内置属性`style, class, id等`, 都会被子组件的最外层html标签继承, 继承方式不是覆盖, 而是追加(`id属性除外:父主件身上的id属性会覆盖自附件最外层html标签的id属性`)

案例: 项目中经常使用的点击`新建按钮出来弹窗`

![](D:\Web\Vue\01_props-1615129053995.png)

```html
// 父组件
<template>
  <div class="valueTransfer">
    <el-button type="primary" @click="addDialog">
      新建
    </el-button>
    <Dialog
      :dialogVisible="dialogVisible"
      id="dialogId"
      class="dialogClass"
      data-id="1-1"
      style="color: red"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from './components/Dialog'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false, // 控制Dialog组件的显示与隐藏
    }
  },
  methods: {
    addDialog() {
      this.dialogVisible = true;
    }
  }
}
</script>

```

```vue
// 子组件
<template>
  <el-dialog title="提示" width="30%" :visible.sync="dialogVisible" >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
```

### 7.5 `$attrs`与`inheritAttrs`、`$listener`、`.native修饰符`

- $attrs

父组件身上向下传递的所有属性(v-bind, 自定义属性, id等)都会在`$attrs`子组件这个对象里面(父组件向下传递的数据在props里面与事件`@click`, class, style除外), 并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用

- inheritAttrs

默认情况下父组件身上不能被props向下传递的属性(style, id, class等), 将会绑定到子组件根标签(template下面的唯一标签)且作为普通的HTML属性应用在子组件的根元素上

默认情况下父作用域的属性不能被 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为(子组件根元素不希望有这属性, 但是除了class与style不生效)。通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例 property `$attrs` 可以让这些 attribute 生效(因为$attrs身上有父组件身上的属性)，且可以通过 `v-bind` 显性的绑定到非根元素上。

注意：这个选项**不影响** `class` 和 `style` 绑定。

```vue
// $attrs属性与inheritAttrs属性使用
<template>
  <div>
    <input v-bind="$attrs">
  </div>
</template>

<script>
export default {
  // 设置false, 避免副作用域属性设置到div根元素上,除了class与style属性
  inheritAttrs: false, 
}
</script>
```

- $listener 

父组件上`v-on`的事件监听器(不包含.native修饰器), 可以通过`v-on="$listeners"`传入内部组件 - 在创建更高层级的组件时非常有用

`$listeners` 是一个对象里面包含了作用在这个组件上的所有监听器

```js
{
  click: function () { /* ... */ }
  input: function (value) { /* ... */ },
}
```

- `.native`

如果想直接监听子组件根元素(template标签下面的唯一儿子)上监听一个原生事件, 可以使用`v-on.native`修饰符

```vue
// 父组件(弹框)
<template>
  <div class="valueTransfer">
    <el-button type="primary" @click="dialogVisible = true">
      新建
    </el-button>
    <Dialog
      :dialogVisible="dialogVisible"
      :disabled="disabled"
      id="dialogId"
      class="dialogClass"
      data-id="1-1"
      style="color: red"
      @click="dialogClickHandle"
      @focus="dialogFocusHandle"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from './components/Dialog'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false, // 控制Dialog组件的显示与隐藏,
      disabled: true
    }
  },
  methods: {
    dialogClickHandle() {
      this.dialogVisible = !this.dialogVisible;
      console.log('监听子组件取消按钮被点击');
    },
    dialogFocusHandle() {
      console.log('表单获取焦点触发');
    }
  }
}
</script>

```

```vue
// 子组件弹框内容
<template>
  <el-dialog title="提示" width="30%" :visible.sync="dialogVisible" >
    {{$attrs}}
    <span>新建</span>
    <el-input
      v-model="num"
      @input="num = num.replace(/[^0-9]/g,'')"
      v-on="inputListeners"
    ></el-input>
    <myInput @focus.native="focusHandle"/>
    <span slot="footer" class="dialog-footer">
    <el-button v-on="$listeners">取 消</el-button>
    <el-button
      type="primary"
      @click="dialogVisible = false"
      :disabled="$attrs.disabled"
    >
      确 定
    </el-button>
  </span>
  </el-dialog>
</template>

<script>
import myInput from './myInput'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    myInput,
  },
  data() {
    return {
      num: '',
    }
  },
  computed: {
    inputListeners() {
      let vm = this
      // 自定义监听器: 获取焦点
      return Object.assign({}, this.$listeners, {
        focus: function() {
          vm.$emit('focus')
        }
      })
    }
  },
  methods: {
    focusHandle(e) {
      console.log(e)
    }
  },

}
</script>

```

```vue
// my-input组件
<template>
  <input type="text" v-model="num"/>
</template>

<script>
export default {
  name: "myInput",
  data() {
    return {
      num: ''
    }
  }
}
</script>

```

### 7.5 子→父通信`$emit`

子组件定义自定义事件`buttonClick`, 然后子组件触发自定义事件, 同时父组件绑定自定义事件(@自定义事件名), , 当子组件触发自定义事件, 父组件执行自定义事件

```vue
// 父组件
<template>
  <div class="valueTransfer2">
    组件通信知识点2:
    <ul>
      <li>$emit, .sync修饰符, 组件v-model</li>
    </ul>
    <div>当前子组件的值为: {{count}}</div>
    <my-button @buttonClick="buttonOnClick"></my-button>
  </div>
</template>

<script>
import myButton from "./components/myButton";
export default {
  components: {
    myButton
  },
  data() {
    return { count: 0 }
  },
  methods: {
    buttonOnClick(val) {
      this.count = val
    }
  }
}
</script>
```

```vue
// 子组件
<template>
  <div class="myButton">
    <button
      class="el-button el-button--primary"
      @click="$emit('buttonClick', ++count)"
    >我是子组件, 我被点击了</button>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

### 组件双向数据绑定

```vue
<template>
  <div class="valueTransfer2">
    <div>子组件输入的value值: {{value}}</div>
    <my-input :value="value" @input="(e)=>value=e"></my-input>
    <!-- 简化版-->
    <my-input v-model="value"></my-input>
  </div>
</template>

<script>
import myInput from "./components/myInput";
export default {
  components: {
    myInput,
  },
  data() {
    return { value: '', }
  }
}
</script>
```

```vue
// 子组件
<template>
  <input
    type="text"
    :value="$attrs.value"
    @input="$emit('input', $event.target.value)"
  >
</template>
```

### `.sync修饰符`

我们可能需要对一个 prop 进行“双向绑定”(在子组件里面更改父组件数据)。真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

从 2.3.0 起重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```vue
doc: { a: 2, b: false, c: '11111' }
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑

```vue
// 父组件, 点击新建按钮, 弹出Dialog弹窗
<template>
  <div class="valueTransfer">
    <el-button type="primary" @click="dialogVisible = true">
      新建
    </el-button>
    <!--会被扩展为
    <Dialog
      :dialogVisible="dialogVisible"
      @update:dialogVisible="val => val=dialogVisible"
      @click="dialogClickHandle"
    />-->
    <Dialog
      :dialogVisible.sync="dialogVisible"
      @click="dialogClickHandle"
      @returnHandle="returnHandle"
    ></Dialog>
    <hr/>
  </div>
</template>

<script>
import Dialog from './components/Dialog'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false, // 控制Dialog组件的显示与隐藏,
    }
  },
  methods: {
    dialogClickHandle() {
      this.dialogVisible = !this.dialogVisible;
      console.log('监听子组件取消按钮被点击');
    },
    returnHandle(flag) {
      this.dialogVisible = flag
    }
  }
}
</script>

```

子组件点击按钮关闭父组件弹窗

- 方法1: `$emit`子组件自定义事件, 触发自定义方法接收参数, 从而改变改变父组件`dialogVisible
- 方法2: 在父组件写一个点击方法, 然后子组件进行监听`$listeners`
- 方法2: `update:myPropName` (.sync)的模式触发事件

```vue
// 子组件弹窗
<template>
  <el-dialog
    title="提示" width="30%"
    :visible="dialogVisible"
    @close="closeHandle"
  >
    <span>新建</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('returnHandle', false)">返回</el-button>
    <el-button v-on="$listeners">取 消</el-button>
    <el-button @click="$emit('update:dialogVisible', false)">
      确 定
    </el-button>
  </span>
  </el-dialog>
</template>

<script>
import myInput from './myInput'
import inputContent from './inputContent'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    }
  }
  methods: {
    closeHandle() {
      this.$emit('update:dialogVisible', false)
    }
  },

}
</script>
```

### `$parent`、`$children`、`$root`、`$ref`

- $parent

当前组件的的父组件的实例, 如果当前组件没有父组件, 那么就是自己的实例

- $children

当前组件上的所有子组件的示例,数组形式保存($children并不会保证顺序, 也不是响应式), 如果你发现自己正在尝试使用 `$children` 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 Array 作为真正的来源

- $root

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己

- $ref

有时候需要访问子组件, 可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用

```vue
<base-input ref="usernameInput"></base-input>
this.$refs.usernameInput // 获取子组件"引用为usernameInput"组件的dom
```

### 7.6 兄弟组件通信$bus

通过在Vue原型上添加一个Vue实例作为事件总线, 实现组件间相互通信, 而且不受组件间关系的影响

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()  // 添加$bus, 全局就可访问Vue实例

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

Vue中的`$emit`与`$on`

```js
this.$emit('msg', this.msg) // 发送数据
this.$on('msg', funtion(msg){/* 数据操作*/ })
```

```Vue
// 父组件
<div class="myinput">
    <myInput @focus.native="focusHandle"/>
    <myContent></myContent>
</div>
```

```vue
// myInput
<template>
  <input type="text" v-model="num"/>
</template>

<script>
export default {
  name: "myInput",
  data() {
    return {
      num: ''
    }
  },
  watch: {
    num(newVal) {
      // 发送数据
      this.$bus.$emit('num', newVal)
    }
  }
}
</script>
```

```vue
<template>
  <div class="inputContent">{{num}}</div>
</template>

<script>
export default {
  name: "inputContent",
  data() {
    return {
      num: ''
    }
  },
  mounted () {
    // 数据操作
    this.$bus.$on('num', (num) => {
      this.num = num
    })
  },
  destroyed (){
    // 使用$bus的时候在使用bus的组件中, 需要在beforDestroy函数中销毁bus, 不销毁的话会一直叠加的调用方法
    this.$bus.$off('num')
  }
}
</script>
```

###  7.7 祖孙组件传值(`provide`/`inject`)

类型

- provide: `Object | () => Object`

返回`一个对象`或者返回`一个对象函数`。该对象包含可注入其子孙的property, 在对象中可以使用symbol作为key值, 但是只在原生支持Symbol和Reflect.ownKeys的环境下工作

- inject: `Array<string> | { [key: string]:string | Stmbol | Object }`

`inject`接收是`一个字符串数组` 或者 `一个对象, 对象的key是本地的绑定名, value是 在可用的注入内容中搜索用的key(字符串或Symbol) 或者 一个对象该对象的form property是在可用的注入内容中搜索用的key(字符串或者Symbol)`

`provide`和`inject`需要一起使用, 以允许一个祖先组件向其子组件后代注入一个依赖,无论层级有多深

注意`provide`和`inject`主要在开发高阶插件/组件库的时候使用。并不推荐普通应用程序代码中, 如果层级比较深比知道值在哪个地方传递下来的或者下面的值向上找很多层也很麻烦, 耦合性不高; 还有`provideo`和`inject`绑定并不是可响应式的。但是如果传递的是可监听的对象,那么其对象的property还是可响应的

```js
var Father = { // 父组件提供'foo'
    provide: { foo: 'bar'}
}
var child ={
    inject: ['foo'], // 下面方法访问, this.foo
}

// 2. 利用symbol 函数proide和对象inject
const s = Symbol()
var Father = {
    provide() {
        provide() {
            return { [s]: 'foo'}
        }
    }
}
var child = {
    inject: { s } // 这个s每次的内存都是不同的
}

// 3. 使用注入值的为property默认值(注入foo为props里面bar属性的默认值)
var child = {
    inject: ['foo'],
    props:｛
    	bar: { default() { return this.foo } }
    ｝
}
// 4. 注入的值为数据入口(data数据里面的初始值)
var child = {
    inject: ['foo'],
    data() {
        return { bar: this.foo }
    }
}
// 5. 设置注入的默认值(注入这个属性就可以变成可选)
const child = {
    inject: { foo: { default: 'foo' } }
}
// 6. 如果它需要不同名字property注入, 则使用from来表示其源property
const child = {
    inject: {
        foo: { 
        	from: 'bar',
            default: 'foo'
        }
    }
}
// 7. 与prop的默认值类似, 需要对非原始值使用工厂方法
const child = {
    inject: {
        foo: {
            from: 'bar',
            default: () => [1,2,3]
        }
    }
}
```

### 程序化的事件侦听器

现在知道`$emit`的用法, 它可以被`v-on`侦听, 但是Vue实例同时在其事件接口中提供了其他的方法, 我们可以:

- 通过`$on(eventName, eventHandler)`侦听一个事件
- 通过`$once(eventName, eventHandler)`一次性侦听一个事件
- 通过`$off(eventName, eventHandler)`停止侦听一个事件

当你需要在一个组件实例上手动侦听事件时, 它们是派的上用场。他们也可以用于代码组织工具

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

这里有两个潜在的问题：

- 它需要在这个组件实例中保存这个 `picker`，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。

你应该通过一个程序化的侦听器解决这两个问题：

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

使用了这个策略，我甚至可以让多个输入框元素同时使用不同的 Pikaday，每个新的实例都程序化地在后期清理它自己

```js
mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```

### 7.9 插槽

#### 7.9.1 基本插槽

现在引入最后一个指令, 也是就第14个指令: `v-slot`

Vue实现了一套内容分发的API, 将`<slot>`元素作为承载分发内容的出口, 他允许向下面一样合成组件

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>

<!-- 在navigation-link的模板中可以写成这样 -->
<a v-bind:href="url" class="nav-link">
    <slot></slot>
</a>
```

当上面的组件渲染的时候`<slot>`将会被替换成"Your Profile"。插槽内可以包含任何模板代码, 包括HTML, 甚至是其他的组件

插槽`slot`中间大部分都是没有内容的, 有时候为插槽设置具体的内容还是很有用的,他只会在没有提供内容的时候被渲染

声明: 子组件的插槽内容, 是显示在父组件中间

```html
<button type="submit">
  <slot></slot>
</button>
```

现在可能希望这个`<button>`内绝大多数情况下都渲染文本"Submit", 为了将"Submit"作为后备内容, 我们可以将它放在`<slot>`标签内

```html
<!-- 父组件 -->
<subimt-button></subimt-button>
<!-- 子组件 -->
<button type="submit">
  <slot>Submit</slot>
</button>
```

注意上面父组件的标签中间并没有提供任何的插槽内容, 后备内容"Submit"将会被渲染

```html
<button type="submit">Submit</button>
```

如果父组件提供内容, 就会覆盖默认内容

```html
<submit-button>Save<submit>
```

则这个提供的内容将会被渲染从而取代后备内容

```html
<button type="submit">Save</button>
```

#### 7.9.2 具名插槽

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

如上面的情况, 我们需要多个插槽, 对于这种情况, `<slot>`元素有一个特殊的属性: name, 这个属性可以定义而外的插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

一个不带有`name`的`<slot>`出口会带有隐含的名字"default"; 在向具名插槽提供内容的时候, 我们可以在一个`<template>`元素上使用`v-slot`指令, 并以`v-slot`的参数的形式提供其名称

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在`template`元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有`v-slot`的`<template>`中的内容都会被视为默认插槽内容, 然而, 如果希望更明确一些,仍然可以在一个`<template>`中的内容都会被视为默认插槽内容

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

注意: `v-slot`只能添加在`<template>`上

#### 7.9.3 作用域插槽

有时候让插槽内容能够访问子组件中的数据是很有用的。

```html
<!--
	user属性是子组件的, 如果父组件来访问则代码不会运行
	只有<current-user>组件中才能访问到`user`, 而我们提供的内容是在父级渲染
-->
<current-user>{{user.firstName}}</current-user>
```

为了让`user`在父级的插槽内容中可用, 我们可以将`user`作为`<slot>`元素的一个属性绑定上去

```html
<span>
    <slot v-bind:user="user"></slot>
</span>
```

绑定在`<slot>`元素上的属性被称为插槽prop。现在在父级作用域中, 我们可以使用带值的`v-slot`来定义我们提供的插槽prop的名字

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

上面试默认插槽的情况下, 组件的标签才可以被当做插槽的模板来使用。这样我们就可以把`v-slo`直接用在组件上

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

上面的写法还可以更简单

```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

注意默认插槽的缩写语法不能和具名插槽混用,因为他会导致作用域不明确

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽, 请时钟为所有的插槽使用完整的基于`<template>`的语法

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

**结构插槽Prop**

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里

```js
function (slotProps) { // 插槽内容 }
```

这以为这`v-slot`的值实际上可以是任何能够作为函数定义中的参数的JavaScript表达式。所以在支持的环境下(单文件组件或现代浏览器), 可以使用ES2015解构来传入具体的插槽prop

```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 `user` 重命名为 `person`：

```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

**动态插槽**

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

**v-slot缩写**

`v-slot`也有缩写, 即把参数之前的内容(`v-slot:`)替换为字符串`#`, 例如: `v-slot:header`可以缩写为`#header`

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```html
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```html
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

#### 7.9.4 可复用插槽

**插槽prop允许我们将插槽转换为可复用的模板, 这些木板可以基于输入的prop渲染出不同的内容**, 这在设计封装数据逻辑同时允许组件自定义部分布局的可复用组件时是最有用的

```html
<ul>
  <li v-for="todo in filteredTodos" v-bind:key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

我们可以将每个todo作为父级组件的插槽, 以此通过父级组件对其进行控制, 然后`todo`作为插槽prop进行绑定

```html
<ul>
  <li v-for="todo in filteredTodos" v-bind:key="todo.id">
    <!-- 
		我们为每个 todo 准备了一个插槽， 将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```

现在当我们使用 `<todo-list>` 组件的时候，我们可以选择为 todo 定义一个不一样的 `<template>` 作为替代方案，并且可以从子组件获取数据：

```html
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
```

### 7.10 动态组件

在多标签界面切换不同的组件, 当这些组件之间的切换的时候, 会想保持这些组件的状态, 以避免反复重渲染导致的性能问题

有时间在这个页面操作了, 然后切换页面, 又切换回来, 就会发现页面被重新渲染了, 并不是上回操作的内容, 这是一位每次切换的时候, Vue都会创建一个新实例

重新创建动态组件行为通常是非常有用的, 但是有些时候, 我们更希望组件实例能够被在它们第一次创建的时候缓存下来。为了解决这个问题, 我们可以用一个`<keep-alive>`元素将其动态包裹起来

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

这样component组件都会被缓存起来, 不管怎么切换, 还是切换之前的操作内容

注意: 这个`<keep-alive>`要求被切换到的组件都有自己的名字, 不论是通过`name`选项还是局部/全局注册

[keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)详情参考

### 7.11 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

如你所见，这个工厂函数会收到一个 `resolve` 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。你也可以调用 `reject(reason)` 来表示加载失败。这里的 `setTimeout` 是为了演示用的，如何获取组件取决于你自己。一个推荐的做法是将异步组件和 [webpack 的 code-splitting 功能](https://webpack.js.org/guides/code-splitting/)一起配合使用

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

你也可以在工厂函数中返回一个 `Promise`，所以把 webpack 2 和 ES2015 语法加在一起，我们可以这样使用动态导入：

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

当使用[局部注册](https://cn.vuejs.org/v2/guide/components-registration.html#局部注册)的时候，你也可以直接提供一个返回 `Promise` 的函数：

```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

**处理加载状态**

这里的异步组件工厂函数也可以返回一个如下格式的对象：

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

注意如果你希望在 [Vue Router](https://github.com/vuejs/vue-router) 的路由组件中使用上述语法的话，你必须使用 Vue Router 2.4.0+ 版本。



### 

### 7.15 组件化理解

组件化是Vue的精髓, Vue应用就是由一个个组件构成的。面试的时候经常会被问道谈一下对Vue组件化的理解

定义: 组件是**可复用的Vue实例**, 准确讲他们是VueComponent的实例, 继承自Vue

优点: 从上面的案例可以看出组件化可以增加代码的复用性、可维护性和可测性

使用场景: 什么时候使用组件?

- 通用组件: 实现最基本的功能, 具有通用性、复用性，例如按钮组件、输入框组件、布局组件等
- 业务组件： 他们完成具体业务， 具有一定的复用性， 例如登录组件、轮播图组件
- 页面组件： 组织应用各部分对立内容， 需要时在不同页面组件间切换， 例如列表页、详情页

如何使用组件

- 定义： VUe.component()、component选项、sfc
- 分类： 有状态组件、functional, abstract
- 通信： props、$emit/$on、provide/inject、$children/$parent/$root/$attrs/$listeners
- 内容分发： `<slot>`、`<template>`、`v-slot`
- 使用及优化： is、keep-alive、异步组件

组件的本质

Vue中的组件经历如下过程： 组件配置 -> VueComponent实例 -> render() -> Vireual DOM -> DOM, 所以组件的本质时产生虚拟DOM



## 9. 自定义指令

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

然后你可以在模板中任何元素上使用新的 `v-focus` property，如下

```html
<input v-focus>
```

```html
<body>
  <div id="app">
    <input type="text" v-focus>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    Vue.directive('focus', {
      inserted(el) {
        el.focus()
      }
    })
    new Vue({
      el: '#app'
    })
  </script>
</body>
```

### 9.1 自定义指令钩子

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

接下来我们来看一下钩子函数的参数 (即 `el`、`binding`、`vnode` 和 `oldVnode`)。

**钩子函数参数**

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。

- `binding`: 一个对象，包含以下 property：
- `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

注意: 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

## 10.  混入

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```html
<body>
  <div id="app">
    <my-text></my-text>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const myMixin = {
      data() {
        return {
          message: 'Hello',
          foo: 'abc'
        }
      },
      created() {
        this.hello()
      },
      methods: {
        hello() {
          console.log('Hello Mixin')
        }
      }
    }
    Vue.component('my-text', {
      // 混入到my-text组件中
      mixins: [myMixin],
      // 这里data数据与mixins同名会把mixin里面的数据覆盖
      data() {
        return {
          message: 'Vue',
          foo: 'def'
        }
      },
      created() {
        console.log(this.$data)
      },
      template: `
        <div>
          one two three
        </div>
      `
    })
    new Vue({
      el: '#app',
    })
  </script>
</body>
```

当组件和混入对象含有同名选项时, 这些选项以恰当的方式进行"合并", 比如, 数据对象在内部会进行递归合并, 并在发生冲突时以数组数据优先

**全局注册混入**

混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!
```

## 11 jsx与渲染函数

```html
<body>
  <div id="app">
    <my-render :level="1">Hello GO</my-render>
    <my-render :level="2">Hello C++</my-render>
    <my-render :level="3">Hello JavaScript</my-render>
    <my-render :level="4">Hello Java</my-render>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    // $slots 用来访问插槽分发的内容
    Vue.component('my-render', {
      props: {
        level: {
          type: Number,
          required:true
        }
      },
      render(createElement) {
        return createElement(
          'h' + this.level,
          this.$slots.default
        )
      }
    })
    new Vue({
      el: '#app',
      data() {
        return {
          
        }
      }
    })
  </script>
</body>
```

浏览器渲染

```html
<div id="app">
    <h1>Hello GO</h1> 
    <h2>Hello C++</h2> 
    <h3>Hello JavaScript</h3> 
    <h4>Hello Java</h4>
</div>
```

Vue通过建立一个虚拟DOM来追踪自己要如何改变真实DOM

> return createElement('h1', this.blogTitle)

`createElement` 到底会返回什么呢？其实不是一个*实际的* DOM 元素. 它更准确的名子可能是createNodeDescription,因为它所包含的信息会告诉Vue页面上需要渲染什么样的节点,包括及其子节点的描述信息. 我们把这样的节点称为"虚拟节点(Virtual node)", 也简称为"VNode". "虚拟DOM"是我们对由Vue组件树建立起来的整个VNode树的称呼

**createElement参数**

```hs
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

**深入数据对象**

 有一点要注意：正如 `v-bind:class` 和 `v-bind:style` 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的 HTML attribute，也允许绑定如 `innerHTML` 这样的 DOM property (这会覆盖 `v-html` 指令)。

## 11 动画

### 11.1 简单使用

vue在插入、更新或者移除DOM时,提供各种不同方式的应用过渡效果,包括以下工具:

- 在css过渡和动画中自动应用class
- 可以配合使用第三方css动画库,如Animate.css
- 在过渡钩子函数中使用JavaScript直接操作DOM
- 可以配合使用第三方JavaScript动画库, 如Velocity.js

**单元素/组件的过渡**

Vue提供`transition`的封装组件,在下列情形中,可以给任何元素和组件添加进入/离开过渡

- 条件渲染(使用v-if)
- 条件展示(使用v-show)
- 动态组件
- 组件根节点

```html
<body>
  <style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
      opacity: 0;
    }
  </style>
  <div id="app">
    <button @click="isShow = !isShow">切换</button>
    <transition name="fade">
      <p v-if="isShow">Hello World</p>
    </transition>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          isShow: true
        }
      }
    })
  </script>
</body>
```

在插入或删除包含在`transition`组件中的元素时, Vue将会做一下处理

- 自动嗅探目标元素是否应用了CSS过渡或动画, 如果是,在恰当的实际添加/删除CSS类名
- 如果过渡组件提供JavaScript钩子函数,这些钩子函数将在恰当的时机被调用
- 如果没有找到JavaScript钩子并且也没有检测到css动画/过渡,DOM操作(插入/删除)在下一帧中立即执行(注意: 此浏览器逐帧动画机制),和Vue的nextTick概念不同)

### 11.2 过渡类名

在进入/离开的过渡中,会有6个class切换

1. `v-enter`定义进入过渡的开始状态. 在元素被插入之前生效, 在元素被插入之后的下一帧移除
2. `v-enter-active` 定义进入过渡生效时的状态. 在整个进入过渡阶段中应用, 在元素被插入之前生效,在过渡/动画之后移除. 这个类可以被用来定义进入过渡的过程事件,延迟和曲线函数
3. `v-enter-to`定义进入过渡的结束状态. 在元素被插入之后下一帧生效(于此同时`v-enter`被移除), 在过渡/动画完成之后移除
4. `v-leave`定义离开过渡的开始状态.在离开过渡被触发时立刻生效,下一帧移除
5. `v-leave-active`定义离开过渡生效时的状态. 在整个离开过渡的阶段中应用,在离开过渡被触发时立刻生效, 在过渡/动画完成之后移除. 这个类可以被用来定义离开过渡的过程时间,延迟和曲线函数
6. `v-leave=to`离开过渡的结束状态. 在离开过渡被触发之后下一帧生效(与此同时`v-leave`被删除), 在过渡/动画完成之后移除

![](https://cn.vuejs.org/images/transition.png)

对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

`v-enter-active` 和 `v-leave-active` 可以控制进入/离开过渡的不同的缓和曲线，

```html
<body>
  <style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  </style>
  <div id="app">
    <button @click="show = !show">Toggle</button>
    <transition name="slide-fade">
      <p v-if="show">Hello World</p>
    </transition>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          show: true
        }
      }
    })
  </script>
</body>
```



## 11 Vue Cli

Cli(`@vue/cli`)是全局安装的npm包, 提供终端里的vue命令, 可以通过`vue create`快速搭建一个项目,或者直接通过`vue serve`构建新想法的原型. 也可以通过`vue ui`通过一套图形化界面管理所有的项目

cli (`@vue/cli-service`) 服务是一个开发环境的依赖, . 它是一个npm包, 局部安装在每个`@vue/cli`创建的项目中

CLI 服务是构建于 [webpack](http://webpack.js.org/) 和 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 之上的。它包含了：

- 加载其它 CLI 插件的核心服务；
- 一个针对绝大部分应用优化过的内部的 webpack 配置；
- 项目内部的 `vue-cli-service` 命令，提供 `serve`、`build` 和 `inspect` 命令。

### 11.1 CLI插件

CLI 插件是向你的 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等。Vue CLI 插件的名字以 `@vue/cli-plugin-` (内建插件) 或 `vue-cli-plugin-` (社区插件) 开头，非常容易使用。

当你在项目内部运行 `vue-cli-service` 命令时，它会自动解析并加载 `package.json` 中列出的所有 CLI 插件。

### 11.2 安装

> npm install -g @vue/cli    ||  yarn global add @vue/cli

- 查看版本: vue --version
- 升级Vue CLI包: npm update -g @vue/cli
- 快速搭建启动一个服务器: vue serve  文件名
- 打包: vue build
- 创建项目: vue create 项目名  ||  图形化创建: vue ui

## Vue Router

用Vue.js+Vue Router创建单页面应用, 当把Vue Router添加进来, 内部会将组件(component)映射到路由(routes),然后告诉Vue Router在那里渲染组件

使用路由四步骤:

- 定义路由组件
- 定义路由
- 创建路由实例, 然后传入定义的路由
- vue创建和挂载根实例: 通过router配置注入路由

```html
<body>
  <div id="app">
    <h1>Hello Vue Router</h1>
    <!-- 
      router-link 相当于 a 标签
      to 相当于 href属性
      -->
    <router-link to="/foo"> Go to Foo </router-link> | 
    <router-link to="/bar"> Go to Bar </router-link>
    <!-- to路由所对应的组件显示的位置 -->
    <router-view></router-view>
    <button @click="$router.go(-1)">后退</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js"></script>
  <script>
    // 第一步: 定义路由组件
    const foo = { template: `<div>我是foo页面</div>` }
    const bar = { template: `<div>我是bar页面</div>` }
    // 第二步: 定义路由
    const routes = [
      { path: '/', redirect: '/foo'},
      { path: '/foo', name: foo, component: foo},
      { path: '/bar', name: bar, component: bar}
   ]
   // 第三步: 创建路由实例, 然后传入定义的路由
   const router = new VueRouter({
     routes
   })
   // 第四步: 创建和挂载根实例: 通过router配置注入路由
    new Vue({
      el: '#app',
      router,
      mounted() {
        // 访问路由
        console.log(this.$router)
        // 访问当前路由
        console.log(this.$route)
      }
    })
  </script>
</body>
```

注意当`<router-link>`对应的路由匹配成功,将自动设置class属性值, `.router-link-active`

- 获取当前路由: `this.$route`
- 获取路由: `this.$router`
- 获取路由参数: `this.$route.params`

### 动态路由匹配

我们经常需要把某种模式经常匹配到的所有路由,全都映射到同一组件。

例如: 现在有一个`user`组件, 对于所有ID各不相同的用户,都要使用这个组件来渲染。那么,我们可以在`vue-router`的路由路径中使用`动态参数`来达到这个效果

```html
<body>
  <div id="app">
    <router-link to="/user/foo"> /user/foo </router-link>
    <router-link to="/user/bar"> /user/bar </router-link>
    <router-view></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js"></script>
  <script>
    const User = { template: `<div> {{$route.params.id}} </div>` }
    const routes = [
      { path: '/', redirect: '/user/bar'},
      { path: '/user/:id', component: User}
    ]
    const router = new VueRouter({routes})
    new Vue({
      el: '#app',
      router,
      mounted() {
        console.log(this.$route.params) // {id: "bar"}
      }
    })
  </script>
</body>
```

还可以在路由中设置多段"路由参数", 对应的值都会设置到`$route.params`中

| 模式                          | 匹配路径            | $route.params                       |
| ----------------------------- | ------------------- | ----------------------------------- |
| /user/:username               | /user/even          | { username: 'evan'}                 |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123'} |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等

当使用路由参数时， 例如从`/user/foo`导航到`/user/bar`,**原来的组件实例会被复用**，因为这两个路由都渲染都渲染同一组件，比起销毁在创建，复用则显得更加高效。**不过这也意味着组件的生命周期钩子也不会触发**。

复用组件时，想对路由参数的变化做出响应的话，可以简单地watch(检测变化)`$route`对象或者`beforeRouteUpdate`导航守卫

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
// 或者
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```



### 捕获所有路由或404 Not found路由

常归参数只会匹配被`/`分隔的URL片段中的字符串。如果相匹配**任意路径**,我们可以使用通配符`*`

```js
{ path: '*' } // 匹配所有路径
{ path: '/user-*' } // 会匹配以'/user-'开始的任意路径
```

当使用*通配符*路由时，请确保路由的顺序是正确的，也就是说含有*通配符*的路由应该放在最后。路由 `{ path: '*' }` 通常用于客户端 404 错误

当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

### 嵌套路由

```html
<body>
  <div id="app">
    <router-link to="/user/foo"> /user/foo </router-link>
     || 
    <router-link to="/user/bar"> /user/bar </router-link>
     ||
    <router-link to="/user/foo/profile"> foo / profile </router-link>
     ||
    <router-link to="/user/bar/posts"> bar / posts </router-link>
    <router-view></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js"></script>
  <script>
    const User = { 
      template: `
        <div> 
          <h1>{{$route.params.id}}</h1>
          <router-view></router-view> 
        </div>` }
    const UserProfile = {
      template: `<div>UserProfile</div>`
    }
    const UserPosts = {
      template: `<div>UserPosts</div>`
    }
    const routes = [
      { path: '/', redirect: '/user/bar'},
      { 
        path: '/user/:id', 
        component: User,
        children: [
          { // /user/:id/profile
            path: 'profile',
            component: UserProfile
          },
          { ///user/:id/posts
            path: 'posts',
            component: UserPosts
          }
        ]
      }
    ]
    const router = new VueRouter({routes})
    new Vue({
      el: '#app',
      router,
      mounted() {
        console.log(this.$route.params)
      }
    })
  </script>
</body>
```

### 编程式导航

除了使用`<router-link>`创建a标签来定义导航链接,还可以借助router的实例方法,通过编写代码来实现

>  router.push(location, onComplete?. onAbort?)

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性。

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。

**注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 [`beforeRouteUpdate`](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)

> router.replace(location, onComplete?, onAbort?)

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

> router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100
```

注意到 `router.push`、 `router.replace` 和 `router.go` 跟 [`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)好像， 实际上它们确实是效仿 `window.history` API 的。

### 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。

```html
<body>
  <div id="app">
    <!-- 一个视图使用一个当组件渲染, 因此对于同一个路由,多个视图就需要多个组件, 确保正确使用`components`配置 -->
    <ul>
      <li><router-link to="/"> / </router-link></li>
      <li><router-link to="/other"> /other </router-link></li>
    </ul>
    <router-view></router-view>
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js"></script>
  <script>
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }
    const Baz = { template: '<div>baz</div>' }
    const routes = [
      { 
        path: '/',
        components: { // 展示的是多视图的所有组件
          default: Foo,
          a: Bar,
          b: Baz
        }
      },
      {
        path: '/other',
        components: {
          default: Baz,
          a: Bar,
          b: Foo
        }
      }
    ]
    const router = new VueRouter({routes})
    new Vue({
      el: '#app',
      router
    })
  </script>
</body>
```

嵌套命名路由

```html
<body>
  <div id="app">
    <h1>User Settings</h1>
    <router-view></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js"></script>
  <script>
    const UserSettingsNav = {
      template: `
        <div>
          <router-link to="/UserSetting/emails"> emails </router-link>
          <router-link to="/UserSetting/profile"> profile </router-link> 
        </div>
      `
    }
    const UserSetting = {
      template: `
        <div>
          <h2>User Setting</h2>
          <UserSettingsNav/>
          <router-view></router-view>
          <router-view name="help"></router-view>
        </div>
      `,
      components: { UserSettingsNav }
    }
    const UserProfile = {
      template: `
        <div>
          <h3>Edit your profile</h3>
        </div>
      `
    }
    const UserProfilePreview = {
      template: `
        <div>
          <h3>Preview of your profile</h3>
        </div>
      `
    }
    const UserEmailsSubscriptions = {
      template: `
        <div>
          UserEmailsSubscriptions
        </div>
      `
    }
    const routes = [
      {
        path: '/',
        redirect: '/UserSetting'
      },
      { 
        path: '/UserSetting',
        component: UserSetting,
        children: [
          {
            path: 'emails',
            component: UserEmailsSubscriptions
          },
          {
            path: 'profile',
            components: {
              default: UserProfile,
              helper: UserProfilePreview
            }
          }
        ]
      }
    ]
    const router = new VueRouter({routes})
    new Vue({
      el: '#app',
      router
    })
  </script>
</body>
```

### 路由重定向和别名

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
      // 重定向的目标也可以是一个命名的路由
     { path: '/a', redirect: { name: 'foo' }},
     // 别名
     { path: '/a', component: A, alias: '/b' }
  ]
})
```

### 路由传参

在组件中使用`$route`会使之与其对应路由形成高度耦合,从而使组件只能在特定的URL上使用,限制了其灵活性. 使用`props`将组件和路由解耦: 

取代与$route的耦合

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

通过props解耦

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

如果`props`被设置为true, `route.params`将会被设置为组件属性

如果`props`是对象模式: 他会被按原样设置为组件属性。当`props`是静态的时候有用

如果`props`是函数模式: 就可以将参数转换成另一种类型,将静态之与基于路由的值结合等等

```js
const router = new VueRouter({
  routes: [
    {  // 对象模式
        path: '/promotion/from-newsletter', 
        component: Promotion, 
        props: { newsletterPopup: false } 
    },
    { // 函数模式
		path: '/search', 
        component: SearchUser, 
        props: (route) => ({ query: route.query.q })
        // URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
    }
  ]
})
```

请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

### HTML5 History模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面

### 导航守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

**完整的导航解析过程**

1. 导航被触发
2. 在失活的组件里调用`beforeRouteLeave`调用
3. 调用全局的`beforeEach`守卫
4. 在重用的组件里调用`beforeRouteUodate`守卫
5. 在路由配置里调用`beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用`beforeRouteEnter`
8. 调用全局的`beforeRedolve`守卫
9. 导航被确认
10. 调用全局的`afterEach`钩子
11. 触发DOM更新
12. 调用`beforeRouteEnter`守卫中传给`next`的回调函数,创建好的组件实例会作为回调函数的参数传入

#### 全局前置守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

next函数在任何给定的导航守卫中都被严格调用一次。他可以出现多于一次,但是只能在所有的逻辑路径都不重叠的情况下,否则钩子永远都不会被解析或者报错

#### 全局解析守卫

用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用

#### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身

> router.afterEach( (to, from) => {} )

#### 路由独享的守卫

可以在路由配置上直接定义`beforeEnter`守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 组件内的守卫

`beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### 路由元信息

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

那么如何访问这个 `meta` 字段呢？

首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

下面例子展示在全局导航守卫中检查元字段：

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

**注意: 这个功能只在支持 `history.pushState` 的浏览器中可用。**

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

`scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

如果返回一个 falsy (译者注：falsy 不是 `false`，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值，或者是一个空对象，那么不会发生滚动。

举例：

```js
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

对于所有路由导航，简单地让页面滚动到顶部。

返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

如果你要模拟“滚动到锚点”的行为：

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

我们还可以利用[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)更细颗粒度地控制滚动

**异步滚动**

你也可以返回一个 Promise 来得出预期的位置描述：

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的。但是考虑到用例的多样性和复杂性，我们仅提供这个原始的接口，以支持不同用户场景的具体实现。

### 路由懒加载

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/baz', component: Baz }
  ]
})
```

## VueX

### 简单使用

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

安装

> npm install vuex --save

在一个模块化的打包系统中,必须显示第通过`Vue.use()`

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
// store.index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
```

```vue
//App.vue
<template>
  <div id="app">
    <div>{{$store.state.count}}</div>
    <button @click="increment">+</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    increment() {
      console.log(this.$store)
      this.$store.commit('increment')
    }
  }
}
</script>
```

这个状态自管理应用包含以下几个部分:

- state, 驱动应用的数据源
- view以声明的方式将state映射到视图上
- actions相应在view上的用户输入导致的变化

![](https://vuex.vuejs.org/vuex.png)

### State与mapState辅助函数

Vuex 使用**单一状态树** -- 用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

**mapState辅助函数**

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment')
```

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**

```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```

**对象风格的提交方式**

提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

**Mutaion需要遵守Vue的响应规则**

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该使用 `Vue.set(obj, 'newProp', 123)`或者以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

```js
state.obj = { ...state.obj, newProp: 123 }
```

 
