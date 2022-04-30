// 回到首页
topBar_allTalking.addEventListener("click", function() {
    window.location = "homepage.html";
});
// 修改个人信息部分
// 上传头像 
headImg_button.addEventListener("change", function() {
    let url = window.URL.createObjectURL(headImg_button.files[0]);
    let str = '<img src = "' + url + '" class="headImg">';
    headImg_box.innerHTML += str;
});
headImg_button.addEventListener("change", function() {
    // 传输头像数据
    let formdata = new FormData();
    formdata.append('username', 1744654182);
    formdata.append('headImg', headImg_button.files[0]);
    console.log(headImg_button.files[0]);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://175.178.51.126:8091/smallA/uploadHeadImg', true);
    xhr.send(formdata);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('上传成功');
            }
        }
    }
});