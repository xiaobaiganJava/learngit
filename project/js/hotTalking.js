// 设置一个全局变量实现网页间传参
var selectUserId = 0;
// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
};
// 分页
let current = 1; //当前页数
let maxLength = 0; // 最大长度
let itemSize = 5; //一页展示的数据
let maxPage = document.querySelector(".maxPage");
let currentPage = document.querySelector(".currentPage");
let prePage = document.querySelector(".prePage");
let nextPage = document.querySelector(".nextPage");
// 获取热门动态最大长度
(function() {
    let hotTalkingLengthJSON = {
        "uid": getCookie("id")
    };
    let hotTalkingLengthJSONString = JSON.stringify(hotTalkingLengthJSON);
    let lengthData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary', hotTalkingLengthJSONString).then(res => {
        let tips = JSON.parse(res);
        maxLength = tips.data.length;
        if (maxLength % itemSize != 0) {
            maxPage.innerHTML = (maxLength - maxLength % itemSize) / itemSize + 1;
        } else {
            maxPage.innerHTML = maxLength / itemSize;
        }
    });
})();
prePage.onclick = function() {
    if (current > 1) {
        current = current - 1;
        allHotTalking();
    }
}
nextPage.onclick = function() {
    let maxpagetag = 0;
    if (maxLength % itemSize != 0) {
        maxpagetag = (maxLength - maxLength % itemSize) / itemSize + 1;
    } else {
        maxpagetag = maxLength / itemSize;
    }
    if (current < maxpagetag) {
        current += 1;
        allHotTalking();
    }
}

