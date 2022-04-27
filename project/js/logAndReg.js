//点击切换 tab栏
var login = document.querySelector('.login');
var lis = login.querySelectorAll('li');
var usernameLogin = document.querySelector('.login_personMessage');
var emailLogin = document.querySelector('.login_personMessageEmail');

// title tab切换
for (let i = 0; i < lis.length; i++) {
    // 给li设置索引号，方便与内容相匹配
    lis[i].setAttribute('index', i);
    lis[i].onclick = function() {
        //排他思想 点击某个小li时 清除其他人的类名 并将current类名赋给点击的小li
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        this.className = 'current'; //留下点击的小li
        //内容部分
        let index = this.getAttribute('index');
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
// 登录
var login_background = document.querySelector('.login_background');
var login_close = document.querySelectorAll('.login_close');
var login_returnRegister = document.querySelector('.login_returnRegister_a');
var login_personMessage_password_close = document.querySelector('.login_personMessage_password_close');
var login_personMessage_password_close1 = document.querySelector('.login_personMessage_password_close1');
var login_personMessage_password = document.querySelector('.login_personMessage_password');
var login_personMessage_password1 = document.querySelector('.login_personMessage_password1');
var login_personMessage_username = document.querySelector('.login_personMessage_username');
var login_personMessage_email = document.querySelector('.login_personMessage_email');
var login_personMessageButton = document.querySelector('.login_personMessageButton');
var login_personMessageButton1 = document.querySelector('.login_personMessageButton1');
var topBar_username = document.querySelector(".topBar_username");
// 注册
var register = document.querySelector('.register');
var register_background = document.querySelector('.register_background');
var register_returnLogin = document.querySelector('.register_returnLogin_a');
var register_personMessage_password_close = document.querySelector('.register_personMessage_password_close');
var register_personMessage_password_close1 = document.querySelector('.register_personMessage_password_close1');
var register_personMessage_password = document.querySelector('.register_personMessage_password');
var register_personMessage_password1 = document.querySelector('.register_personMessage_password1');
var register_personMessage_username = document.querySelector('.register_personMessage_username');
var register_personMessage_email = document.querySelector('.register_personMessage_email');
var register_personMessageButton = document.querySelector('.register_personMessageButton');
// 正则提示
var registerPasswordTips = document.querySelector('.register_passwordTips');
var registerUsernameTips = document.querySelector('.register_usernameTips');
var registerEmailTips = document.querySelector('.register_emailTips');
var registerPasswordTips1 = document.querySelector('.register_passwordTips1');
var loginPasswordTips = document.querySelector('.login_passwordTips');
var loginPasswordTips1 = document.querySelector('.login_passwordTips1');
// 论坛首页
var forum = document.querySelector('.forum');
// 七天免登陆
var freeLogin_button = document.querySelector('.freeLogin_button');

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

// 注册部分正则验证
//正则验证账户名
if (register_personMessage_username.length != 0) { //账户名限制位4-10位的数字和英文 不能有特殊字符
    let reg = /^[a-zA-Z0-9]{4,10}$/;
    register_personMessage_username.onblur = function() {
        if (reg.test(register_personMessage_username.value)) {
            registerUsernameTips.style.color = 'green';
            registerUsernameTips.innerHTML = '用户名格式正确!';
        } else {
            registerUsernameTips.style.color = 'red';
            registerUsernameTips.innerHTML = '用户名格式错误，请重新输入';
        }
    }
    register_personMessage_username.onfocus = function() {
        registerUsernameTips.style.color = 'gray';
        registerUsernameTips.innerHTML = '用户名由4-10位数字、英文组成';
    }
}

//正则检验邮箱
if (register_personMessage_email.length != 0) { //账户名限制位4-10位的数字和英文 不能有特殊字符
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    register_personMessage_email.onblur = function() {
        if (reg.test(register_personMessage_email.value)) {
            registerEmailTips.style.color = 'green';
            registerEmailTips.innerHTML = '邮箱格式正确!';
        } else {
            registerEmailTips.style.color = 'red';
            registerEmailTips.innerHTML = '邮箱格式错误，请重新输入';
        }
    }
    register_personMessage_email.onfocus = function() {
        registerEmailTips.style.color = 'gray';
        registerEmailTips.innerHTML = '邮箱可为数字/英文+@xx.com形式';
    }
}

//正则验证密码格式
if (register_personMessage_password.length != 0) { //密码限制位6-16位的数字和英文以及下划线短横线 不能有特殊字符
    let reg = /^[a-zA-Z0-9_-]{6,16}$/;
    register_personMessage_password.onblur = function() {
        if (reg.test(register_personMessage_password.value)) {
            registerPasswordTips.style.color = 'green';
            registerPasswordTips.innerHTML = '密码格式正确!';
        } else {
            registerPasswordTips.style.color = 'red';
            registerPasswordTips.innerHTML = '密码格式错误，请重新输入';
        }
    }
    register_personMessage_password.onfocus = function() {
        registerPasswordTips.style.color = 'gray';
        registerPasswordTips.innerHTML = '密码由6-16位数字、英文、短横线和下划线组成';
    }
}

//正则验证两次密码是否一致
if (register_personMessage_password1.length != 0) {
    register_personMessage_password1.onblur = function() {
        if (register_personMessage_password.value === register_personMessage_password1.value) {
            registerPasswordTips1.style.color = 'green';
            registerPasswordTips1.innerHTML = '两次输入的密码一致!';
        } else {
            registerPasswordTips1.style.color = 'red';
            registerPasswordTips1.innerHTML = '两次输入的密码不一致，请重新输入';
        }
    }
    register_personMessage_password1.onfocus = function() {
        registerPasswordTips1.style.color = 'gray';
        registerPasswordTips1.innerHTML = '请输入第一次输入的密码'
    }
}

//登录正则验证
//验证密码

// 获取注册数据传到eolink
register_personMessageButton.onclick = function() {
    let registerUsername = register_personMessage_username.value;
    let registerPassword = register_personMessage_password1.value;
    let registerEmail = register_personMessage_email.value;
    // 将拿到的数据封装成json数组
    let registerUserJSON = {
        "username": registerUsername,
        "password": registerPassword,
        "email": registerEmail
    };
    let registerUserJSONString = JSON.stringify(registerUserJSON);
    // 上传到eolink
    let registerData = getJSON('POST', 'http://175.178.51.126:8091/smallA/register', registerUserJSONString).then(res => {
        let tips = JSON.parse(res)
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
    let loginUsername = login_personMessage_username.value;
    let loginPassword = login_personMessage_password.value;
    // 将拿到的数据封装成json数组，
    let loginUserJSON = {
        "username": loginUsername,
        "password": loginPassword
    };
    // 上传到eolink
    let loginUserJSONString = JSON.stringify(loginUserJSON);
    let loginData = getJSON('POST', 'http://175.178.51.126:8091/smallA/login', loginUserJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            alert('登录成功');
            login_background.style.display = 'none';
            forum.style.display = 'block';
            // 你在登录成功这里面加入cookie  你的一些登录操作必须要等服务器那边给你回应才能实现  而不是随随便便就存上去的  
            // setCookie函数你第一个参数是key，你自己设定的 是字符串 要加双引号
            setCookie("username", login_personMessage_username.value);
            setCookie("password", login_personMessage_password.value);
            topBar_username.innerHTML = getCookie("username");

        } else {
            alert('用户名或密码错误');
        }
    });
}

// 获取邮箱登录数据 上传到eolink
login_personMessageButton1.onclick = function() {
    let loginEmail = login_personMessage_email.value;
    let loginEmailPassword = login_personMessage_password1.value;
    // 将拿到的数据封装成json数组，
    let loginUserJSON = {
        "email": loginEmail,
        "password": loginEmailPassword
    };
    // 上传到eolink
    let loginUserJSONString = JSON.stringify(loginUserJSON);
    let loginData = getJSON('POST', 'http://175.178.51.126:8091/smallA/login', loginUserJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            login_background.style.display = 'none';
            forum.style.display = 'block';
            setCookie("mailname", login_personMessage_email.value);
            setCookie("password", login_personMessage_password1.value);
            topBar_username.innerHTML = getCookie("mailname");
        } else {
            alert('邮箱或密码错误');
        }
    });
}

// 七天免登陆  除了可以直接跳过登录  你还可以设置你的用户名为你的账号  如果你有单独的名字而不是账号  到时候再跟你说  
// 不是没七天登录  而是你第一次登录进去这部分代码没用的  你是登录进去才有cookie  你这都没办法触发1
// 这样判断不行  你那勾当你刷新页面他自动变为false的  应该把你的勾也存到cookie  或者加个js的tag值来判断是不是打过勾
if (getCookie("password") != "") {
    topBar_username.innerHTML = getCookie("username");
    login_background.style.display = 'none';
    forum.style.display = 'block';
}