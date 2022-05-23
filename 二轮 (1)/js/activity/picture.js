//导航栏
const nav_remark = document.getElementById('nav-remark');
const activity_ul = document.querySelector('.hot-ul');
const nav_hot = document.getElementById('nav-hot');
const nav_picture = document.getElementById('pictures');
const nav_write= document.getElementById('nav-write');
const search = document.getElementById('search');
const search_btn = document.getElementById('search-btn');
const headbox = document.getElementById('headbox');

//头部区
const nav_headImg =document.getElementById('nav-headImg');
const nav_name = document.getElementById('nav-name');


nav_remark.addEventListener("click",function(){
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

//打开个人
headbox.addEventListener("click",function(){
    window.location.href = "userdetail.html";
})
//搜索
search_btn.addEventListener("click",function(){
    window.location.href = "search.html";
    setCookie("search_value",search.value);
})

nav_headImg.src = "http://"+getCookie("headImg");
nav_name.innerHTML = getCookie("name");



//新建相册 点击一次新建一个
let imgfile = new FormData();
const pictures_wrapper = document.getElementById('picture-wrapper')
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
//相册
openalbum();

//相册区
/*打开相册区 */
function openalbum() {
    pictures_wrapper.style.display = 'block';
    pictures_wrapper.innerHTML = '<div class="add" id="add">'
        + '<img src="/img/a.png" alt="" id="add-ul">'
        + '</div>';
    const add_ul = pictures_wrapper.childNodes[0].childNodes[0];
    add_ul.addEventListener('click', newalbum)
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
        uid: getCookie("uid")
    }, function (res) {
        let data = JSON.parse(res);
        for (let i = 0; i < data.data.length; i++) {
            const div = document.createElement('div');
            div.className = 'photo_wrapper'
            div.id = data.data[i].id;
            div.setAttribute('index', i);
            div.getAttribute('index')
            if (data.data[i].photos[0] != undefined) {
                div.innerHTML = '<i class="iconfont" onclick="deletealbum(\'' + div.id + '\')">&#xe600;</i>'
                    + '<img src = http://' + data.data[i].photos[0].img + '>'
            } else {
                div.innerHTML = '<i class="iconfont" onclick="deletealbum(\'' + div.id + '\')">&#xe600;</i>'
            }
            const ul = document.createElement('ul')
            ul.id = 'photos';
            div.appendChild(ul);
            //打开相册
            div.addEventListener('click', openthis)
            pictures_wrapper.appendChild(div)
        }
    })
}

/*新建相册 */
function newalbum() {
    pictures_wrapper.style.display = 'block';
    ensure.style.display = 'block';
    makeonealbum.addEventListener('click', newalbumsure)
    this.removeEventListener('click', newalbum);
    this.addEventListener('click', newalbum);
}

/*确认新建相册 */
function newalbumsure() {
    const ul = document.createElement('ul')
    ul.id = 'photos';
    pictures_wrapper.appendChild(ul);
    myAjax('POST', 'http://175.178.51.126:8091/smallA/insertAlbum', {
        uid: getCookie("uid"), name: album_title.value, introduction: album_intro.value
    }, function (res) {
        openalbum();
    })
    ensure.style.display = 'none';
    album_intro.value = '';
    album_title.value = '';
    makeonealbum.removeEventListener('click', newalbum)
    makeonealbum.addEventListener('click', newalbum)

}

