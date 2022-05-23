//修改密码
const changeByName = document.getElementById('changeByName');
const changeByEmail = document.getElementById('changeByEmail');
const changepwdByName = document.querySelector('.changepwdByname');
const changepwdByEmail = document.querySelector('.changepwdByemail');

//选择方式
changeByName.addEventListener('click', function () {
    changepwdByName.style.display = 'block';
    changeByName.style.borderBottom = '2px solid rgba(35, 164, 219, 0.5)';
    changeByEmail.style.borderBottom = '';
    changepwdByEmail.style.display = 'none';
});
changeByEmail.addEventListener('click', function () {
    changepwdByName.style.display = 'none';
    changeByName.style.borderBottom = '';
    changeByEmail.style.borderBottom = '2px solid rgba(35, 164, 219, 0.5)';
    changepwdByEmail.style.display = 'block';
});

function fun(a,b,c,d){
    changepwdByName.style.display = a;
    changeByName.style.borderBottom = b;
    changeByEmail.style.borderBottom = c;
    changepwdByEmail.style.display = d;
}


let cName = document.getElementById('cname');
let cOldPassword = document.getElementById('coldpassword');
let cNewPassword = document.getElementById('cnewpassword');
let cAgainNewPassword = document.getElementById('cagainnewpassword');
let cNewPassword1 = document.getElementById('cnewpassword1');
let cAgainNewPassword1 = document.getElementById('cagainnewpassword1');
const changePasswordBtn = document.getElementById('changepassword-btn');
const changePasswordBtn1 = document.getElementById('changepassword-btn1');
const identify_code_btn = document.getElementById('identify-code');
let cemail = document.getElementById('cemail');


//输入更改密码正则判断
cNewPassword.addEventListener('blur', function () {
    if (!passwordReg.test(cNewPassword.value)) {
        cNewPassword.nextElementSibling.style.display = 'block';
    } else {
        cNewPassword.nextElementSibling.style.display = 'none';
    }
})
//再次输入更改密码验证
cAgainNewPassword.addEventListener('blur', function () {
    if (!passwordReg.test(cAgainNewPassword.value) || cAgainNewPassword.value !== cNewPassword.value) {
        cAgainNewPassword.nextElementSibling.style.display = 'block';
    } else {
        cAgainNewPassword.nextElementSibling.style.display = 'none';
    }
})
//邮箱正则
cemail.addEventListener('blur', function () {
    if (!emaliReg.test(cemail.value)) {
        cemail.nextElementSibling.style.display = 'block';
    } else {
        cemail.nextElementSibling.style.display = 'none';
    }

})


changePasswordBtn.addEventListener('click', function () {
    let flag1 = true;
    if (!passwordReg.test(cNewPassword.value)) {
        flag1 = true;
    } else if (!passwordReg.test(cAgainNewPassword.value) || cAgainNewPassword.value !== cNewPassword.value) {
        flag1 = true;
    } else {
        flag1 = false;
    }
    if (flag1 == false) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/updatePwd',
            {
                username: cName.value, oldPassword: cOldPassword.value,
                newPassword: cNewPassword.value
            },
            function (res) {
                let data = JSON.parse(res);
                alert_content.innerHTML = data.msg;
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
            }
        );
    }

})

//六十秒一次
function send(ele, time) {
    if (!time) {
        ele.removeAttribute('disabled')
        return ele.value = '发送验证码';
    }
    ele.setAttribute('disabled', true);
    ele.value = time + '秒后可以重新发送';
    setTimeout(() => {
        send(ele, --time);
    }, 1000);
}

//发送验证码
identify_code_btn.addEventListener('click', function () {
    if (!emaliReg.test(cemail.value)) {
        alert_content.innerHTML = '请输入正确的邮箱';
        alert_box.style.display = 'block';
        alertwrapper.style.display = 'block';
    } else {
        send(this, 60);
        myAjax('POST', 'http://175.178.51.126:8091/smallA/getCode', { email: cemail.value }, function (res) {
        }
        );
    }
})

//邮箱修改密码
changePasswordBtn1.addEventListener('click', function () {
    let flag1 = true;
    if (!passwordReg.test(cNewPassword1.value)) {
        flag1 = true;
    } else if (!passwordReg.test(cAgainNewPassword1.value) || cAgainNewPassword1.value !== cNewPassword1.value) {
        flag1 = true;
    } else if (!emaliReg.test(cemail.value)) {
        flag1 = true
    } else {
        flag1 = false;
    }
    if (flag1 == false) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/rememberPwd',
            { email: cemail.value, newPassword: cNewPassword1.value, code: identify_code_btn.value },
            function (res) {
                let data = JSON.parse(res);
                alert_content.innerHTML = 'success';
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
            }
        );
    }
})


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
