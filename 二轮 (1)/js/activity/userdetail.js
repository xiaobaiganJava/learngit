const nav_remark = document.getElementById('nav-remark');
const activity_ul = document.querySelector('.activity-ul');
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

const userid1 = document.getElementById('userid1');
const useremail1 = document.getElementById('useremail1');
const username1 = document.getElementById('username1')
const userage1 = document.getElementById('userage1');
const userphone1 = document.getElementById('userphone1');
const usersex1 = document.getElementById('usersex1');
const user = document.querySelector('.user');


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

//搜索
search_btn.addEventListener("click", function () {
    window.location.href = "search.html";
    setCookie("search_value", search.value);
})


//打开个人信息框
headbox.addEventListener("click", openuser)


//退出登录
const exit = document.getElementById('exit');

exit.addEventListener('click', function () {
    window.location.href = "http://127.0.0.1:5500/index.html";
    removeCookie("name");
    removeCookie("pas");
    setCookie("remove",1);
})




//点击后打开详细信息框
details(getCookie("uid"));
user.style.display = 'block';
nav_headImg.src = "http://" + getCookie("headImg");
nav_name.innerHTML = getCookie("name");
userImg.src = "http://" + getCookie("headImg");

function openuser() {
    user.style.display = 'block';
}
//关闭
function closeuser() {
    user.style.display = 'none';
}



//修改登录后的个人信息
const change_message = document.getElementById('change-message');
const finish_change = document.getElementById('finish-change');
change_message.addEventListener('click', function () {
    finish_change.style.display = 'block';
    ch(useremail1);
    ch(username1);
    ch(userage1);
    ch(userphone1);
    ch(usersex1);
})

finish_change.addEventListener('click', function () {
    finish_change.style.display = 'none';
    fi(useremail1);
    fi(username1);
    fi(userage1);
    fi(userphone1);
    fi(usersex1);
    myAjax('POST', 'http://175.178.51.126:8091/smallA/updateUserData', {
        id: parseInt(userid1.value), username: username1.value, email: useremail1.value, phone: userphone1.value,
        sex: usersex1.value, age: parseInt(userage1.value)
    }, function (res) {
        let data = JSON.parse(res);
        //改变用户名 即时更新
        nav_name.innerHTML = data.data.username
        removeCookie("name");
        setCookie("name", data.data.username, 7)
        name_name.value = data.data.username;
        removeCookie("email");
        setCookie("email", data.data.email, 7)
        email_email.value = data.data.email;
        alert_content.innerHTML = '修改成功';
        alert_box.style.display = 'block';
        alertwrapper.style.display = 'block';
    })
})
//修改时的样式
function ch(a) {
    a.readOnly = ''
    a.className = 'input-change';
}

//完成修改后的样式
function fi(a) {
    a.readOnly = 'readonly'
    a.className = '';
}

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
            }
        }
    })
    if (getCookie("name") != "undefined" || getCookie("useremail") != "undeifinde") {
        myAjax('POST', "http://175.178.51.126:8091/smallA/login", {
            username: getCookie("name"), password: getCookie("pas")
        }, function (res) {
            let param = JSON.parse(res);
            userid1.value = param.data.id;
            useremail1.value = param.data.email;
            username1.value = param.data.username;
            userage1.value = param.data.age;
            userphone1.value = param.data.phone;
            usersex1.value = param.data.sex;
        })
    }

}



/*上传头像*/
const uimg_btn = document.getElementById('uimg-btn');
uimg_btn.addEventListener('click', function () {
    let uimgupload = document.getElementById('uimgupload').files[0];

    if (typeof (uimgupload) == 'undefined' || uimgupload.size <= 0) {
        alert_content.innerHTML = "请先上传图片";
        alert_box.style.display = 'block';
        alertwrapper.style.display = 'block';
    }
    let formFile = new FormData();
    formFile.append('username', username1.value)
    formFile.append('headImg', uimgupload);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://175.178.51.126:8091/smallA/uploadHeadImg');
    xhr.send(formFile);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert_content.innerHTML = '上传成功';
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';
                let res = JSON.parse(xhr.responseText);
                userImg.src = "http://" + res.data;
                nav_headImg.src = "http://" + res.data;
            }
        }
    }
})

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

