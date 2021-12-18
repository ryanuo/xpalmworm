/*
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-18 21:14:13
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-18 23:07:02
 * @LastEditors: Harry
 */
const handleClickItem = function () {
  // 获取遮罩层dom
  setTimeout(function () {
    let domImageMask = document.querySelector(".el-image-viewer__mask");
    if (!domImageMask) {
      return;
    }
    domImageMask.addEventListener("click", () => {
      // 点击遮罩层时调用关闭按钮的 click 事件
      // @ts-ignore
      document.querySelector(".el-image-viewer__close").click();
    });
  }, 300)
}

export { handleClickItem }