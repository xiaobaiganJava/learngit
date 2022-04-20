//ES6封装ajax函数
function getJSON(type, url, json) {
    return new Promise((resolve, reject) => {
        //创建xhr对象
        let xhr = new XMLHttpRequest();
        //建立http请求
        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        //发送http请求
        xhr.send(json)
            //设置监听函数
        xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText)
                    } else {
                        reject(new Error(xhr.statusText))
                    }
                } else {
                    return //此时请求完成
                }
            }
            //设置报错后的监听函数
        xhr.onerror = function() {
            reject(new Error(xhr.statusText))
        }
    })
}