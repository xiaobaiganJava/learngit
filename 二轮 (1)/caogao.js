
/*点击头像查看用户所发的动态以及该用户的相册 */
function details(a, b) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block';
    activity_ul.innerHTML = '';
    let id = parseInt(a);
    if (b == undefined) {
        b = 1
    }
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId',
        { uid: getCookie("uid"), id: a, current: b, size: 4 },
        function (res) {
            let data = JSON.parse(res);
            const record = data.data;
            for (let k = 0; k < record.totalPage; k++) {
                //生成页码
                let page = document.createElement('li');
                page.innerHTML = k + 1;
                page.addEventListener('click', function () {
                    detailjump(this.innerHTML, a);
                });
                pages.appendChild(page);
            }
            for (let i = 0; i < record.list.length; i++) {
                let li = document.createElement("li");
                let div = document.createElement('div');
                /*图片遍历 */
                for (let j = 0; j < record.list[i].images.length; j++) {
                    let img = document.createElement("img");
                    img.src = 'http://' + record.list[i].images[j].img;
                    div.appendChild(img);
                }
                li.className = "activity-itemwrapper";
                li.id = record.list[i].id;
                li.setAttribute('page',data.data.current);
                const currentpage = li.getAttribute('page');
                if (record.list[i].author.id == getCookie("uid")) {
                    li.innerHTML = '<div class="activity-box">'
                        + '<div class="activity-item">'
                        + '<p><img src=' + 'http://' + record.list[i].author.headImg + ' alt="" id="a-headImg"' + 'onclick = "details(\'' + record.list[i].author.id + '\')">'
                        + '<span id="a-name">' + record.list[i].author.username + '</span></p>'
                        + '<p id="a-title">' + record.list[i].title + '</p>'
                        + '<p id="a-content">' + record.list[i].content + '</p>'
                        + '<p id="activity-bottom"><span id="a-release-time">' + record.list[i].createTime + '</span>'
                        + '<span id="a_response"' + 'onclick = "com(\'' + li.id + '\',\'' + i + '\')">查看动态评论</span>'
                        + '<span id="particular"' + 'onclick = "particular(\'' + li.id + '\')">查看详情</span>'
                        + '<span style="cursor: pointer;" id="a-likes-box" ' + 'onclick="onelikes(\'' + li.id + '\',\'' + i + '\',\'' + currentpage + '\',\'' + record.list[i].author.id + '\',\'' + 1 + '\')"><i class="iconfont">&#xe707;</i>'
                        + '<span id="a-likesnum">' + record.list[i].likesNum + '</span></span></p></div>'
                        + '<button id="delete-activity"' + 'onclick = "delete_a(\'' + li.id + '\')"' + '>删除此动态</button>';
                    + '</div>'
                } else {
                    li.innerHTML = '<div class="activity-box">'
                        + '<div class="activity-item">'
                        + '<p><img src=' + 'http://' + record.list[i].author.headImg + ' alt="" id="a-headImg"' + 'onclick = "details(\'' + record.list[i].author.id + '\')">'
                        + '<span id="a-name">' + record.list[i].author.username + '</span></p>'
                        + '<p id="a-title">' + record.list[i].title + '</p>'
                        + '<p id="a-content">' + record.list[i].content + '</p>'
                        + '<p id="activity-bottom"><span id="a-release-time">' + record.list[i].createTime + '</span>'
                        + '<span id="a_response"' + 'onclick = "com(\'' + li.id + '\',\'' + i + '\')">查看动态评论</span>'
                        + '<span id="particular"' + 'onclick = "particular(\'' + li.id + '\')">查看详情</span>'
                        + '<span style="cursor: pointer;" id="a-likes-box" ' + 'onclick="onelikes(\'' + li.id + '\',\'' + i + '\',\'' + currentpage + '\',\'' + record.list[i].author.id + '\',\'' + 1 + '\')"><i class="iconfont">&#xe707;</i>'
                        + '<span id="a-likesnum">' + record.list[i].likesNum + '</span></span></p></div>'
                        + '</div>'
                }
                let islike = data.data.list[i].isLike;
                const a_like_box = li.childNodes[0].childNodes[0].childNodes[3].childNodes[3];
                //点赞图标
                const a_icon = a_like_box.childNodes[0];
                //点赞个数
                const a_likesum = a_like_box.childNodes[1];
                //是否点赞
                if (islike == true) {
                    a_icon.style.color = 'red';
                    a_likesum.innerHTML = data.data.list[i].likesNum
                } else if (islike == false) {
                    islike = true;
                    a_icon.style.color = 'black';
                    a_likesum.innerHTML = data.data.list[i].likesNum
                }
                //小li里添加动态图片
                div.id = 'images';
                li.appendChild(div);
                //添加小li
                activity_ul.appendChild(li);
                let ul = document.createElement('ul');
                ul.id = 'content_box';
                activity_ul.childNodes[i].appendChild(ul);
            }
        })
    pictures_wrapper.style.display = 'block';
    pictures_wrapper.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
        uid: id
    }, function (res) {
        let data = JSON.parse(res);
        if (data.data != null) {
            for (let i = 0; i < data.data.length; i++) {
                const div = document.createElement('div');
                div.className = 'photo_wrapper'
                div.id = data.data[i].id;
                div.setAttribute('index', i);
                div.getAttribute('index')
                if (data.data[i].photos[0] != undefined) {
                    div.innerHTML = '<img src = http://' + data.data[i].photos[0].img + '>'
                } else {
                    div.innerHTML = ''
                }
                const ul = document.createElement('ul')
                ul.id = 'photos';
                div.appendChild(ul);
                //打开相册
                div.addEventListener('click', function () {
                    openother(id, this);
                })
                pictures_wrapper.appendChild(div);
            }
        }
    })
}
