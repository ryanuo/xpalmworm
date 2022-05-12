/*
 * @Author: Harry
 * @Date: 2021-11-27 20:50:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-03 15:53:24
 * @FilePath: \xpalmworm\babel.config.js
 */
let plugins = [];
if (process.env.NODE_ENV === "pro") {    // todo  if判断是否打包,打包环境下控制台去掉console.log,也可去掉if判断，整个项目不会出现console.log(不建议)
  plugins.push("transform-remove-console");
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: plugins
};

