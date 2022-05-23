const free1 = document.getElementById('free1');
const free2 = document.getElementById('free2');

//默认选定
free1.checked = true ;
free2.checked = true ;



//用户名七天
if(getCookie("remove")){
    if (getCookie("pas") && getCookie("name")) {
        name_name.value = getCookie("name");
        name_password.value = getCookie("pas");
        usename();
    } else if (getCookie("pas") && getCookie("email")) {
        email_email.value = getCookie("email");
        email_password.value = getCookie("pas");
        useemail();
    } else {
        name_name.value = "";
        name_password.value = "";
        email_email.value = "";
        email_password.value = "";
    }
}
console.log(getCookie("remove"));




/*用户名登录窗口*/
name_btn.addEventListener('click', usename)

function usename() {
    myAjax('POST', 'http://175.178.51.126:8091/smallA/login',
        { username: name_name.value, password: name_password.value },
        function (res) {
            if (free1.checked) {
                setCookie("name", name_name.value, 7);
                setCookie("pas", name_password.value, 7)
            } else {
                removeCookie("name");
                removeCookie("pas");
            }
            let param = JSON.parse(res);
            if (param.code >= 400) {
                alert_content.innerHTML = param.msg+"无法自动登录";
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
                register_part.style.display = 'block';
            }
            if (param.code === 200) {
                setCookie("uid", param.data.id,7);
                setCookie("headImg",param.data.headImg,7)
                window.location.href = "http://127.0.0.1:5500/html/activity.html"
                userid1.value = param.data.id;
                useremail1.value = param.data.email;
                username1.value = param.data.username;
                userage1.value = param.data.age;
                userphone1.value = param.data.phone;
                usersex1.value = param.data.sex;

                userImg.src = 'http://' + param.data.headImg;
            }
        }
    );
}

/*邮箱登录窗口*/
email_btn.addEventListener('click',useemail)

function useemail() {
    myAjax('POST', 'http://175.178.51.126:8091/smallA/login',
        { email: email_email.value, password: email_password.value },
        function (res) {
            if (free2.checked) {
                setCookie("email", email_email.value, 7);
                setCookie("pas", email_password.value, 7)
            } else {
                removeCookie("email");
                removeCookie("pas");
            }
            let param = JSON.parse(res);
            if (param.code >= 400) {
                alert_content.innerHTML = param.msg;
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
                register_part.style.display = 'block';
            }
            if (param.code === 200) {
                setCookie("uid", param.data.id,7);
                setCookie("headImg",param.data.headImg,7)
                window.location.href = "http://127.0.0.1:5500/html/activity.html"
                userid1.value = param.data.id;
                useremail1.value = param.data.email;
                username1.value = param.data.username;
                userage1.value = param.data.age;
                userphone1.value = param.data.phone;
                usersex1.value = param.data.sex;

                userImg.src = 'http://' + param.data.headImg;
            }
        }
    );
}