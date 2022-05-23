function setCookie(name,value,iday){
    let oDate = new Date();
    oDate.setTime(oDate.getTime()+(iday*24*60*60*1000));
    let expires = "expires=" +oDate.toUTCString();
    document.cookie = name + "=" + value +"; "+ expires; 
}

function getCookie(name){
    let arr = document.cookie.split("; ");
    for(let i = 0 ;i<arr.length;i++){
        let arr2 = arr[i].split("=");
        if(arr2[0] == name ){
            return arr2[1];
        }
    }

    return "";
}

function removeCookie(name){
    setCookie(name,1,-1)
}
