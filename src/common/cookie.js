//设置cookie
function setCookie(key, value, expirem){
    const expireDate = new Date ();
    expireDate.setTime(expireDate.getTime() + (expirem * 1000));
    document.cookie = key + "=" + value + ((expirem == null) ? "" : "; expires=" + expireDate.toUTCString());
}
//获取cookie
function getCookie(key){
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
//删除cookie
function delCookie(key){
    if (getCookie(key)){
        setCookie(key, "", -1);
    }
}

export {setCookie, getCookie, delCookie}