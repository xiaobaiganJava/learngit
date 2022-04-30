var changePassword = document.querySelector('.changePassword');
var list = changePassword.querySelectorAll('li');
//切换登录与修改密码
login_personMessage_password_forget.onclick = function() {
    login.style.display = 'none';
    changePassword.style.display = 'block';
}
login_personMessage_password_forget1.onclick = function() {
    login.style.display = 'none';
    changePassword.style.display = 'block';
}
changePassword_returnLogin.onclick = function() {
    login.style.display = 'block';
    changePassword.style.display = 'none';
}
changePassword_returnLogin1.onclick = function() {
    login.style.display = 'block';
    changePassword.style.display = 'none';
}

//修改密码的tab栏
for (let i = 0; i < list.length; i++) {
    list[i].setAttribute('index1', i);
    list[i].onclick = function() {
        for (let i = 0; i < list.length; i++) {
            list[i].className = '';
        }
        this.className = 'changecurrent';
        //内容部分
        var index1 = this.getAttribute('index1');
        if (index1 == 0) {
            changePassword_oldPasswordBox.style.display = 'block';
            changePassword_emailCode.style.display = 'none';
        } else {
            changePassword_oldPasswordBox.style.display = 'none';
            changePassword_emailCode.style.display = 'block';
        }
    }
}

//用旧密码修改密码
changePassword_button.onclick = function() {
    let changePasswordUsername = changePassword_username.value;
    let changePasswordOldPassword = changePassword_oldPassword.value;
    let changePasswordNewPassword = changePassword_newPassword.value;
    let changePasswordJSON = {
        "oldPassword": changePasswordOldPassword,
        "username": changePasswordUsername,
        "newPassword": changePasswordNewPassword
    };
    let changePasswordJSONString = JSON.stringify(changePasswordJSON);
    let changePasswordData = getJSON('POST', 'http://175.178.51.126:8091/smallA/updatePwd', changePasswordJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code == 200) {
            alert('修改成功');
            login.style.display = 'block';
            changePassword.style.display = 'none';
        } else {
            alert('修改失败');
            console.log(tips.msg);
        }
    });
}

//获取邮箱验证码 邮箱获取间隔 (60s)
changePassword_getCode.onclick = function() {
    let time = 60;
    this.disabled = true;
    let timer = setInterval(function() {
        if (time == 0) {
            // 清除定时器和复原按钮
            clearInterval(timer);
            changePassword_getCode.disabled = false;
            changePassword_getCode.innerHTML = '获取验证码';
        } else {
            changePassword_getCode.innerHTML = time + 's后再次获取';
            time--;
        }
    }, 1000);
    //获取邮箱验证码
    let changePasswordEmail = changePassword_email.value;
    let change_Password_JSON = {
        "email": changePasswordEmail,
    };
    let change_Password_JSONString = JSON.stringify(change_Password_JSON);
    let change_Password_Data = getJSON('POST', 'http://175.178.51.126:8091/smallA/getCode', change_Password_JSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res); //获取响应报文
        if (tips.code == 200) {
            alert('获取失败');
        } else {
            alert('获取成功');
            console.log(tips.msg);
        }
    });
}

//用邮箱验证码修改密码
changePassword_button1.onclick = function() {
    let changePasswordEmail = changePassword_email.value;
    let changePasswordCode = changePassword_code.value;
    let changePasswordNewPassword1 = changePassword_newPassword1.value;
    let changePassword_JSON = {
        "email": changePasswordEmail,
        "newPassword": changePasswordNewPassword1,
        "code": changePasswordCode
    };
    let changePassword_JSONString = JSON.stringify(changePassword_JSON);
    let changePassword_Data = getJSON('POST', 'http://175.178.51.126:8091/smallA/rememberPwd', changePassword_JSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code == 200) {
            alert('修改成功');
            login.style.display = 'block';
            changePassword.style.display = 'none';
        } else {
            alert('修改失败');
            console.log(tips.msg);
        }
    });
}