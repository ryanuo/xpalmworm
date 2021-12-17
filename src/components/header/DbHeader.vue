<!--
 * @Description: 页面顶部header
 * @Author: Harry
 * @Date: 2021-11-29 10:34:41
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-16 16:03:42
 * @LastEditors: Harry
-->
<template>
  <div class="dbheader">
    <!-- logo设计部分 -->
    <div class="logo_warp">
      <img class="logo_img" src="image/page/logo.ong.png" alt="XPalmworm" />
      <span>XPalmworm</span>
    </div>
    <!-- 右侧的四个部分 -->
    <light-dark></light-dark>
    <el-row class="el-r">
      <el-col :span="3">
        <!-- <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        class="inline-input"
        placeholder="Please Input"
        @select="handleSelect"
        />-->
        <el-autocomplete class="inline-input" placeholder="搜索" />
      </el-col>
      <el-col :span="3" class="signed_img_w tada">
        <img src="image/icon/wenhao.png" />
        <span>帮助</span>
      </el-col>
      <el-col :span="3" class="signed_img_w tada left-border">
        <img src="image/icon/remind.png" />
        <span>消息</span>
      </el-col>
      <!-- 默认作者头像 -->
      <el-col :span="3" class="signed_img_w left-border">
        <img src="image/page/default.png" />
        <span>Admin</span>
      </el-col>
    </el-row>
    <el-row class="menu_r">
      <el-dropdown>
        <div class="menu_l">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
            <path
              fill="currentColor"
              d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
            />
          </svg>
        </div>
        <template #dropdown>
          <el-dropdown-menu trigger="click">
            <el-dropdown-item
              v-for="item in menulist"
              :key="item.id"
              @click="clickMenu(item.path)"
            >{{ item.authname }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script lang="ts">
import { menuList } from "@/utils/samll/menuList"
import { getCurrentInstance } from '@vue/runtime-core'
import LightDark from "./components/LightDark.vue"
export default {
  name: "DbHeader",
  components: {
    LightDark
  },
  setup() {
    // @ts-ignore
    const { proxy } = getCurrentInstance()
    const menulist = menuList
    // 页面的跳转
    const clickMenu = function (path: string) {
      proxy.$router.push('/' + path)
    }
    return {
      menulist, clickMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.left-border {
  border-left: 1px solid rgb(241, 241, 241);
}
.signed_img_w {
  cursor: pointer;
  text-align: center;
  img {
    width: 30px;
    margin-right: 5px;
    vertical-align: middle;
  }
  span {
    color: var(--fontColor);
    font-weight: 550;
    vertical-align: middle;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}
.dbheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.logo_warp {
  width: 200px;
  cursor: pointer;
  .logo_img {
    width: 30%;
    vertical-align: middle;
    margin-right: 5px;
  }
  span {
    color: var(--fontColor);
    font-weight: 550;
    vertical-align: middle;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}
.el-r {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  @media only screen and(max-width:800px) {
    display: none;
  }
}
.menu_r {
  display: none;
  @media only screen and(max-width:800px) {
    display: block;
  }
  .menu_l {
    width: 37px;
    color: rgba($color: #2a61ff, $alpha: 0.5);
  }
}

.tada {
  &:hover {
    img {
      animation: tada 0.4s linear infinite;
    }
  }
}
</style>