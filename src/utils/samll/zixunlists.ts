/*
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-29 14:45:09
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-17 18:21:07
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
    uid: 2
  },
  {
    name: 'sgDatas',
    label: '搜狗',
    file_name: "sg",
    uid: 3
  },
  {
    name: 'datas_360',
    label: '360',
    file_name: "360",
    uid: 4
  }
]



interface MeLists {
  name: string,
  label: string,
  file_name: string,
  uid: number
}

const melists: MeLists[] = [
  {
    name: '草本害虫',
    label: '草本害虫',
    file_name: "草本害虫",
    uid: 2
  },
  {
    name: '木本害虫',
    label: '木本害虫',
    file_name: "木本害虫",
    uid: 3
  },
  {
    name: '药用植物根部害虫',
    label: '药用植物根部害虫',
    file_name: "药用植物根部害虫",
    uid: 1
  }
]

export {
  zxlists,
  melists
}