// 展示所有热门动态
var allHotTalking = function() {
    let forumUserJSON = {
        "uid": getCookie("id"),
        "current": current,
        "size": itemSize
    };
    let forumUserJSONString = JSON.stringify(forumUserJSON);
    let forumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary', forumUserJSONString).then(res => {
        let tips = JSON.parse(res);
        console.log(tips);
        // 因为可能会遇到需要刷新的  每次都得保证里面先是空的然后一个一个加进去
        forum_container.innerHTML = '';
        if (tips.code >= 200 && tips.code < 300) {
            for (let i = 0; i < tips.data.list.length; i++) {
                // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
                let forum_content = document.createElement('div');
                forum_content.className = 'forum_content';
                forum_content.setAttribute("data-uid", tips.data.list[i].author.id);
                let uid = forum_content.getAttribute("data-uid");
                // 添加删除个人动态按钮
                if (uid == getCookie("id")) {
                    var deleteTalking = document.createElement('img');
                    deleteTalking.setAttribute("did", tips.data.list[i].id);
                    deleteTalking.className = 'deleteTalking';
                    deleteTalking.src = '../image/shut.png';
                    forum_content.appendChild(deleteTalking);
                }
                // 用户名与头像
                let forum_usernameAndHeadImg = document.createElement('div');
                let userHeadImg = document.createElement('img');
                let Username = document.createElement('span');
                forum_usernameAndHeadImg.className = 'forum_usernameAndHeadImg';
                userHeadImg.className = 'userHeadImg';
                Username.className = 'Username';
                forum_content.appendChild(forum_usernameAndHeadImg);
                forum_usernameAndHeadImg.appendChild(Username);
                forum_usernameAndHeadImg.appendChild(userHeadImg);
                Username.innerHTML = tips.data.list[i].author.username;
                userHeadImg.src = "http://" + tips.data.list[i].author.headImg;
                userHeadImg.setAttribute("data-id", tips.data.list[i].author.id);
                Username.innerHTML = tips.data.list[i].author.username;
                // 标题
                let forum_title = document.createElement('div');
                let title = document.createElement('span');
                forum_title.className = 'forum_title';
                title.className = 'title';
                forum_content.appendChild(forum_title);
                forum_title.appendChild(title);
                title.innerHTML = tips.data.list[i].title;
                // 文本框
                let forum_text = document.createElement('div');
                let text = document.createElement('p');
                forum_text.className = 'forum_text';
                text.className = 'text';
                forum_content.appendChild(forum_text);
                forum_text.append(text);
                text.innerHTML = tips.data.list[i].content;
                // 图片区域
                let forum_Img = document.createElement('div');
                forum_Img.className = 'forum_Img';
                forum_content.append(forum_Img);
                // 时间与点赞
                let forum_timeAndLikeNum = document.createElement('div');
                let time = document.createElement('div');
                let likeImg = document.createElement('img');
                let likeNum = document.createElement('div');
                forum_timeAndLikeNum.className = 'forum_timeAndLikeNum';
                time.innerHTML = tips.data.list[i].createTime;
                likeImg.src = "../image/" + tips.data.list[i].isLike + "like.png";
                likeImg.setAttribute("data-did", tips.data.list[i].id);
                likeImg.setAttribute("data-ifLike", tips.data.list[i].isLike);
                likeNum.innerHTML = tips.data.list[i].likesNum;
                time.className = 'time';
                likeImg.className = 'likeImg';
                likeNum.className = 'likeNum';
                forum_timeAndLikeNum.append(time);
                forum_timeAndLikeNum.append(likeImg);
                forum_timeAndLikeNum.append(likeNum);
                forum_content.appendChild(forum_timeAndLikeNum);
                // 查看详情
                let forum_Viewmore = document.createElement('a');
                forum_Viewmore.className = 'forum_Viewmore';
                forum_content.appendChild(forum_Viewmore);
                forum_Viewmore.innerHTML = '查看详情';
                forum_Viewmore.setAttribute("talkingid", tips.data.list[i].id);
                for (let j = 0; j < tips.data.list[i].images.length; j++) {
                    let forum_talkingImg = document.createElement('img');
                    forum_talkingImg.className = 'forum_talkingImg';
                    forum_talkingImg.src = "http://" + tips.data.list[i].images[j].img;
                    forum_Img.append(forum_talkingImg);
                };
                forum_container.appendChild(forum_content);
            }
            currentPage.innerHTML = current;
        }

    });
};
allHotTalking();
forum_container.addEventListener("click", function(e) {
    // 进入热门动态的用户所有动态 传输id到该页面
    if (e.target.className == "userHeadImg") {
        selectUserId = e.target.getAttribute("data-id");
        location.href = 'personalHotTalking.html?id=' + selectUserId;
    }
    // 实现点赞和取消点赞功能
    if (e.target.className == "likeImg") {
        let tag = e.target.getAttribute("data-ifLike");
        if (tag == "true") {
            tag = false;
        } else {
            tag = true;
        }
        console.log(tag);
        let likeJSON = {
            uid: getCookie("id"),
            id: e.target.getAttribute("data-did"),
            ifLike: tag
        }
        let likeJSONString = JSON.stringify(likeJSON);
        let likeData = getJSON('POST', 'http://175.178.51.126:8091/smallA/likeDiary', likeJSONString).then(res => {
            let tips = JSON.parse(res);
            if (tips.code >= 200 && tips.code < 300) {
                allHotTalking();
            } else {
                allHotTalking();
            }
        })
    }
    // 跳转详情页
    if (e.target.className == "forum_Viewmore") {
        selectTalkingId = e.target.getAttribute("talkingId")
        location.href = "concreteTalking.html?id=" + selectTalkingId;
    };
    // 删除个人动态
    if (e.target.className == "deleteTalking") {
        e.target.addEventListener("click", function() {
            let deleteTalkingId = e.target.getAttribute("did");
            let deleteTalkingJSON = {
                "id": deleteTalkingId
            };
            let deleteTalkingJSONString = JSON.stringify(deleteTalkingJSON);
            let deleteData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteDiary', deleteTalkingJSONString).then(res => {
                let tips = JSON.parse(res)
                console.log(res);
                if (tips.code === 200) {
                    alert('删除成功');
                    allHotTalking();
                } else {
                    alert('删除失败');
                    allHotTalking();
                }
            });
        });
    }
});