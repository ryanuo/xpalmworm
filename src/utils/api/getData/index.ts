/*
 * @Author: Harry
 * @Date: 2022-03-30 15:28:26
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-12 22:59:49
 * @FilePath: \xpalmworm\src\utils\api\getData\index.ts
 */
import axios from '@/http'
import rApi from '@/utils/api/index'
// 登录接口/
export function loginAuth(params: {}) {
    return axios.get(rApi.LOGIN_URL, params)
}
// 获取新闻数据
export function getNewsList(params: {}) {
    return axios.get(rApi.NEWS_URL, params)
}

// 删除新闻数据
export function deleteNews(data: {}) {
    return axios.delete(rApi.NEWS_URL, data)
}
// 管理banner图
export function getBannerList() {
    return axios.get(rApi.BANNER_URL)
}
// 修改 banner图
export function UpdateBanner(params: {}) {
    const headers = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.put(rApi.BANNER_URL, params, headers)
}
// 删除图片
export function deleteBanner(params: {}) {
    return axios.delete(rApi.BANNER_URL, {data:params})
}

export function AddBanner(params: {}) {
    const headers = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(rApi.BANNER_URL, params, headers)
}

// 获取害虫数据
export function getInsectsList(params: {}) {
    return axios.get(rApi.INSECTS_URL, params)
}

export function getAnalysis(){
    return axios.get(rApi.ANALYSIS)
}