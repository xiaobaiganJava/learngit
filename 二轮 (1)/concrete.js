//动态详情
function particular(id) {
    pages.style.display = 'none'; 
    particular_ul.innerHTML = '';
    particular_ul.style.display = "block";
    goback.style.display = "block";
    activity_ul.style.display = "none";
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiary', {
        uid: getCookie("uid"), id: id
    }, function (res) {
        let data = JSON.parse(res);
        let li = document.createElement("li");
        let div = document.createElement('div');
        /*图片遍历 */
        for (let j = 0; j < data.data.images.length; j++) {
            let img = document.createElement("img");
            img.src = 'http://' + data.data.images[j].img;
            div.appendChild(img);
        }
        li.className = "activity-itemwrapper";
        li.id = data.data.id;
        li.innerHTML = '<div class="activity-detailbox style="height:auto;">'
            + '<div class="activity-item" style="height: 55%;">'
            + '<p><img src=' + 'http://' + data.data.author.headImg + ' alt="" id="a-headImg"' + 'onclick = "details(\'' + data.data.author.id + '\')">'
            + '<span id="a-name">' + data.data.author.username + '</span></p>'
            + '<p id="a-title">' + data.data.title + '</p>'
            + '<p id="a-content" style="text-overflow:clip; white-space: normal; overflow: auto; height:auto;" >' + data.data.content + '</p>'
            + '<p id="activity-bottom" style="display: inline-block;position: relative;"><span id="a-release-time">' + data.data.createTime + '</span>'
            + '<span id="a_response"' + 'onclick = "com(\'' + li.id + '\',\'' + 0 + '\')">查看动态评论</span>'
            + '<span id="particular"' + 'onclick = "particular(\'' + data.id + '\')" style="display:none">查看详情</span>'
            + '<span style="cursor: pointer;" id="a-likes-box" ' + 'onclick="detail_likes(\'' + li.id + '\',\'' + 0 + '\')"><i class="iconfont">&#xe707;</i>'
            + '<span id="a-likesnum">' + data.data.likesNum + '</span></span></p></div>'
            + '</div>'
        //显示初始状态
        let islike = data.data.isLike;
        //点赞盒子
        const a_like_box = li.childNodes[0].childNodes[0].childNodes[3].childNodes[3];
        //点赞图标
        const a_icon = a_like_box.childNodes[0];
        //点赞个数
        const a_likesum = a_like_box.childNodes[1];
        if (islike == false) {
            a_icon.style.color = 'black';
            a_likesum.innerHTML = data.data.likesNum
        } else if (islike == true) {
            a_icon.style.color = 'red';
            a_likesum.innerHTML = data.data.likesNum
        }
        //小li里添加动态图片
        div.id = 'detailimage'
        div.style.position = 'relative'
        li.appendChild(div);
        //添加小li
        particular_ul.appendChild(li);
        let ul = document.createElement('ul');
        ul.id = 'content_box';
        particular_ul.childNodes[0].appendChild(ul);
    })
}