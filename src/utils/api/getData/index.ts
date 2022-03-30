/*
 * @Author: Harry
 * @Date: 2022-03-30 15:28:26
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 15:45:47
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