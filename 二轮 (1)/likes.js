//动态点赞
function likes(id, i,page) {
    //先获得数据
    
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectAllDiary',
        {
            uid: getCookie("uid"),current:page,size:4
        }, function (res) {
            let data = JSON.parse(res);
            let islike = data.data.list[i].isLike;
            const lis = activity_ul.querySelectorAll('li');
            //点赞盒子
            const a_like_box = lis[i].childNodes[0].childNodes[0].childNodes[3].childNodes[3];
            //点赞图标
            const a_icon = a_like_box.childNodes[0];
            //点赞个数
            const a_likesum = a_like_box.childNodes[1];
            //是否点赞
            if (islike == true) {
                islike = false;
                a_icon.style.color = 'black';
                a_likesum.innerHTML = data.data.list[i].likesNum - 1;
            } else if (islike == false) {
                islike = true;
                a_icon.style.color = 'red';
                a_likesum.innerHTML = data.data.list[i].likesNum + 1
            }
            //在投入点赞接口
            myAjax('POST', 'http://175.178.51.126:8091/smallA/likeDiary', {
                uid: getCookie("uid"), id: JSON.parse(id), ifLike: islike
            }, function (res) { 
            })
        }
    )
}

//热门点赞
function hot_likes(id, i,page) {
    //先获得数据
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectHotDiary',
        {
            uid: getCookie("uid"),current:page,size:4
        }, function (res) {
            let data = JSON.parse(res);
            let islike = data.data.list[i].isLike;
            const lis = activity_ul.querySelectorAll('li');
            //点赞盒子
            const a_like_box = lis[i].childNodes[0].childNodes[0].childNodes[3].childNodes[3];
            //点赞图标
            const a_icon = a_like_box.childNodes[0];
            //点赞个数
            const a_likesum = a_like_box.childNodes[1];
            //是否点赞
            if (islike == true) {
                islike = false;
                a_icon.style.color = 'black';
                a_likesum.innerHTML = data.data.list[i].likesNum 
            } else if (islike == false) {
                islike = true;
                a_icon.style.color = 'red';
                a_likesum.innerHTML = data.data.list[i].likesNum 
            }
            //在投入点赞接口
            myAjax('POST', 'http://175.178.51.126:8091/smallA/likeDiary', {
                uid: getCookie("uid"), id: JSON.parse(id), ifLike: islike
            }, function (res) {
                openhot(page);
            })
        }
    )
}
//单一用户点赞与模糊查询点赞
function onelikes(id, i, page, whoid, judge) {
    //judge为1是点击头像进入的 为2是模糊查询的
    if (judge == 1) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId',
            {
                uid: parseInt(getCookie("uid")), id: whoid,current:page,size:4
            }, function (res) {

                let data = JSON.parse(res);
                let islike = data.data.list[i].isLike;
                const lis = activity_ul.querySelectorAll('li');
                //点赞盒子
                const a_like_box = lis[i].childNodes[0].childNodes[0].childNodes[3].childNodes[3];
                //点赞图标
                const a_icon = a_like_box.childNodes[0];
                //点赞个数
                const a_likesum = a_like_box.childNodes[1];
                //是否点赞
                if (islike == true) {
                    islike = false;
                    a_icon.style.color = 'black';
                    a_likesum.innerHTML = data.data.list[i].likesNum - 1
                } else if (islike == false) {
                    islike = true;
                    a_icon.style.color = 'red';
                    a_likesum.innerHTML = data.data.list[i].likesNum + 1
                }
                //在投入点赞接口
                myAjax('POST', 'http://175.178.51.126:8091/smallA/likeDiary', {
                    uid: getCookie("uid"), id: JSON.parse(id), ifLike: islike
                }, function (res) {

                })
            })
    } else if (judge == 2) {
        myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiary',
        
            {
                uid: parseInt(getCookie("uid")), key: search.value,current:page,size:4
            }, function (res) {

                let data = JSON.parse(res);
                let islike = data.data.list[i].isLike;
                const lis = activity_ul.querySelectorAll('li');
                //点赞盒子
                const a_like_box = lis[i].childNodes[0].childNodes[0].childNodes[3].childNodes[3];
                //点赞图标
                const a_icon = a_like_box.childNodes[0];
                //点赞个数
                const a_likesum = a_like_box.childNodes[1];
                //是否点赞
                if (islike == true) {
                    islike = false;
                    a_icon.style.color = 'black';
                    a_likesum.innerHTML = data.data.list[i].likesNum - 1
                } else if (islike == false) {
                    islike = true;
                    a_icon.style.color = 'red';
                    a_likesum.innerHTML = data.data.list[i].likesNum + 1
                }
                //在投入点赞接口
                myAjax('POST', 'http://175.178.51.126:8091/smallA/likeDiary', {
                    uid: getCookie("uid"), id: JSON.parse(id), ifLike: islike
                }, function (res) {

                })
            })
    }

}

//详情点赞
function detail_likes(id, i) {
    //先获得数据
    myAjax('POST', 'http://175.178.51.126:8091/smallA/selectDiary',
        {
            uid: getCookie("uid"), id: id
        }, function (res) {
            let data = JSON.parse(res);
            let islike = data.data.isLike;
            const lis = activity_ul.querySelectorAll('li');
            //点赞盒子
            const a_like_box = lis[i].childNodes[0].childNodes[0].childNodes[3].childNodes[3];
            //点赞图标
            const a_icon = a_like_box.childNodes[0];
            //点赞个数
            const a_likesum = a_like_box.childNodes[1];
            //是否点赞
            if (islike == true) {
                islike = false;
                a_icon.style.color = 'black';
                a_likesum.innerHTML = data.data.likesNum - 1
            } else if (islike == false) {
                islike = true;
                a_icon.style.color = 'red';
                a_likesum.innerHTML = data.data.likesNum + 1
            }
            //在投入点赞接口
            myAjax('POST', 'http://175.178.51.126:8091/smallA/likeDiary', {
                uid: getCookie("uid"), id: JSON.parse(id), ifLike: islike
            }, function (res) {

            })
        }
    )
}