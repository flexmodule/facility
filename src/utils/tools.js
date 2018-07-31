/* cookie的存取 start */
import Cookies from 'js-cookie'

export function setCookie(name, value) {
    return Cookies.set(name, value)
}
export function getCookie(name) {
    return Cookies.get(name)
}
export function delCookie(name) {
    return Cookies.remove(name)

}
/* cookie的存取 end */

/* 手机机型和环境判断 start */
export function isWechat() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false
}
export function isAndroid() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('android') > -1 ? true : false
}
export function isiOS() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false
}