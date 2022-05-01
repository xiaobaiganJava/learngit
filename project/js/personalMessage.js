// 回到首页
topBar_allTalking.addEventListener("click", function() {
    window.location = "homepage.html";
});

//打开热门动态
topBar_hotTalking.addEventListener("click", function() {
    window.location = "hotTalking.html";
});

//打开新建动态
topBar_createTalking.addEventListener("click", function() {
    window.location = "createTalking.html";
});

//打开删除动态
topBar_deleteTalking.addEventListener("click", function() {
    window.location = "deleteTalking.html";
});


// 修改个人信息部分
// 打开修改信息栏
changePeasonalMessage_button.addEventListener("click", function() {
    personalMessage.style.display = 'none';
    changeMessage_background.style.display = 'block';
});
// 返回个人信息栏

changeuser_returnHomepage.addEventListener("click", function() {
    personalMessage.style.display = 'block';
    changeMessage_background.style.display = 'none';
});

//修改个人信息
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

// 上传头像 
headImg_button.addEventListener("change", function() {
    let url = window.URL.createObjectURL(headImg_button.files[0]);
    let str = '<img src = "' + url + '" class="headImg">';
    headImg_box.innerHTML += str;
});
headImg_button.addEventListener("change", function() {
    // 传输头像数据
    let formdata = new FormData();
    formdata.append('username', 1744654182);
    formdata.append('headImg', headImg_button.files[0]);
    console.log(headImg_button.files[0]);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://175.178.51.126:8091/smallA/uploadHeadImg', true);
    xhr.send(formdata);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('上传成功');
            }
        }
    }
});

// 删除账号
// 打开删除账号
deleteUser.addEventListener("click", function() {
    deleteBox_background.style.display = 'block';
    personalMessage.style.display = 'none';
});
// 回到个人信息
deleteReturnHomepage.addEventListener("click", function() {
    deleteBox_background.style.display = 'none';
    personalMessage.style.display = 'block';
})

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