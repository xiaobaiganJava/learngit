const pages = document.getElementById('pages');
//动态页面跳转函数
function jump(a) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block'
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAllDiary',
        {
            uid: getCookie("uid"), current: a + 1, size: 4
        }, function (res) {
            a_item(res, 0);
        }
    )
}

//点头像进入用户页面跳转函数
function detailjump(a,whoid) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block'
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId',
        {
            uid: getCookie("uid"), id:whoid,current: a, size: 4
        }, function (res) {
            details(whoid,a)
        }
    )
}

//搜索跳转函数
function searchjump(a) {
    pages.innerHTML = '';
    activity_ul.style.display = 'block'
    activity_ul.innerHTML = '';
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiary',
        {
            uid: getCookie("uid"), key:search.value,current: a, size: 4
        }, function (res) {
            searchsth(a)
        }
    )
}

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