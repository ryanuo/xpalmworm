/*
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-29 14:45:09
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-29 14:57:50
 * @LastEditors: Harry
 */
interface ZxLists {
  name: string,
  label: string,
  file_name: string,
  uid: number
}

const zxlists: ZxLists[] = [
  {
    name: 'bd_datas',
    label: '百度',
    file_name: "baidu",
    uid: 1
  },
  {
    name: 'zxss',
    label: '中国新闻',
    file_name: "zxss",
    uid: 1
  },
  {
    name: 'sgDatas',
    label: '搜狗',
    file_name: "sg",
    uid: 1
  },
  {
    name: 'datas_360',
    label: '360',
    file_name: "360",
    uid: 1
  }

]

export {
  zxlists
}