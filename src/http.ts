/*
 * @Author: Harry
 * @Date: 2021-11-27 20:50:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 15:27:17
 * @FilePath: \xpalmworm\src\http.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_URL
let loading: any;

const startLoading = () => {

  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}
// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 加载
  startLoading();
  return config;
})


// 响应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();
  return response;
}, error => {
  // 结束loading
  endLoading();
  // 错误提醒
  return Promise.reject(error);
})

export default axios;