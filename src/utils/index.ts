/*
* @Description: 
* @Author: Harry
* @Date: 2021-12-16 15:38:32
* @Url: https://u.mr90.top
* @github: https://github.com/rr210
 * @LastEditTime: 2021-12-16 16:07:22
 * @LastEditors: Harry
*/
import Base64 from "./common/base64";
import cookieConfig from "./common/cookieConfig";
import debounce_merge from "./common/debounce";
import { rules } from "./common/loginValidators";
import { menuList } from "./common/menuList";
import { registerRules, registerUser } from "./common/registerValidators";
export default {
  registerUser,
  registerRules,
  rules,
  menuList,
  debounce_merge,
  cookieConfig,
  Base64
}