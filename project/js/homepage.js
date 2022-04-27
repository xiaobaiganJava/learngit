var logOut = document.querySelector('.log_outButton');
var Login = document.querySelector('.login');
var Homepage = document.querySelector('.homepage');
// 删除账号部分
var deleteBox = document.querySelector('.deleteBox');
var deleteUser = document.querySelector('.delete_userButton');
var delete_username = document.querySelector('.delete_username');
var delete_email = document.querySelector('.delete_email');
var delete_password = document.querySelector('.delete_password');
var deleteButton = document.querySelector('.delete_button');
var deleteReturnHomepage = document.querySelector('.delete_returnHomepage');
// 修改个人信息部分
var change_userButton = document.querySelector('.change_userButton');
var changeUserButton = document.querySelector('.changeUserButton');
var changeUserBox = document.querySelector('.changeUserBox');
var changeUserReturnHomepage = document.querySelector('.changeuser_returnHomepage');
var changeUserId = document.querySelector('.changeUser_id');
var changeUserName = document.querySelector('.changeUser_username');
var changeUserEmail = document.querySelector('.changeUser_email');
var changeUserPhone = document.querySelector('.changeUser_phone');
var changeUserSex = document.querySelector('.changeUser_sex');
var changeUserAge = document.querySelector('.changeUser_age');
// 上传头像部分
var inputHeadImgBox = document.querySelector('.inputHeadImgBox');
var inputHeadImg_username = document.querySelector('.inputHeadImg_username');
var inputHeadImg_img = document.querySelector('.inputHeadImg_img');
var input_headImg = document.querySelector('.input_headImg');
// 退出登录  
logOut.addEventListener("click", function() {
    Login.style.display = 'block';
    Homepage.style.display = 'none';
});

// 删除账号
deleteUser.addEventListener("click", function() {
    Homepage.style.display = 'none';
    deleteBox.style.display = 'block';
});

// 从删除账号回到主页
deleteReturnHomepage.addEventListener("click", function() {
    Homepage.style.display = 'block';
    deleteBox.style.display = 'none';
});


// 修改个人信息
change_userButton.addEventListener("click", function() {
    Homepage.style.display = 'none';
    changeUserBox.style.display = 'block';
});


// 从修改个人信息回到主页
changeUserReturnHomepage.onclick = function() {
    changeUserBox.style.display = 'none';
    Homepage.style.display = 'block';
}

// 上传头像
input_headImg.addEventListener("click", function() {
    Homepage.style.display = 'none';
    inputHeadImgBox.style.display = 'block';
});

//获取删除数据传到eolink
deleteButton.onclick = function() {
    let deleteUsername = delete_username.value;
    let deleteEmail = delete_email.value;
    let deletePassword = delete_password.value;
    // 将拿到的数据封装成json数组
    let deleteUserJSON = {
        "username": deleteUsername,
        "email": deleteEmail,
        "password": deletePassword,
    };
    let deleteUserJSONString = JSON.stringify(deleteUserJSON);
    //上传到eolink
    let deleteData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteUser', deleteUserJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            alert('删除成功');
        } else {
            alert('删除失败');
        }
    });
}

// 获取修改信息传到eolink 
changeUserButton.onclick = function() {
    let changeUserId1 = changeUserId.value;
    let changeUserName1 = changeUserName.value;
    let changeUserEmail1 = changeUserEmail.value;
    let changeUserPhone1 = changeUserPhone.value;
    let changeUserSex1 = changeUserSex.value;
    let changeUserAge1 = changeUserAge.value;
    let changeUserJSON = {
        "id": changeUserId1,
        "username": changeUserName1,
        "email": changeUserEmail1,
        "phone": changeUserPhone1,
        "sex": changeUserSex1,
        "age": changeUserAge1,
    };
    let changeUserJSONString = JSON.stringify(changeUserJSON);
    // 上传到eolink
    let changeUserdata = getJSON('POST', 'http://175.178.51.126:8091/smallA/updateUserData', changeUserJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            alert('修改成功');
        } else {
            alert('修改失败');
        }
    });
}

// 获取上传头像信息传到eolink