<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-29 10:30:05
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-15 20:32:21
 * @LastEditors: Harry
-->
<template>
  <el-button @click="layout">退出</el-button>
</template>

<script lang="ts">
import { getCurrentInstance } from "@vue/runtime-core"
export default {
  name: "Setting",
  setup() {
    // @ts-ignore
    const { proxy } = getCurrentInstance()
    const layout = function () {
      localStorage.clear()
      sessionStorage.clear()
      proxy.$router.replace('/login')
      proxy.$message.info('退出成功')
    }
    return { layout }
  }
}
</script>

<style>
</style>