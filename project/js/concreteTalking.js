//定义一个全局变量来获取主页传过来的动态id
var concreteTalkingid = 0;
// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
};
// 文本框获得焦点样式
inputComment.onfocus = function() {
    inputComment.style.backgroundColor = 'white';
    inputComment.style.borderColor = '#00a1d6';
    inputComment.style.transition = '.6s';
};
// 文本框失去焦点样式
inputComment.onblur = function() {
    inputComment.style.backgroundColor = '#f4f5f7';
    inputComment.style.borderColor = '#e5e9ef';
    inputComment.style.transition = '.6s';
};
// 分解链接来获得动态id
function getTalkingId() {
    var linkString = location.search;
    var talkingid = linkString.split("=")[1];
    concreteTalkingid = talkingid;
};
getTalkingId();

// 查看动态详情
function getConcreteComment() {
    selectTalkingId = concreteTalkingid;
    let selectTalkingJSON = {
        "uid": getCookie("id"),
        "id": selectTalkingId,
        "key": ""
    }
    let selectTalkingJSONString = JSON.stringify(selectTalkingJSON);
    let selectTalkingData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiary', selectTalkingJSONString).then(res => {
        let tips = JSON.parse(res);
        forum_container.innerHTML = '';
        if (tips.code >= 200 && tips.code < 300) {
            // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
            let forum_content = document.createElement('div');
            forum_content.className = 'forum_content';
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
            Username.innerHTML = tips.data.author.username;
            userHeadImg.src = "http://" + tips.data.author.headImg;
            userHeadImg.setAttribute("data-id", tips.data.author.id);
            Username.innerHTML = tips.data.author.username;
            // 标题
            let forum_title = document.createElement('div');
            let title = document.createElement('span');
            forum_title.className = 'forum_title';
            title.className = 'title';
            forum_content.appendChild(forum_title);
            forum_title.appendChild(title);
            title.innerHTML = tips.data.title;
            // 文本框
            let forum_text = document.createElement('div');
            let text = document.createElement('p');
            forum_text.className = 'forum_text';
            text.className = 'text';
            forum_content.appendChild(forum_text);
            forum_text.append(text);
            text.innerHTML = tips.data.content;
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
            time.innerHTML = tips.data.createTime;
            likeImg.src = "../image/" + tips.data.isLike + "like.png";
            likeImg.setAttribute("data-did", tips.data.id);
            likeImg.setAttribute("data-ifLike", tips.data.isLike);
            likeNum.innerHTML = tips.data.likesNum;
            time.className = 'time';
            likeImg.className = 'likeImg';
            likeNum.className = 'likeNum';
            forum_timeAndLikeNum.append(time);
            forum_timeAndLikeNum.append(likeImg);
            forum_timeAndLikeNum.append(likeNum);
            forum_content.appendChild(forum_timeAndLikeNum);
            for (let j = 0; j < tips.data.images.length; j++) {
                let forum_talkingImg = document.createElement('img');
                forum_talkingImg.className = 'forum_talkingImg';
                forum_talkingImg.src = "http://" + tips.data.images[j].img;
                forum_Img.append(forum_talkingImg);
            };
            forum_container.appendChild(forum_content);
            forum_title.className = "forum_title_change";
            text.className = "text_change";
            forum_text.className = "forum_text_change";
            forum_Img.className = "forum_Img_change";
            forum_content.className = "forum_content change";

        }
    });
};
getConcreteComment();
// 发表评论
comment_submit.addEventListener("click", function() {
    let commentTalkingId = concreteTalkingid;
    let commentUserId = getCookie('id');
    let commentContent = inputComment.value;
    let commentJSON = {
        "did": concreteTalkingid,
        "uid": commentUserId,
        "content": commentContent
    }
    let commentJSONString = JSON.stringify(commentJSON);
    let commentData = getJSON('POST', 'http://175.178.51.126:8091/smallA/insertComment', commentJSONString).then(res => {
        let tips = JSON.parse(res);
        comment_wrap.innerHTML = '';
        if (tips.code >= 200 && tips.code < 300) {
            searchAllComment();
        }
    })

});

