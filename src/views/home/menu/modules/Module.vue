<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 21:43:15
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-14 16:59:02
 * @LastEditors: harry
-->
<template>
  <!-- <h2 class="h2_w">各个类别历史平均识别率</h2> -->
  <!-- :style="" -->
  <div id="customerChart" :style="{ width: '60vw', height: '600px' }"></div>
  <h2 class="h2_w">更改模型</h2>
  <el-table :data="ModuletableData" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="module_name" label="模型名称" width="180" />
    <el-table-column prop="module_size" label="模型大小" />
    <el-table-column align="center" label="操作">
      <template #default="props">
        <el-button v-if="props.row.mo_default" size="mini" :type="props.row.mo_default === '1' ? 'success' : 'info'"
          @click="handleDefault(props.row)">
          {{
              props.row.mo_default
                === '1' ? '默认' : '设为默认'
          }}
        </el-button>
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCurrentModule(props.row)" circle>
        </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteModule(props.row)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
// @ts-ignore
import { getAnalysis, getModule, setDefault } from "@/utils/api/getData";
// @ts-ignore
import { Options } from "@/utils/samll/options";
import * as echarts from 'echarts'
import { markRaw, onMounted, onUnmounted, reactive, toRefs } from '@vue/runtime-core';
import { ElNotification } from "element-plus";
export default {
  setup() {
    const state = markRaw<any>({
      chartInstance: null,
      allData: null,
      titleFontSize: 0,
      timerId: null,
      dom: null
    })
    const modulestate = reactive({
      ModuletableData: []
    })
    // 获取模型数据
    const getModuleList = async function () {
      const params = {
        type: 'all'
      }
      const { data: res } = await getModule({ params })
      console.log(res);
      if (res.status_code === 1) {
        modulestate.ModuletableData = res.data
      }
    }
    // 更新默认模型
    const handleDefault = async function (param: any) {
      if (param['mo_default'] === '1') {
        ElNotification({
          title: '提示',
          message: '当前模型已设置为默认模型',
          type: 'info'
        })
      } else {
        // 执行更新默认值操作
        const a = modulestate.ModuletableData.filter(v => v['mo_default'] === '1')
        console.log(a[0]['id']);
        const params = {
          old_id: a[0]['id'],
          new_id: param['id']
        }
        const { data: res } = await setDefault(params)
        console.log(res);
        if (res.status_code === 1) {
          console.log(res);
          getModuleList()
          ElNotification({
            title: '提示',
            message: res.msg,
            type: 'success'
          })
        }
      }
    }
    // 初始化图表
    const initChart = function () {
      state.chartInstance = echarts.init(state.dom)
      const initOption = Options
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
      getModuleList()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', screenAdapter)
      clearInterval(state.timerId)
    })
    return {
      ...toRefs(modulestate),
      handleDefault
    }
  }
}
</script>
<style lang='sass' scoped>
</style>