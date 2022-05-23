//封装ajax函数
function myAjax(method, url, data, callback, type) {
    const xhr = new XMLHttpRequest;
    xhr.open(method, url)
    let param = '';

    if (method == 'GET') {
        if (JSON.stringify(data) != '{}') {
            url += '?';
            for (let i in data) {
                param += i + '=' + data[i] + '&';
            }
            //slice方法去除掉&
            param = param.slice(0, param.length - 1);
        }
        url = url + param;
    }
    if (method == 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send(null);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let res = xhr.responseText;
                callback(res);
            }
        }
    }
}