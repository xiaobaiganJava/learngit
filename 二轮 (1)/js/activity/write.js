//导航栏
const nav_remark = document.getElementById('nav-remark');
const activity_ul = document.querySelector('.activity-ul');
const nav_hot = document.getElementById('nav-hot');
const nav_picture = document.getElementById('pictures');
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

//打开相册
nav_picture.addEventListener("click",function(){
    window.location.href = "album.html"
})

//打开个人
headbox.addEventListener("click",function(){
    window.location.href = "userdetail.html"
})

//搜索
search_btn.addEventListener("click",function(){
    window.location.href = "search.html";
    setCookie("search_value",search.value);
})

nav_headImg.src = "http://"+getCookie("headImg");
nav_name.innerHTML = getCookie("name");



let formdata = new FormData();
let formfile1 = new FormData();
//新增动态窗口
const activity_write = document.getElementById('activity-write')
const activity_writeitemwrapper = document.getElementById('activity-writeitemwrapper')
const activity_writeitem = document.getElementById('activity-writeitem')
const nav_write = document.getElementById('nav-write')
const a_writetitle = document.getElementById('a-writetitle')
const a_writecontent = document.getElementById('a-writecontent')
const a_upload = document.getElementById('a_upload');
const a_uploadbtn = document.getElementById('a_uploadbtn');
const inputbox = document.getElementById('inputbox');
const w_image = document.getElementById('w_image');
const issuance_btn = document.getElementById('issuance-btn');



/*发布添加图片 */
inputbox.addEventListener('click', function (e) {
    //将每一次赋值前都清空，防止不能连续上传一样的图片
    /*     issuance_btn.removeEventListener('click', upwrite) */
    e.target.value = '';
    a_upload.addEventListener('change', upload)

    function upload(e) {
        let curfiles = this.files;
        for (let i = 0; i < curfiles.length; i++) {
            formdata.append('file', curfiles[i]);
            formfile1.append('img', curfiles[i]);
            readerfile(curfiles[i], w_image)
        }
        a_upload.removeEventListener('change', upload);
    }
})

//给发布监听事件
issuance_btn.addEventListener('click', upwrite)

/*上传 */
function upwrite() {
    if (formfile1 == undefined) {
        formfile1.append('img', '');
    }
    formfile1.append('uid', getCookie("uid"));
    formfile1.append('title', a_writetitle.value);
    formfile1.append('content', a_writecontent.value);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://175.178.51.126:8091/smallA/insertDiary');
    xhr.send(formfile1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert_content.innerHTML = '上传成功';
                alert_box.style.display = 'block';
                alertwrapper.style.display = 'block';

                openactivity();
            }
        }
    }
    issuance_btn.removeEventListener('click', upwrite)
    issuance_btn.addEventListener('click', upwrite)
    
}

/* 回显图片 */
function readerfile(file, a) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const img = document.createElement('img');
        img.src = reader.result;
        a.appendChild(img);
    }
}