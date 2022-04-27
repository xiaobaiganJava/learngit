function setCookie(cname, cvalue) {
    console.log("调用成功");
    var day = new Date();
    day.setTime(day.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var cArray = document.cookie.split(';');
    for (var i = 0; i < cArray.length; i++) {
        var cookie = cArray[i].trim();
        if (cookie.indexOf(name) == 0)
            return cookie.substring(name.length, cookie.length);
    }
    return "";
}