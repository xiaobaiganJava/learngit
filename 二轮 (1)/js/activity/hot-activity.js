const nav_remark = document.getElementById('nav-remark');
const activity_ul = document.querySelector('.hot-ul');
const nav_hot = document.getElementById('nav-hot');
const nav_picture = document.getElementById('pictures');
const nav_write = document.getElementById('nav-write');
const search = document.getElementById('search');
const search_btn = document.getElementById('search-btn');
const headbox = document.getElementById('headbox');
//头部区
const nav_headImg = document.getElementById('nav-headImg');
const nav_name = document.getElementById('nav-name');

const particular_ul = document.querySelector(".particular-ul")

//热门页面跳转函数
function hotjump(a) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block'
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary',
        {
            uid: getCookie("uid"), current: a + 1, size: 4
        }, function (res) {
            openhot(a);
        }
    )
}

//打开动态界面
nav_remark.addEventListener('click', function () {
    window.location.href = "activity.html";
})

//打开发布界面
nav_write.addEventListener("click", function () {
    window.location.href = "write.html";
})

//打开相册
nav_picture.addEventListener("click", function () {
    window.location.href = "album.html"
})
//打开个人
headbox.addEventListener("click", function () {
    window.location.href = "userdetail.html"
})
//搜索
search_btn.addEventListener("click",function(){
    window.location.href = "search.html";
    setCookie("search_value",search.value);
})



nav_headImg.src = "http://" + getCookie("headImg");
nav_name.innerHTML = getCookie("name");
openhot(1);
function openhot(a) {
    pages.innerHTML = ''
    pages.style.display = 'block';
    pages.style.display = 'flex';
    activity_ul.style.display = 'block';
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary', {
        uid: getCookie("uid"), current: a, size: 4
    }, function (res) {
        //热门生成动态框
        let data = JSON.parse(res);
        const record = data.data
        for (let k = 0; k < record.totalPage; k++) {
            //生成页码
            let page = document.createElement('li');
            page.innerHTML = k + 1;
            page.addEventListener('click', function () {
                hotjump(this.innerHTML);
                this.style.backgroundColor = 'pink'
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
            if (record.list[i].author.id == getCookie("uid")) {
                li.innerHTML = '<div class="activity-box">'
                    + '<div class="activity-item">'
                    + '<p><img src=' + 'http://' + record.list[i].author.headImg + ' alt="" id="a-headImg"' + 'onclick = "details(\'' + record.list[i].author.id + '\')">'
                    + '<span id="a-name">' + record.list[i].author.username + '</span></p>'
                    + '<p id="a-title">' + record.list[i].title + '</p>'
                    + '<p id="a-content">' + record.list[i].content + '</p>'
                    + '<p id="activity-bottom"><span id="a-release-time">' + record.list[i].createTime + '</span>'
                    + '<span id="a_response"' + 'onclick = "com(\'' + li.id + '\',\'' + i + '\')">查看动态评论</span>'
                    + '<span id="particular"' + 'onclick = "particular(\'' + li.id + '\',\'' + i + '\')">查看详情</span>'
                    + '<span style="cursor: pointer;" id="a-likes-box" ' + 'onclick="hot_likes(\'' + li.id + '\',\'' + i + '\',\'' + a + '\')"><i class="iconfont">&#xe707;</i>'
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
                    + '<span id="particular"' + 'onclick = "particular(\'' + li.id + '\',\'' + i + '\')">查看详情</span>'
                    + '<span style="cursor: pointer;" id="a-likes-box" ' + 'onclick="hot_likes(\'' + li.id + '\',\'' + i + '\',\'' + a + '\')"><i class="iconfont">&#xe707;</i>'
                    + '<span id="a-likesnum">' + record.list[i].likesNum + '</span></span></p></div>'
                    + '</div>'
            }
            //显示初始状态
            let islike = record.list[i].isLike;
            //点赞盒子
            const a_like_box = li.childNodes[0].childNodes[0].childNodes[3].childNodes[3];
            //点赞图标
            const a_icon = a_like_box.childNodes[0];
            //点赞个数
            const a_likesum = a_like_box.childNodes[1];
            if (islike == false) {
                a_icon.style.color = 'black';
                a_likesum.innerHTML = record.list[i].likesNum
            } else if (islike == true) {
                a_icon.style.color = 'red';
                a_likesum.innerHTML = record.list[i].likesNum
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
}
//详情返回
const goback = document.getElementById("goback");
goback.addEventListener("click", function () {
    activity_ul.style.display = "block";
    particular_ul.style.display = "none";
    particular_ul.innerHTML = "";
    pages.style.display = "block";
    pages.style.display = "flex";
    goback.style.display = "none"
})

