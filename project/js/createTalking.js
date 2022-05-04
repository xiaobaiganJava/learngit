// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
}
// 上传动态图片 
inputimg_button.addEventListener("click", function() {
    createTalking_imgButton.click();
})
createTalking_imgButton.addEventListener("change", function() {
    let url = window.URL.createObjectURL(createTalking_imgButton.files[0]);
    let str = '<img src = "' + url + '" class="createTalking_img">';
    talkingImg_box.innerHTML += str;
});
// 把新建动态的信息传到eolink
createTalking_button.addEventListener("click", function() {
    let formdata = new FormData();
    formdata.append('uid', getCookie("id"));
    formdata.append('title', createTalking_title.value);
    formdata.append('content', createTalking_content.value);
    formdata.append('img', createTalking_imgButton.files[0]);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://175.178.51.126:8091/smallA/insertDiary', true);
    xhr.send(formdata);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('发布成功');
            } else {
                alert('发布失败，请检查发布内容的格式');
            }
        }
    }
});