//查询所有评论
function searchAllComment() {
    let searchTalkingAllCommentId = concreteTalkingid;
    let searchAllCommentJSON = {
        "did": searchTalkingAllCommentId,
    }
    let searchAllCommentJSONString = JSON.stringify(searchAllCommentJSON);
    let searchAllCommentData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectCommentByDid', searchAllCommentJSONString).then(res => {
        let tips = JSON.parse(res);
        console.log(tips);
        if (tips.code >= 200 && tips.code < 300) {
            for (let i = 0; i < tips.data.length; i++) {
                if (tips.data[i].prior == 0) {
                    let comment_box = document.createElement('div');
                    comment_box.className = 'comment_box';
                    // 用户名与头像
                    let comment_usernameAndHeadimg = document.createElement('div');
                    let comment_Headimg = document.createElement('img');
                    let comment_username = document.createElement('span');
                    comment_usernameAndHeadimg.className = 'comment_usernameAndHeadimg';
                    comment_Headimg.className = 'comment_Headimg';
                    comment_username.className = 'comment_username';
                    comment_box.appendChild(comment_usernameAndHeadimg);
                    comment_usernameAndHeadimg.appendChild(comment_Headimg);
                    comment_usernameAndHeadimg.appendChild(comment_username);
                    comment_Headimg.src = "http://" + tips.data[i].author.headImg;
                    comment_Headimg.setAttribute("data-id", tips.data[i].author.id);
                    comment_username.innerHTML = tips.data[i].author.username;
                    // 文本
                    let comment_textBox = document.createElement('div');
                    let commentText = document.createElement('p');
                    comment_textBox.className = 'comment_textBox';
                    commentText.className = 'commentText';
                    comment_box.appendChild(comment_textBox);
                    comment_textBox.appendChild(commentText);
                    commentText.innerHTML = tips.data[i].content;
                    // 删除与回复
                    let comment_deleteAndReply = document.createElement('div');
                    let comment_delete = document.createElement('button');
                    let comment_reply = document.createElement('button');
                    let comment_allReply = document.createElement('div');
                    comment_deleteAndReply.className = 'comment_deleteAndReply';
                    comment_delete.className = 'comment_delete';
                    comment_reply.className = 'comment_reply';
                    comment_allReply.className = 'comment_allReply';
                    comment_deleteAndReply.appendChild(comment_delete);
                    comment_deleteAndReply.appendChild(comment_reply);
                    comment_box.appendChild(comment_deleteAndReply);
                    comment_box.appendChild(comment_allReply);
                    comment_delete.innerHTML = '删除';
                    comment_reply.innerHTML = '回复';
                    comment_allReply.innerHTML = '查看此评论的更多回复';
                    comment_delete.setAttribute("data-commentId", tips.data[i].id);
                    comment_reply.setAttribute("data-commentId", tips.data[i].id);
                    comment_reply.setAttribute("data-userId", tips.data[i].author.id);

                    let comment_replyBox = document.createElement('div');
                    comment_replyBox.className = "comment_replyBox";

                    comment_box.appendChild(comment_replyBox);
                    // 把中盒子加到大盒子
                    comment_wrap.appendChild(comment_box);
                }
            }
        }
    });
};
searchAllComment();

//事件委托
comment_wrap.addEventListener("click", function(e) {
    // 删除评论和回复
    if (e.target.className == "comment_delete") {
        let delCommentAndReplyId = e.target.getAttribute("data-commentId");
        let delCommentAndReplyJSON = {
            "id": delCommentAndReplyId
        }
        let delCommentAndReplyJSONString = JSON.stringify(delCommentAndReplyJSON);
        let delCommentAndReplyData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteCommentById', delCommentAndReplyJSONString).then(res => {
            let tips = JSON.parse(res);
            console.log(tips);
            comment_wrap.innerHTML = '';
            if (tips.code >= 200 && tips.code < 300) {
                searchAllComment();
            }
        })
    }
    // 回复功能
    if (e.target.className == "comment_reply") {
        let reply = e.target;
        console.log(reply.parentNode.nextElementSibling);
        if (reply.parentNode.nextElementSibling.style.display == "block") {
            reply.parentNode.nextElementSibling.style.display = "none";
            reply.parentNode.parentNode.className = "comment_box";
            reply.parentNode.className = "comment_deleteAndReply";
        } else {
            reply.parentNode.nextElementSibling.style.display = "block";
            reply.parentNode.parentNode.className = "comment_boxChange";
            reply.parentNode.className = "comment_deleteAndReplyChange";
        }

    }
});