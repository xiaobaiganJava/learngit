deleteTalking_button.addEventListener("click", function() {
    let deleteTalkingId = deleteTalking_id.value;
    let deleteTalkingJSON = {
        "id": deleteTalkingId
    };
    let deleteTalkingJSONString = JSON.stringify(deleteTalkingJSON);
    let deleteData = getJSON('POST', 'http://175.178.51.126:8091/smallA/deleteDiary', deleteTalkingJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code === 200) {
            alert('删除成功');
        } else {
            alert('删除失败');
        }
    });
});

// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
}