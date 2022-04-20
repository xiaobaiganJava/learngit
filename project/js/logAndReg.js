//点击切换 tab栏
var login = document.querySelector('.login');
var lis = login.querySelectorAll('li');
var usernameLogin = document.querySelector('.login_personMessage');
var emailLogin = document.querySelector('.login_personMessageEmail');

// title tab切换
for (var i = 0; i < lis.length; i++) {
    // 给li设置索引号，方便与内容相匹配
    lis[i].setAttribute('index', i);
    lis[i].onclick = function() {
        //排他思想 点击某个小li时 清除其他人的类名 并将current类名赋给点击的小li
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        this.className = 'current'; //留下点击的小li
        //内容部分
        var index = this.getAttribute('index');
        if (index == 0) {
            usernameLogin.style.display = 'block';
            emailLogin.style.display = 'none';
        } else {
            usernameLogin.style.display = 'none';
            emailLogin.style.display = 'block';
        }
    }
}

/*  异步概念   */
// 登录与注册
var register = document.querySelector('.register');
var login_background = document.querySelector('.login_background');
var register_background = document.querySelector('.register_background');
var login_close = document.querySelectorAll('.login_close');
var login_returnRegister = document.querySelector('.login_returnRegister_a');
var register_returnLogin = document.querySelector('.register_returnLogin_a');
var login_personMessage_password_close = document.querySelector('.login_personMessage_password_close');
var login_personMessage_password_close1 = document.querySelector('.login_personMessage_password_close1');
var register_personMessage_password_close = document.querySelector('.register_personMessage_password_close');
var register_personMessage_password_close1 = document.querySelector('.register_personMessage_password_close1');
var login_personMessage_password = document.querySelector('.login_personMessage_password');
var login_personMessage_password1 = document.querySelector('.login_personMessage_password1');
var register_personMessage_password = document.querySelector('.register_personMessage_password');
var register_personMessage_password1 = document.querySelector('.register_personMessage_password1');
var login_personMessage_username = document.querySelector('.login_personMessage_username');
var register_personMessage_username = document.querySelector('.register_personMessage_username');
var login_personMessage_email = document.querySelector('.login_personMessage_email');
var register_personMessage_email = document.querySelector('.register_personMessage_email');
var login_personMessageButton = document.querySelector('.login_personMessageButton');
var login_personMessageButton1 = document.querySelector('.login_personMessageButton1');
var register_personMessageButton = document.querySelector('.register_personMessageButton');
var homepage = document.querySelector('.homepage');
var homepageUserId = document.querySelector('.homepage_userId');
var homepageUserEmail = document.querySelector('.homepage_userEmail');
var homepageUserName = document.querySelector('.homepage_userName');
// 关闭登录注册页面
login_close[0].onclick = function() {
    login_background.style.display = 'none';
}
login_close[1].onclick = function() {
        login_background.style.display = 'none';
    }
    // 切换登录与注册
login_returnRegister.onclick = function() {
    login.style.display = 'none';
    register.style.display = 'block';
}
register_returnLogin.onclick = function() {
        login.style.display = 'block';
        register.style.display = 'none';
    }
    // 显示密码与遮盖密码
function Eyeclose(password, eyeclose) {
    return function() {
        if (password.type == 'password') {
            password.type = 'text';
            eyeclose.style.background = 'url(../image/eye.png)';
        } else {
            password.type = 'password';
            eyeclose.style.background = 'url(../image/closeeye.png)';
        }
    }
}
login_personMessage_password_close.onclick = Eyeclose(login_personMessage_password, login_personMessage_password_close);
login_personMessage_password_close1.onclick = Eyeclose(login_personMessage_password1, login_personMessage_password_close1);
register_personMessage_password_close.onclick = Eyeclose(register_personMessage_password, register_personMessage_password_close);
register_personMessage_password_close1.onclick = Eyeclose(register_personMessage_password1, register_personMessage_password_close1);

// 获取注册数据传到eolink
register_personMessageButton.onclick = function() {
    var registerUsername = register_personMessage_username.value;
    var registerPassword = register_personMessage_password1.value;
    var registerEmail = register_personMessage_email.value;
    if (registerPassword.length != 0) { //密码限制位6-20位的数字和英文 不能有特殊字符
        reg = /^(\w){6,20}$/;
        if (!reg.test(registerPassword)) {
            alert("对不起，您输入的密码格式不正确!")
        }
    }
    // 将拿到的数据封装成json数组
    var registerUserJSON = {
        "username": registerUsername,
        "password": registerPassword,
        "email": registerEmail
    };
    console.log(registerUserJSON.username, registerUserJSON.password, registerUserJSON.email);
    var registerUserJSONString = JSON.stringify(registerUserJSON);
    // 上传到eolink
    var registerData = getJSON('POST', 'http://175.178.51.126:8091/smallA/register', registerUserJSONString).then(res => {
        var tips = JSON.parse(res)
        console.log(res);
        if (tips.code > 400) {
            alert(tips.msg);
        } else {
            alert('注册成功');
            console.log(tips.msg);
        }
    });
}

// 获取用户名登录数据传到eolink
login_personMessageButton.onclick = function() {
    var loginUsername = login_personMessage_username.value;
    var loginPassword = login_personMessage_password.value;
    // 将拿到的数据封装成json数组，
    var loginUserJSON = {
        "username": loginUsername,
        "password": loginPassword
    };
    // 上传到eolink
    var loginUserJSONString = JSON.stringify(loginUserJSON);
    var loginData = getJSON('POST', 'http://175.178.51.126:8091/smallA/login', loginUserJSONString).then(res => {
        var tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            login.style.display = 'none';
            homepage.style.display = 'block';
            homepageUserId.innerHTML = 'ID:' + tips.data.id;
            homepageUserEmail.innerHTML = 'Email:' + tips.data.email;
            homepageUserName.innerHTML = 'username:' + tips.data.username;
        }
    });
}

// 获取邮箱登录数据 上传到eolink
login_personMessageButton1.onclick = function() {
    var loginEmail = login_personMessage_email.value;
    var loginEmailPassword = login_personMessage_password1.value;
    // 将拿到的数据封装成json数组，
    var loginUserJSON = {
        "email": loginEmail,
        "password": loginEmailPassword
    };
    // 上传到eolink
    var loginUserJSONString = JSON.stringify(loginUserJSON);
    var loginData = getJSON('POST', 'http://175.178.51.126:8091/smallA/login', loginUserJSONString).then(res => {
        var tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            login.style.display = 'none';
            homepage.style.display = 'block';
            homepageUserId.innerHTML = 'ID:' + tips.data.id;
            homepageUserEmail.innerHTML = 'Email:' + tips.data.email;
            homepageUserName.innerHTML = 'username:' + tips.data.username;
        }
    });
}