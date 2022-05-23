//删除动态
function delete_a(a) {
    myAjax('POST', 'http://175.178.51.126:8091/smallA/deleteDiary', {
        id: a
    }, function (res) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary', {
            uid: getCookie("uid")
        }, function (res) {
            const needdelete = document.getElementById(a);
            needdelete.style.display = "none";
        })
    })
}