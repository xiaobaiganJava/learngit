var logOut = document.querySelector('.logOut');
var login = document.querySelector('.login');
var deleteUser = document.querySelector('.deleteUser');
var deleteBox = document.querySelector('.deleteBox')
var deleteUsername = document.querySelector('.deleteUsername');
var deleteEmail = document.querySelector('.deleteEmail');
var deletePassword = document.querySelector('.deletePassword');

logOut.onclink = function() {
    alert('退出成功');
    logOut.style.display = 'none';
    login.style.display = 'block';
}

deleteUser.onclink = function() {
    homepage.style.display = 'none';
    deleteBox.style.display = 'block';
}

// 获取删除数据传到eolink
deleteUser.onclick = function() {
    var deleteUsername = deleteUsername.value;
    var deleteEmail = deleteEmail.value;
    var deletePassword = deletePassword.value;
    if (deletePassword.length != 0) { //密码限制位6-20位的数字和英文 不能有特殊字符
        reg = /^(\w){6,20}$/;
        if (!reg.test(deletePassword)) {
            alert("对不起，您输入的密码格式不正确!");
        }
    }
    // 将拿到的数据封装成json数组
    var deleteUserJSON = {
        "username": deleteUsername,
        "email": deleteEmail,
        "password": deletePassword,
    };
    console.log(deleteUserJSON.username, deleteUserJSON.password, deleteUserJSON.email);
    var deleteUserJSONString = JSON.stringify(registerUserJSON);
    // 上传到eolink
    var deleteData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteUser', deleteUserJSONString).then(res => {
        var tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            alert(tips.msg);
        } else {
            alert('删除成功');
            console.log(tips.msg);
        }
    });
}