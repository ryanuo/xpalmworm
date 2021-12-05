<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-05 20:03:28
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-05 20:29:05
 * @LastEditors: Harry
-->
<template>
  <div class="themec">
    <img :src="'./image/icon/' + themeC + '.png'" @click="clickTheme" alt="主题变化" title="主题变化" />
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import debounce_merge from '@/utils/debounce'
export default {
  name: "LightDark",
  setup() {
    let themeC = ref('light')
    // 防抖操作
    const clickTheme = debounce_merge(function () {
      themeC.value = themeC.value == 'dark' ? 'light' : 'dark'
      document.head.querySelector('#skin')!.setAttribute('href', `./css/theme/${themeC.value}.css`)
    }, 500, true)
    return {
      themeC,
      clickTheme
    }
  }
}
</script>

<style lang="scss" scoped>
.themec {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1%;
  z-index: 99;
  @media only screen and(max-width:870px) {
    right: 16%;
    width: 25px;
    height: 25px;
  }
  img {
    width: 100%;
  }
}
</style>