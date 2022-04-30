# API FileReader学习

## 用法

#### 1.创建对象

​	var fReader = new FileReader();

#### 2.方法

​	1.abort() 终止读取操作；

​	下面是开始读取指定的Blob对象或File对象中的内容：	

​	2.readAsArrayBuffer()  ArrayBuffer对象表示的内容；

​	3.readAsDataURL() URL格式的字符串表示的内容；

​	4.readAsBinaryString() 原始二进制数据；

​	5.readAsText() 字符串表示的内容；

#### 3.属性

​	1.error ：在读取文件时发生的错误；

​	2.readyState ：表明FileReader对象的当前状态；

​	3.result ：读取到的文件内容；

​	4.onabort ：在读取操作时被中止时调用；

​	5.onerror ：当读取操作发生错误时调用；

​	6.onload ：当读取操作成功完成时调用；

​	7.onloadend ：当读取操作完成时调用，不管是成功还是失败，该处理程序在onload或者onerror之后调用；

​	8.onloadstart ：当读取操作将要开始之前调用；

​	9.onprogress：在读取数据过程中周期性调用。