/*
* @Description: 
* @Author: Harry
* @Date: 2021-12-16 15:38:32
* @Url: https://u.mr90.top
* @github: https://github.com/rr210
 * @LastEditTime: 2021-12-18 21:15:26
 * @LastEditors: Harry
*/
import Base64 from "./samll/base64";
import cookieConfig from "./samll/cookieConfig";
import debounce_merge from "./samll/debounce";
import { rules } from "./samll/loginValidators";
import { handleClickItem } from "./samll/maskdia";
import { menuList } from "./samll/menuList";
import { registerRules, registerUser } from "./samll/registerValidators";
export default {
  handleClickItem,
  registerUser,
  registerRules,
  rules,
  menuList,
  debounce_merge,
  cookieConfig,
  Base64
}