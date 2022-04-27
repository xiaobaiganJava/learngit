var topBar_userInfo = document.querySelector('.topBar_userInfo');
var topBar_submenu = document.querySelector('.topBar_submenu');
var submenu_username = document.querySelector('.submenu_username');
var submenu_logOut = document.querySelector('.submenu_logOut');
var forum_container = document.querySelector('.forum_container');

// 鼠标移入
topBar_userInfo.onmouseover = function() {
    topBar_submenu.style.display = 'block';
};

// 鼠标移出
topBar_userInfo.onmouseout = function() {
    topBar_submenu.style.display = 'none';
};

// 退出登录 同时清除cookie内账号数据
submenu_logOut.onclick = function() {
    forum.style.display = 'none';
    login_background.style.display = 'block';
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

(function() {
    let forumUserJSON = {
        "uid": 32
    };
    let forumUserJSONString = JSON.stringify(forumUserJSON);
    let forumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectAllDiary', forumUserJSONString).then(res => {
        let tips = JSON.parse(res);
        console.log(tips);
        // 因为可能会遇到需要刷新的  每次都得保证里面先是空的然后一个一个加进去
        forum_container.innerHTML = '';
        for (var i = 0; i < tips.data.length; i++) {
            // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
            console.log(tips.data[i].createtime);
            forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
        <div class="forum_usernameAndHeadImg">
            <img src="${"http://"+tips.data[i].author.headImg}" alt="" id="userHeadImg">
            <span id="Username">${tips.data[i].author.username}</span>
        </div>
        <div class="forum_title">
            <span id="title">${tips.data[i].title}</span>
        </div>
        <div class="forum_text">
            <div id="text">${tips.data[i].content}</div>
        </div>
        <div class="forum_timeAndLikeNum">
            <div id="time">${tips.data[i].createTime}</div>
            <div id="likeNum">${tips.data[i].likesNum}</div>
        </div>
    </div>`
        }
    });
})();