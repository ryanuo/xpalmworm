/***
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 16:20:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-04 17:20:31
 * @LastEditors: Harry
 */
module.exports = {
  lintOnSave: false, //关闭eslint检测\
  devServer: {
    open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/proxy': {
        target: 'http://localhost:5000', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          // 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/user/userInfo 时
          // 实际上访问的地址是：http://192.168.1.249:9527/user/userInfo,因为重写了 /api
          '^/proxy': ''
        }
      },
      "/uploads": {
        target: 'https://kc.mr90.top/predict_image', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, //是否允许跨域
        pathRewrite: {
          '^/uploads': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '掌虫管理后台'
        return args
      })
  }
}
