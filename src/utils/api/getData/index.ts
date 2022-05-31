/*
 * @Author: Harry
 * @Date: 2022-03-30 15:28:26
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-31 21:46:56
 * @FilePath: \xpalmworm\src\utils\api\getData\index.ts
 */
import axios from '@/http'
import {
    LOGIN_URL,
    NEWS_URL,
    BANNER_URL,
    INSECTS_URL,
    ANALYSIS_URL,
    MODULE_URL,
    TempImg_URL
} from '@/utils/api/index'
// 登录接口/
export function loginAuth(params: {}) {
    return axios.get(LOGIN_URL, params)
}
// 获取新闻数据
export function getNewsList(params: {}) {
    return axios.get(NEWS_URL, params)
}

// 删除新闻数据
export function deleteNews(data: {}) {
    return axios.delete(NEWS_URL, data)
}
// 管理banner图
export function getBannerList() {
    return axios.get(BANNER_URL)
}
// 修改 banner图
export function UpdateBanner(params: {}) {
    const headers = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.put(BANNER_URL, params, headers)
}
// 删除图片
export function deleteBanner(params: {}) {
    return axios.delete(BANNER_URL, { data: params })
}

export function AddBanner(params: {}) {
    const headers = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(BANNER_URL, params, headers)
}

// 获取害虫数据
export function getInsectsList(params: {}) {
    return axios.get(INSECTS_URL, params)
}
// 害虫信息的增加
export function addPest(params: {}) {
    return axios.post(INSECTS_URL, params)
}
// 害虫信息的更新
export function updatePest(params: {}) {
    return axios.put(INSECTS_URL, params)
}
// 获取资讯的数据
export function getAnalysis() {
    return axios.get(ANALYSIS_URL)
}
// 获取模型列表
export function getModule(params: {}) {
    return axios.get(MODULE_URL, params)
}
// 模型默认值设置
export function setDefault(params: {}) {
    return axios.put(MODULE_URL, params)
}
// 上传图片
export function tempImageInsects(params:{}){
    const headers = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(TempImg_URL, params, headers)
}