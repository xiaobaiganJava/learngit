// 登录界面点击切换 tab栏
var login = document.querySelector('.login');
var lis = login.querySelectorAll('li');
// 登录后显示用户名
var topBar_username = document.querySelector(".topBar_username");
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
            login.style.display = 'block';
            register.style.display = 'none';
            register_personMessage_username.value = "";
            register_personMessage_password.value = "";
            register_personMessage_email.value = "";
            register_personMessage_password1.value = "";
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
            // 登录成功这里面加入cookie  登录操作必须在等服务器那边给你回应才能实现  而不是随随便便就存上去的  
            // setCookie函数第一个参数是key，自己设定的 是字符串 要加双引号
            setCookie("id", tips.data.id);
            setCookie("username", login_personMessage_username.value);
            setCookie("password", login_personMessage_password.value);
            setCookie("headImg", tips.data.headImg);
            // 去往主页
            window.location = "homepage.html";
            // 清楚登录的账号密码
            login_personMessage_username.value = "";
            login_personMessage_password.value = "";
        } else {
            alert('用户名或密码错误');
        }
    });
}

// 获取邮箱登录数据 上传到eolink
login_personMessageButton1.onclick = function() {
    let loginEmail = login_personMessage_email.value;
    let loginEmailPassword = login_personMessage_password1.value;
    // 将拿到的数据封装成json数据，
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
            alert('登陆成功');
            console.log(tips.data.id);
            setCookie("id", tips.data.id);
            setCookie("mailname", login_personMessage_email.value);
            setCookie("password", login_personMessage_password1.value);
            setCookie("headImg", tips.data.headImg);
            window.location = "homepage.html";
            login_personMessage_email.value = "";
            login_personMessage_password1.value = "";
        } else {
            alert('邮箱或密码错误');
        }
    });
}

// 七天免登陆 
// 这样判断不行  你那勾当你刷新页面他自动变为false的  应该把你的勾也存到cookie  或者加个js的tag值来判断是不是打过勾
// login_personMessageButton.addEventListener("click", function() {
// if (freeLogin_button.checked) {
//     flag = 1;
// } else {
//     flag = 0;
// }
// console.log(freeLogin_button.checked);
if (getCookie("password") != "") {
    window.location = "homepage.html";
}
// });