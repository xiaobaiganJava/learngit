const nav_remark = document.getElementById('nav-remark');
const activity_ul = document.querySelector('.activity-ul');
const nav_hot = document.getElementById('nav-hot');
const nav_picture = document.getElementById('pictures');
const nav_write = document.getElementById('nav-write');
const search = document.getElementById('search');
const search_btn = document.getElementById('search-btn');
const headbox = document.getElementById('headbox');

const pictures_wrapper = document.getElementById('picture-wrapper')
const particular_ul = document.querySelector(".particular-ul")

//头部区
const nav_headImg = document.getElementById('nav-headImg');
const nav_name = document.getElementById('nav-name');

const pages = document.getElementById('pages');
//打开动态
nav_remark.addEventListener("click", function () {
    window.location.href = "activity.html"
})

//打开热门界面
nav_hot.addEventListener('click', function () {
    window.location.href = "hot.html";
})

//打开发布界面
nav_write.addEventListener("click", function () {
    window.location.href = "write.html";
})

//打开相册界面
nav_picture.addEventListener("click", function () {
    window.location.href = "album.html"
})

//打开个人
headbox.addEventListener("click", function () {
    window.location.href = "userdetail.html"
})

//搜索
search_btn.addEventListener("click", function () {
    window.location.href = "search.html";
    setCookie("search_value", search.value);
})

nav_headImg.src = "http://" + getCookie("headImg");
nav_name.innerHTML = getCookie("name");

if (getCookie("a")) {
    details(getCookie("a"), 1);
}

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
                li.setAttribute('page', data.data.current);
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
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
        uid: getCookie("a")
    }, function (res) {
        let data = JSON.parse(res);
        pictures_wrapper.innerHTML = '';
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

const ensure = document.querySelector('.ensure');
const album_title = document.getElementById('album-title');
const album_intro = document.getElementById('album-intro');
const makeonealbum = document.getElementById('makeonealbum');
const add_ul = pictures_wrapper.childNodes[0].childNodes[0];
const album_box = document.querySelector('.album-box');
const addimg = document.getElementById('addimg');
const add_file = document.getElementById('add-file');
const photo_box = document.getElementById('photo-box');
const album_upload = document.getElementById('album-upload');

//打开别人的相册
function openother(uid, who) {
    const index = who.getAttribute('index')
    album_box.style.display = 'block';
    addimg.style.display = 'none';
    album_upload.style.display = 'none';
    photo_box.innerHTML = '';
    //显示原有的图片
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
        uid: uid
    }, function (res) {
        let data = JSON.parse(res);
        for (let i = 0; i < data.data[index].photos.length; i++) {
            let img = document.createElement('img');
            let li = document.createElement('li');
            li.id = data.data[index].photos[i].id;
            img.src = 'http://' + data.data[index].photos[i].img;
            li.innerHTML = ''
            li.appendChild(img);
            photo_box.appendChild(li);
        }
    })
}
//关闭相框
function closethis() {
    album_box.style.display = 'none';
    add_file.removeEventListener('change', addfile);
    add_file.value = '';
}

//点头像进入用户页面跳转函数
function detailjump(a, whoid) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block'
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId',
        {
            uid: getCookie("uid"), id: whoid, current: a, size: 4
        }, function (res) {
            details(whoid, a)
        }
    )
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
