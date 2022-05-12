<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 21:43:15
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-12 23:06:13
 * @LastEditors: harry
-->
<template>
  <h2 class="h2_w">各个类别历史平均识别率</h2>
  <!-- :style="" -->
  <div id="customerChart" :style="{ width: '60vw', height: '600px' }"></div>
</template>

<script lang="ts">
import { getAnalysis } from "@/utils/api/getData";
import options from "@/utils/samll/options";
import * as echarts from 'echarts'
import { markRaw, onMounted, onUnmounted } from '@vue/runtime-core';
export default {
  setup() {
    const state = markRaw<any>({
      chartInstance: null,
      allData: null,
      titleFontSize: 0,
      timerId: null,
      dom: null
    })
    // 初始化图表
    const initChart = function () {
      state.chartInstance = echarts.init(state.dom)
      const initOption = options
      state.chartInstance.setOption(initOption)
      state.chartInstance.on('mouseover', () => {
        clearInterval(state.timerId)
      })
      state.chartInstance.on('mouseout', () => {
        startInterval()
      })
    }
    const getData = async function () {
      const { data: res } = await getAnalysis()
      console.log(res)
      const dataset = {
        source: [
          ['score', 'amount', 'product']
        ]
      }
      const a = res.data.map((v: any) => {
        return [Number(v.av_rate) * 100, Number(v.av_rate), v['zh-name']]
      })
      console.log(a)
      dataset.source = [...dataset.source, ...a]
      updateChart({ dataset })
    }
    const updateChart = function (options: any) {
      const updateOption = options
      state.chartInstance.setOption(updateOption)
    }
    const screenAdapter = function () {
      state.titleFontSize = (state.dom.offsetWidth / 100) * 3.6
      const adapterOption = {}
      state.chartInstance.setOption(adapterOption)
      state.chartInstance.resize()
    }
    const startInterval = function () {
      if (state.timerId) clearInterval(state.timerId)
      state.timerId = setInterval(() => { }, 3000)
    }
    onMounted(() => { // 需要获取到element,所以是onMounted的Hook
      // 绘制图表
      state.dom = document.getElementById('customerChart')
      initChart()
      getData()
      window.addEventListener('resize', screenAdapter)
      screenAdapter()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', screenAdapter)
      clearInterval(state.timerId)
    })
    return {
    }
  }
}
</script>
<style lang='sass' scoped>
</style>