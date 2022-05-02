topBar_searchImg.addEventListener("click", function() {
    let searchContent = topBar_search.value;
    let reg = /^[0-9]{1,4}$/;
    if (reg.test(topBar_search.value)) {
        var searchContentJSON = {
            uid: getCookie("id"),
            id: searchContent,
            key: ''
        }
        let searchContentJSONString = JSON.stringify(searchContentJSON);
        let searchContentJSONData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiary', searchContentJSONString).then(res => {
            let tips = JSON.parse(res);
            if (tips.code >= 200 && tips.code < 300) {
                forum_container.innerHTML = ''; //页面清空
                if (tips.data.images.length != 0) {
                    for (let j = 0; j < tips.data.images.length; j++) {
                        forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
                        <div class="forum_usernameAndHeadImg">
                            <img src="${"http://"+tips.data.author.headImg}" alt="" class="userHeadImg" data-id = '${tips.data.author.id}'>
                            <span class="Username">${tips.data.author.username}</span>
                        </div>
                        <div class="forum_title">
                            <span class="title">${tips.data.title}</span>
                        </div>
                        <div class="forum_text">
                            <p class="text">${tips.data.content}</p>
                        </div>
                        <div class="forum_Img">
                        <img src="${"http://"+tips.data.images[j].img}" alt="" class="forum_talkingImg">
                        </div>
                        <div class="forum_timeAndLikeNum">
                            <div class="time">${tips.data.createTime}</div>
                            <img src="../image/${tips.data.isLike}like.png" alt="" class="likeImg" data-did = ${tips.data.id} data-ifLike=${tips.data.isLike}></img>
                            <div class="likeNum">${tips.data.likesNum}</div>
                        </div>
                    </div>`
                    }
                } else {
                    forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
            <div class="forum_usernameAndHeadImg">
                <img src="${"http://"+tips.data.author.headImg}" alt="" class="userHeadImg" data-id = ${tips.data.author.id}>
                <span class="Username">${tips.data.author.username}</span>
            </div>
            <div class="forum_title">
                <span class="title">${tips.data.title}</span>
            </div>
            <div class="forum_text">
                <p class="text">${tips.data.content}</p>
            </div>

            <div class="forum_timeAndLikeNum">
                <div class="time">${tips.data.createTime}</div>
                <img src="../image/${tips.data.isLike}like.png" alt="" class="likeImg" data-did = ${tips.data.id} data-ifLike = ${tips.data.isLike}></img>
                <div class="likeNum">${tips.data.likesNum}</div>
            </div>
        </div>`
                }

            }
        })
    } else {
        let searchContentJSON = {
            uid: getCookie("id"),
            id: '',
            key: searchContent
        }
        let searchContentJSONString = JSON.stringify(searchContentJSON);
        let searchContentJSONData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiary', searchContentJSONString).then(res => {
            let tips = JSON.parse(res);
            if (tips.code >= 200 && tips.code < 300) {
                forum_container.innerHTML = ''; //页面清空
                for (let i = 0; i < tips.data.length; i++) {
                    if (tips.data[i].images.length != 0) {
                        for (let j = 0; j < tips.data[i].images.length; j++) {
                            forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
                        <div class="forum_usernameAndHeadImg">
                            <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = '${tips.data[i].author.id}'>
                            <span class="Username">${tips.data[i].author.username}</span>
                        </div>
                        <div class="forum_title">
                            <span class="title">${tips.data[i].title}</span>
                        </div>
                        <div class="forum_text">
                            <p class="text">${tips.data[i].content}</p>
                        </div>
                        <div class="forum_Img">
                        <img src="${"http://"+tips.data[i].images[j].img}" alt="" class="forum_talkingImg">
                        </div>
                        <div class="forum_timeAndLikeNum">
                            <div class="time">${tips.data[i].createTime}</div>
                            <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike=${tips.data[i].isLike}></img>
                            <div class="likeNum">${tips.data[i].likesNum}</div>
                        </div>
                    </div>`
                        }
                    } else {
                        forum_container.innerHTML = forum_container.innerHTML + `<div class="forum_content">
            <div class="forum_usernameAndHeadImg">
                <img src="${"http://"+tips.data[i].author.headImg}" alt="" class="userHeadImg" data-id = ${tips.data[i].author.id}>
                <span class="Username">${tips.data[i].author.username}</span>
            </div>
            <div class="forum_title">
                <span class="title">${tips.data[i].title}</span>
            </div>
            <div class="forum_text">
                <p class="text">${tips.data[i].content}</p>
            </div>

            <div class="forum_timeAndLikeNum">
                <div class="time">${tips.data[i].createTime}</div>
                <img src="../image/${tips.data[i].isLike}like.png" alt="" class="likeImg" data-did = ${tips.data[i].id} data-ifLike = ${tips.data[i].isLike}></img>
                <div class="likeNum">${tips.data[i].likesNum}</div>
            </div>
        </div>`
                    }
                }
            }
        })
    }

});