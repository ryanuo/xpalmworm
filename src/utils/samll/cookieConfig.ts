/*
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-02 22:33:52
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-18 00:03:45
 * @LastEditors: Harry
 */
const setCookie: Function = function (name: string, value: string) {
  let expdate = new Date();   //初始化时间
  expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
  document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toUTCString() + ";path=/";
  // document.cookie = name + "=" + value + ";path=/";  // 时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
}
const getCookie: Function = function (a: string) {
  // console.log(a)
  let d;
  let b = document.cookie;
  let c = b.split(";");
  // console.log(c);
  for (let e = 0; e < c.length; e++) {
    let f = c[e].split("=");
    if (a == f[0].toString().trim()) {
      d = f[1];
      break;
    }
  } if (void 0 == d || null == d) {
    return "";
  }
  else {
    let g = unescape(d.trim());
    return g;
  }
}
const delCookie: Function = function (a: string) {
  let b = new Date(0).toUTCString();
  document.cookie = a + "=;expires=" + b + ";path=/";
}
export default {
  setCookie,
  getCookie,
  delCookie
}