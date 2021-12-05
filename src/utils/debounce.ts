/*
 * @Description: 窗口全局监听
 * @Author: Harry
 * @Date: 2021-12-05 12:22:06
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-05 13:08:10
 * @LastEditors: Harry
 */
//防抖(合并版)
function debounce_merge(fn: Function, wait = 500, isImmediate = false) {
  var timerId: any = null;
  var flag = true;
  return function () {
    // @ts-ignore
    var context = this
    var args = arguments
    if (timerId) clearTimeout(timerId);
    if (isImmediate) {
      if (flag) {
        fn.apply(context, args)
        flag = false
      }
      timerId = setTimeout(function () {
        flag = true
      }, wait)
    } else {
      timerId = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
  }
}

export default debounce_merge