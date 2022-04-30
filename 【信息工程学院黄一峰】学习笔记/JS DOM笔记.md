# JS DOM

## 获取元素的几种方式

## 事件三要素

1.获取元素（获取事件源）

2.注册事件 处理程序

3.执行事件

## 修改属性（this指向函数调用者）

#### 修改元素内容

此部分主要是学习了innerText与innerHTML之间的区别

innerText：

innerHTML ：

#### 修改元素属性

#### 修改表单属性

案例：1.仿京东密码隐藏与显现案例

#### 修改样式属性

1.element.sytle 行内样式操作 (修改样式比较少) 例：this.style.backgroundColor = 'purple';

2.element.className 类名样式操作 (修改样式比较多)

注意：1.在JS中样式名使用的是驼峰命名法 例：fontSize、backgroundColor

​			2.JS修改了style样式后，产生的是行内样式，CSS权重较高。

案例：1.仿淘宝关闭二维码 2.循环精灵图 3.显示隐藏文本框内容

## 节点操作