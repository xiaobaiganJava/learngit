var keycontent = topBar_search.value;
topBar_searchImg.addEventListener("click", function() {
    if (topBar_search.value == '') {
        alert('搜索内容不能为空');
    } else {
        location.href = "search.html?key=" + encodeURI(topBar_search.value);
    }

});