//相册内部
/*打开自己相册以及上传图片*/
//a为打开相册的id
function openthis() {
    const id = this.id
    const index = this.getAttribute('index')
    addimg.style.display = 'block';
    album_upload.style.display = 'block';
    album_box.style.display = 'block';
    photo_box.innerHTML = '';
    //显示原有的图片
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
        uid: getCookie("uid")
    }, function (res) {
        let data = JSON.parse(res);
        for (let i = 0; i < data.data[index].photos.length; i++) {
            let img = document.createElement('img');
            let li = document.createElement('li');
            li.id = data.data[index].photos[i].id;
            img.src = 'http://' + data.data[index].photos[i].img;
            li.innerHTML = '<i class="iconfont" onclick="deletephoto(\'' + index + '\',\'' + li.id + '\')">&#xe600;</i>'
            li.appendChild(img);
            photo_box.appendChild(li);
        }
    })
    //为某一个相册添加图片
    add_file.addEventListener('click', addfile)
    //确定上传
    album_upload.addEventListener('click', albumupload)

    function albumupload() {
        if (add_file.value == '') {
            alert_content.innerHTML = '请选择图片进行上传';
            alert_box.style.display = 'block';
            alert_content.style.display = 'block';
        } else {
            
            imgfile.append('uid', getCookie("uid"));
            imgfile.append('aid', id);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://175.178.51.126:8091/smallA/uploadPhoto');
            xhr.send(imgfile);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
                            uid: getCookie("uid")
                        }, function (res) {
                            let data = JSON.parse(res);
                            photo_box.innerHTML = ''
                            for (let i = 0; i < data.data[index].photos.length; i++) {
                                let img = document.createElement('img');
                                let li = document.createElement('li');
                                li.id = data.data[index].photos[i].id;
                                img.src = 'http://' + data.data[index].photos[i].img;
                                li.innerHTML = '<i class="iconfont" onclick="deletephoto(\'' + index + '\',\'' + li.id + '\')">&#xe600;</i>'
                                li.appendChild(img);
                                photo_box.appendChild(li);
                            }
                        })
                    }
                }
            }
            add_file.value = ''
            album_upload.removeEventListener('click', albumupload)
            album_upload.addEventListener('click', albumupload)
        }

    }
}

/*关闭相册 */
function closethis() {
    album_box.style.display = 'none';
    add_file.removeEventListener('change', addfile);
    add_file.value = '';
}

//添加一个图片
function addfile(e) {
    e.target.value = '';
    add_file.addEventListener('change', imgload)
    function imgload(e) {
        let curfiles = this.files;
        for (let i = 0; i < curfiles.length; i++) {
            let li = document.createElement('li');
            li.id = 'index' + [i]
            const a = li.id;
            li.innerHTML = '<i class="iconfont" onclick="outthis(\'' + a + '\')">&#xe600;</i>'
            photo_box.appendChild(li);

            readerfile(curfiles[i], li)
            imgfile.append('photo', curfiles[i]);
        }
        add_file.removeEventListener('change', imgload);
    }
}

//删除添加的图片
function outthis(a) {
    const deleteboy = document.getElementById(a);
    deleteboy.parentNode.removeChild(deleteboy);
}


/* 删除图片 */
function deletephoto(parentindex, id) {
    const index = parentindex;
    myAjax('POST', 'http://175.178.51.126:8091/smallA/deletePhoto', {
        id: id
    }, function (res) {
        photo_box.innerHTML = '';
        //显示原有的图片
        myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', {
            uid: getCookie("uid")
        }, function (res) {
            let data = JSON.parse(res);
            for (let i = 0; i < data.data[index].photos.length; i++) {
                let img = document.createElement('img');
                let li = document.createElement('li');
                li.id = data.data[index].photos[i].id;
                img.src = 'http://' + data.data[index].photos[i].img;
                li.innerHTML = '<i class="iconfont" onclick="deletephoto(\'' + index + '\',\'' + li.id + '\')">&#xe600;</i>'
                li.appendChild(img);
                photo_box.appendChild(li);
            }
        })
    })
}

/* 删除相册 */
function deletealbum(a) {
    myAjax('POST', 'http://175.178.51.126:8091/smallA/deleteAlbum', {
        id: a
    }, function () {
        openalbum();
    })
}

/*关闭建立相册的框 */
function closesure() {
    ensure.style.display = 'none';
    album_intro.value = '';
    album_title.value = '';
}

function readerfile(file, a) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const img = document.createElement('img');
        img.src = reader.result;
        a.appendChild(img);
    }
}