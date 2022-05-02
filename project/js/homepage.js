// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
}

// 展示所有动态
var allTalking = function() {
    let forumUserJSON = {
        "uid": getCookie("id"),
    };
    let forumUserJSONString = JSON.stringify(forumUserJSON);
    let forumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectAllDiary', forumUserJSONString).then(res => {
        let tips = JSON.parse(res);
        // 因为可能会遇到需要刷新的  每次都得保证里面先是空的然后一个一个加进去
        forum_container.innerHTML = '';
        for (let i = 0; i < tips.data.length; i++) {
            // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
            if (tips.data[i].images.length != 0) { //if判断动态是否有图片
                for (let j = 0; j < tips.data[i].images.length; j++) { //存在bug 只能显示一张图片
                    forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
        <div class="forum_usernameAndHeadImg">
            <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = '${tips.data[i].author.id}'>
            <span class="Username">${tips.data[i].author.username}</span>
        </div>
        <div class="forum_title">
            <span class="title">${tips.data[i].title}</span>
        </div>
        <div class="forum_text">
            <p class="text">${tips.data[i].content}</p>
        </div>
        <div class="forum_Img">
        <img src="${"http://"+tips.data[i].images[j].img}" alt="" class="forum_talkingImg">
        </div>
        <div class="forum_timeAndLikeNum">
            <div class="time">${tips.data[i].createTime}</div>
            <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike=${tips.data[i].isLike}></img>
            <div class="likeNum">${tips.data[i].likesNum}</div>
        </div>
    </div>`
                }
            } else { //生成没有图片的动态
                forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
            <div class="forum_usernameAndHeadImg">
                <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = ${tips.data[i].author.id}>
                <span class="Username">${tips.data[i].author.username}</span>
            </div>
            <div class="forum_title">
                <span class="title">${tips.data[i].title}</span>
            </div>
            <div class="forum_text">
                <p class="text">${tips.data[i].content}</p>
            </div>

            <div class="forum_timeAndLikeNum">
                <div class="time">${tips.data[i].createTime}</div>
                <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike = ${tips.data[i].isLike}></img>
                <div class="likeNum">${tips.data[i].likesNum}</div>
            </div>
        </div>`
            }
        }
    });
};
allTalking();
// 事件委托
forum_container.addEventListener("click", function(e) {
    // 实现查询用户所有动态
    if (e.target.className == "userHeadImg") {
        let userId = e.target.getAttribute("data-id");
        let userHomepageJSON = {
            uid: getCookie("id"),
            id: userId
        }
        let userHomepageJSONString = JSON.stringify(userHomepageJSON);
        let userHomepageData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId', userHomepageJSONString).then(res => {
            let tips = JSON.parse(res);
            if (tips.code >= 200 && tips.code < 300) {
                forum_container.innerHTML = '';
                for (let i = 0; i < tips.data.length; i++) {
                    // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
                    if (tips.data[i].images.length != 0) { //if判断动态是否有图片
                        for (let j = 0; j < tips.data[i].images.length; j++) { //存在bug 只能显示一张图片
                            forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
                <div class="forum_usernameAndHeadImg">
                    <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = '${tips.data[i].author.id}'>
                    <span class="Username">${tips.data[i].author.username}</span>
                </div>
                <div class="forum_title">
                    <span class="title">${tips.data[i].title}</span>
                </div>
                <div class="forum_text">
                    <p class="text">${tips.data[i].content}</p>
                </div>
                <div class="forum_Img">
                <img src="${"http://"+tips.data[i].images[j].img}" alt="" class="forum_talkingImg">
                </div>
                <div class="forum_timeAndLikeNum">
                    <div class="time">${tips.data[i].createTime}</div>
                    <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike = ${tips.data[i].isLike}></img>
                    <div class="likeNum">${tips.data[i].likesNum}</div>
                </div>
            </div>`
                        }
                    } else { //生成没有图片的动态
                        forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
                    <div class="forum_usernameAndHeadImg">
                        <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = ${tips.data[i].author.id}>
                        <span class="Username">${tips.data[i].author.username}</span>
                    </div>
                    <div class="forum_title">
                        <span class="title">${tips.data[i].title}</span>
                    </div>
                    <div class="forum_text">
                        <p class="text">${tips.data[i].content}</p>
                    </div>
        
                    <div class="forum_timeAndLikeNum">
                        <div class="time">${tips.data[i].createTime}</div>
                        <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike = ${tips.data[i].isLike}></img>
                        <div class="likeNum">${tips.data[i].likesNum}</div>
                    </div>
                </div>`
                    }
                }
            } else {
                alert('进入失败');
            }
        });
        // 实现点赞和取消点赞功能
        if (e.target.className == "likeImg") {
            let tag = e.target.getAttribute("data-ifLike");
            if (tag == "true") {
                tag = false;
            } else {
                tag = true;
            }
            let likeJSON = {
                uid: getCookie("id"),
                id: e.target.getAttribute("data-did"),
                ifLike: tag
            }
            let likeJSONString = JSON.stringify(likeJSON);
            let likeData = getJSON('POST', 'http://175.178.51.126:8091/smallA/likeDiary', likeJSONString).then(res => {
                let tips = JSON.parse(res);
                console.log(tips);
                if (tips.code >= 200 && tips.code < 300) {} else {}
            })
        };
    }
    // 实现点赞和取消点赞功能
    if (e.target.className == "likeImg") {
        let tag = e.target.getAttribute("data-ifLike");
        if (tag == "true") {
            tag = false;
        } else {
            tag = true;
        }
        let likeJSON = {
            uid: getCookie("id"),
            id: e.target.getAttribute("data-did"),
            ifLike: tag
        }
        let likeJSONString = JSON.stringify(likeJSON);
        let likeData = getJSON('POST', 'http://175.178.51.126:8091/smallA/likeDiary', likeJSONString).then(res => {
            let tips = JSON.parse(res);
            console.log(tips);
            if (tips.code >= 200 && tips.code < 300) {
                allTalking();
            } else {
                allTalking();
            }
        })
    }
});