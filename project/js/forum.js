// 鼠标移入
topBar_userInfo.onmouseover = function() {
    topBar_submenu.style.display = 'block';
};

// 鼠标移出
topBar_userInfo.onmouseout = function() {
    topBar_submenu.style.display = 'none';
};

//打开个人信息
submenu_username.addEventListener("click", function() {
    window.location = 'personalMessage.html';
});
//打开热门动态
topBar_hotTalking
// 退出登录 同时清除cookie内账号数据
submenu_logOut.onclick = function() {
    window.location = "index.html"
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "headImg=; expires= Thu, 01 Jan 1970 00:00:00 GMT";
};


// 展示所有动态
topBar_allTalking.addEventListener("click", function() {
    window.location = "homepage.html";
});

(function() {

    let forumUserJSON = {
        "uid": 32,
    };
    let forumUserJSONString = JSON.stringify(forumUserJSON);
    let forumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectAllDiary', forumUserJSONString).then(res => {
        let tips = JSON.parse(res);
        console.log(tips);
        // 因为可能会遇到需要刷新的  每次都得保证里面先是空的然后一个一个加进去
        forum_container.innerHTML = '';
        for (let i = 0; i < tips.data.length; i++) {
            // let tipsImgUrl = JSON.stringify(tips.data[i].images[0]);
            //console.log(tips.data[7].images[0].img); //此处要加一个判断，是否为空，以及一个循环，遍历动态的发布的图片的长度
            // console.log(tips.data[i].author);
            // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
            forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
        <div class="forum_usernameAndHeadImg">
            <img src="${"http://"+tips.data[i].author.headImg}" alt="" id="userHeadImg">
            <span id="Username">${tips.data[i].author.username}</span>
        </div>
        <div class="forum_title">
            <span id="title">${tips.data[i].title}</span>
        </div>
        <div class="forum_text">
            <p id="text">${tips.data[i].content}</p>
        </div>
        <div class="forum_Img">
        <img src="${"http://"+tips.data[7].images[0].img}" alt="" id="forum_talkingImg">
        </div>
        <div class="forum_timeAndLikeNum">
            <div id="time">${tips.data[i].createTime}</div>
            <img src="../image/nonelike.png" alt="" id="likeImg" onclick = 'onclick()'></img>
            <div id="likeNum">${tips.data[i].likesNum}</div>
        </div>
    </div>`
        }
    });
})();