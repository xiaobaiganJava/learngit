// 保存用户id的相册信息,这个用来存储拿到的用户相册信息，每次预载就重新赋值
var userPhotoId = "";
// 保存所选择的相册id，这个是所选相册的id，每次选择的时候给他重新赋值
var selectPhotoAlbumId = 0;
// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
};

updatePhotoAlbum();
// 打开新建相册
photoAlbum_createButton.addEventListener("click", function() {
    photoAlbum_box.style.display = 'none';
    photoAlbum_createBox.style.display = 'block';
});

// 新建相册回到相册目录
returnPhotoAlbum.addEventListener("click", function() {
    photoAlbum_box.style.display = 'block';
    photoAlbum_createBox.style.display = 'none';
});

// 从相册内部返回相册首页
photo_returnButton.addEventListener("click", function() {
    photo_box.style.display = 'none';
    photoAlbum_box.style.display = 'block';
});
// 打开添加图片
photo_createButton.addEventListener("click", function() {
    photo_box.style.display = 'none';
    photo_createBox.style.display = 'block';
});
//添加图片返回相册
photoReturnPhotoAlbum.addEventListener("click", function() {
    photo_createBox.style.display = 'none';
    photo_box.style.display = 'block';
});

// 新建相册
photoAlbum_button.addEventListener("click", function() {
    let photoAlbumName = photoAlbum_name.value;
    let photoAlbumIntroduction = photoAlbum_introduction.value;
    let createPhotoAlumJSON = {
        "uid": getCookie("id"),
        "name": photoAlbumName,
        "introduction": photoAlbumIntroduction
    }
    let createPhotoAlbumJSONString = JSON.stringify(createPhotoAlumJSON);
    let createPhotoAlbumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/insertAlbum', createPhotoAlbumJSONString).then(res => {
        let tips = JSON.parse(res);
        if (tips.code >= 200 && tips.code < 300) {
            photoAlbum_box.style.display = 'block';
            photoAlbum_createBox.style.display = 'none';
            photoAlbum_wrap.innerHTML = '';
            updatePhotoAlbum();
        } else {
            alert("创建失败");
        }
    })
});

//预载 获取全部相册
function updatePhotoAlbum() {
    let userId = getCookie("id");
    let searchPhotoAlbumJSON = {
        "uid": userId
    }
    let PhotoAlbumJSONString = JSON.stringify(searchPhotoAlbumJSON);
    let PhotoAlbumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectAlbumByUid', PhotoAlbumJSONString).then(res => {
        let tips = JSON.parse(res);
        // 预载好用户id返回的相册信息，然后更新全局变量userPhotoId,每次调用都可以更新
        userPhotoId = tips;
        if (tips.code >= 200 && tips.code < 300) {
            photoAlbum_wrap.innerHTML = '';
            for (var i = 0; i < tips.data.length; i++)
                photoAlbum_wrap.innerHTML = photoAlbum_wrap.innerHTML + `<div class="eachPhotoAlbum_container"><a href="#" class="deletePhotoAlbum" data-deleteid=${tips.data[i].id}></a><div class="eachPhotoAlbum" data-Albumid = ${tips.data[i].id}></div></div>`;
        }
    })
};


//事件委托
photoAlbum_wrap.addEventListener("click", function(e) {

    // 删除相册
    if (e.target.className == "deletePhotoAlbum") {
        let dePhotoAlbumId = e.target.getAttribute("data-deleteid");
        let dePhotoAlbumJSON = {
            "id": dePhotoAlbumId,
        }

        let dePhotoAlbumJSONString = JSON.stringify(dePhotoAlbumJSON);
        let dePhotoAlbumData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteAlbum', dePhotoAlbumJSONString).then(res => {
            let tips = JSON.parse(res);
            if (tips.code >= 200 && tips.code < 300) {
                updatePhotoAlbum();
            } else {
                console.log('删除失败');
            }
        })
    };
    //打开相册
    if (e.target.className = "eachPhotoAlbum") {
        photo_box.style.display = 'block';
        photoAlbum_box.style.display = 'none';
        selectPhotoAlbumId = e.target.getAttribute("data-Albumid");
        photo_wrap.innerHTML = '';
        for (let i = 0; i < userPhotoId.data.length; i++) {
            if (selectPhotoAlbumId == userPhotoId.data[i].id) {
                photo_Title.innerHTML = '';
                let selectPhotoAlbumName = userPhotoId.data[i].name;
                photo_Title.innerHTML = selectPhotoAlbumName;
                for (let j = 0; j < userPhotoId.data[i].photos.length; j++) {
                    photoAlbum_box.style.display = 'none';
                    photo_box.style.display = 'block';
                    photo_wrap.innerHTML = photo_wrap.innerHTML + ` <div class = "eachPhoto_box"><div class="photo"><img src="http://${userPhotoId.data[i].photos[j].img}" alt="" class="eachphoto">
                    <a href="#" class="deletePhoto" data-delphotoid=${userPhotoId.data[i].photos[j].img}></a></div>`
                }
            }
        }
    };

});

// 添加图片
inputPhoto_button.addEventListener("click", function() {
    inputPhoto.click();
});
inputPhoto.addEventListener("change", function() {
    let url = window.URL.createObjectURL(inputPhoto.files[0]);
    let str = '<img src = "' + url + '" class="eachphoto">';
    inputPhotoBox.innerHTML += str;

});
photo_button.addEventListener("click", function() {
    let formdata = new FormData();
    formdata.append('uid', getCookie("id"));
    formdata.append('aid', selectPhotoAlbumId);
    for (let i = 0; i < inputPhoto.files.length; i++)
        formdata.append('photo', inputPhoto.files[i]);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://175.178.51.126:8091/smallA/uploadPhoto', true);
    xhr.send(formdata);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('上传成功');
            }
        }
    }
});
photo_box.addEventListener("click", function(e) {
    // 删除照片
    if (e.target.className == "deletePhoto") {
        let deletePhotoId = e.target.getAttribute("data-delphotoid");
        let dePhotoJSON = {
            "id": deletePhotoId,
        }
        let dePhotoJSONString = JSON.stringify(dePhotoJSON);
        let dePhotoData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deletePhoto', dePhotoJSONString).then(res => {
            let tips = JSON.parse(res);
            console.log(tips);
            if (tips.code >= 200 && tips.code < 300) {
                console.log('删除成功');
            }
        })
    }
});