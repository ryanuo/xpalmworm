/*
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 20:53:11
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-12 20:31:46
 * @LastEditors: harry
 */
// 菜单列表
interface MenuList {
  id: number,
  authname: string,
  path: string,
  // childen: Object
}

const menuList: MenuList[] = [
  {
    id: 1,
    authname: "首页",
    path: "home",
    // children: []
  },
  {
    id: 2,
    authname: "资讯列表",
    path: "news",
    // children: []
  },
  {
    id: 3,
    authname: "历史管理",
    path: "history",
    // children: []
  },
  {
    id: 8,
    authname: "轮播图管理",
    path: "banner",
  },
  {
    id: 7,
    authname: "病虫列表",
    path: "med1",
  },
  {
    id: 4,
    authname: "用户管理",
    path: "user",
    // children: []
  },
  {
    id: 6,
    authname: "模型管理",
    path: "module"
  },
  {
    id: 5,
    authname: "设置",
    path: "setting"
  }
]

export { menuList }