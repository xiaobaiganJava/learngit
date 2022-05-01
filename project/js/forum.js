// 鼠标移入
topBar_userInfo.onmouseover = function() {
    topBar_submenu.style.display = 'block';
};

// 鼠标移出
topBar_userInfo.onmouseout = function() {
    topBar_submenu.style.display = 'none';
};

// 展示所有动态
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

//打开个人信息
submenu_username.addEventListener("click", function() {
    window.location = 'personalMessage.html';
});

// 退出登录 同时清除cookie内账号数据
submenu_logOut.onclick = function() {
    window.location = "index.html"
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "headImg=; expires= Thu, 01 Jan 1970 00:00:00 GMT";
};