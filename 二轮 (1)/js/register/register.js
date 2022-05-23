
const register_part = document.querySelector('.register-part')
const run_part = document.querySelector('.run-part');
const box_body = document.querySelector('.box-body');
const front = document.getElementById('front');
const back_wrapper = document.getElementById('back-wrapper');
//头像
let userImg = document.getElementById('userImg');

//头部区
const nav_headImg =document.getElementById('nav-headImg');
const nav_name = document.getElementById('nav-name');

/*弹出框 */
const alertwrapper = document.querySelector('.alertwrapper');
const alert_box = document.querySelector('.alert-box');
const icon = document.getElementById('icon');
const alert_btn = document.getElementById('alert-btn');
const alert_content = document.getElementById('alert-content');

//关闭弹出框
alert_btn.addEventListener('click', close);
icon.addEventListener('click', close);
function close() {
    alertwrapper.style.display = 'none';
    alert_box.style.display = 'none'
}

//用户名登录和邮箱登录的切换
const resignByName = document.getElementById('resignByName');
const resignByEmail = document.getElementById('resignByEmail');
const Byname = document.getElementById('Byname');
const Byemail = document.getElementById('Byemail');

resignByName.addEventListener('click', function () {
    Byname.style.display = 'block';
    Byemail.style.display = 'none';
    resignByName.className = 'change';
    resignByEmail.className = '';
})

resignByEmail.addEventListener('click', function () {
    Byname.style.display = 'none';
    Byemail.style.display = 'block';
    resignByName.className = '';
    resignByEmail.className = 'change';
})


//翻转
const switch_1 = document.getElementById('switch_1');
const switch_11 = document.getElementById('switch_11');
const switch_2 = document.getElementById('switch_2');

switch_1.addEventListener('click', fn1);
switch_11.addEventListener('click', fn1);
switch_2.addEventListener('click', fn);

function fn1() {
    front.style.transform = 'rotateY(180deg)';
    front.style.transition = 'all 1s ease';
    back_wrapper.style.transform = 'rotate(0deg)';
    back_wrapper.transition = 'all 1s ease';
}

function fn() {
    front.style.transform = 'rotateY(0deg)';
    front.style.transition = 'all 1s ease';
    back_wrapper.style.transform = 'rotateY(180deg)';
    back_wrapper.transition = 'all 1s ease';
}

//正则表达式
let register_input = back_wrapper.querySelectorAll('input');
const emaliReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const passwordReg = /\w{6,18}$/;
for (let i = 0; i < register_input.length; i++) {
    register_input[i].onblur = function () {
        if (i == 1) {//邮箱格式正则
            if (!emaliReg.test(register_input[i].value)) {
                show(register_input[i]);
            } else {
                out(register_input[i]);
            }
        } else if (i == 2) {//第一次密码正则
            if (!passwordReg.test(register_input[i].value)) {
                show(register_input[i]);
            } else {
                out(register_input[i]);
            }
        } else if (i == 3) {
            if (!passwordReg.test(register_input[i].value) || register_input[i].value !== register_input[i - 1].value) {
                show(register_input[i]);
            } else {
                out(register_input[i]);
            }
        }
    }
}

function show(a) {
    a.nextElementSibling.style.display = 'block';
}

function out(a) {
    a.nextElementSibling.style.display = 'none';
}

//注册
let register_btn = back_wrapper.getElementsByTagName('button')[0];
let flag = true;
register_btn.onclick = function () {
    if (!emaliReg.test(register_input[1].value)) {
        flag = true;
    } else if (!passwordReg.test(register_input[2].value)) {
        flag = true;
    } else if (!passwordReg.test(register_input[3].value) || register_input[3].value !== register_input[2].value) {
        flag = true;
    } else {
        flag = false;
    }
    if (flag == false) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/register',
            { username: register_input[0].value, email: register_input[1].value, password: register_input[2].value },
            function (res) {
                let data = JSON.parse(res);
                alert_content.innerHTML = data.msg;
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
            }
        );
    }
}

//登录
const name_name = document.getElementById('name-name');
const name_password = document.getElementById('name-password');
const name_btn = document.getElementById('name-button');
const email_email = document.getElementById('email-email');
const email_password = document.getElementById('email-password');
const email_btn = document.getElementById('email-button');


/*修改密码 */
/*打开修改密码页面 */
const changepwd = document.getElementById('changepwd');
const changepwd1 = document.getElementById('changepwd1');
const changepassword = document.getElementById('changepassword');
const icon1 = document.getElementById('icon1');
//关闭弹出框
alert_btn.addEventListener('click', close);
icon.addEventListener('click', close);
function close() {
    alert_box.style.display = 'none';
    alertwrapper.style.display = 'none';
}

/*打开关闭 */
icon1.addEventListener('click', function () {
    changepassword.style.display = 'none';
})

changepwd1.addEventListener('click', function () {
    changepassword.style.display = 'block';
})
changepwd.addEventListener('click', function () {
    changepassword.style.display = 'block';
})

//删号
const delete_user = document.querySelector('.delete-user');
let inputs = delete_user.querySelectorAll('input');
const delete0 = document.getElementById('delete0');
const closed = document.getElementById('closed');
const delete_user2 =document.getElementById('delete-user2');
const delete_user1 = document.getElementById('delete-user1')
const headbox = document.getElementById('headbox');

delete_user1.addEventListener('click',function(){
    delete_user.style.display = 'block';
})
delete_user2.addEventListener('click',function(){
    delete_user.style.display = 'block';
})


delete0.addEventListener('click', function () {
    myAjax('POST', 'http://175.178.51.126:8091/smallA/deleteUser',
        { email: inputs[1].value, username: inputs[0].value, password: inputs[2].value },
        function (res) {
            let data = JSON.parse(res);
            alert_content.innerHTML = data.msg;
            alert_box.style.display = 'block';
            alertwrapper.style.display = 'block';
        }
    );
})
closed.addEventListener('click',function(){
    delete_user.style.display = 'none';
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
