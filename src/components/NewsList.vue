<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 21:41:04
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-02 18:19:28
 * @LastEditors: Harry
-->
<template>
  <h2 class="h2_w">添加资讯</h2>
  <el-row>
    <el-button type="info" title="点击添加资讯" @click="dialogVisible = true">+</el-button>
  </el-row>
  <h2 class="h2_w">资讯列表</h2>
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in zxlists" :key="item.uid" :label="item.label" :name="item.name">
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column align="center" type="index" label="#" width="50" />
          <el-table-column align="center" label="封面图" width="100">
            <template #default="props">
              <img class="cover_w" :src="props.row.content_img" />
            </template>
          </el-table-column>

          <el-table-column align="center" prop="date_upload_author" label="作者" />
          <el-table-column align="center" prop="hot_title" label="标题" />
          <el-table-column align="center" prop="upload_date" label="最近更新时间" />
          <el-table-column align="center" label="操作" width="200">
            <template #default="props">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editCurrentUser(props.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteUser(props.row)"
                circle
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="链接地址" width="80">
            <template #default="props">
              <el-tag type="warning" @click="clickTarget(props.row.hot_url)">
                <a
                  class="a_link"
                  :href="props.row.hot_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >跳转</a>
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-row>
  <!-- 分页加载 -->
  <br />
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="currentChange"
    :total="total"
  ></el-pagination>
  <!-- 资讯弹窗 -->
  <el-dialog v-model="dialogVisible" title="添加资讯" width="50%" :before-close="handleClose">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { zxlists } from '@/utils/zixunlists'
export default {
  name: "NewsList",
  setup() {
    let activeName = ref('bd_datas')
    let dialogVisible = ref(false)
    let pagenum = ref(1)
    let total = ref<number>(1)
    let tableData = ref([])
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    const handleClick = async function (tab: string, event: string) {
      getList()
    }
    // 获取数据列表
    const getList = async function () {
      // activeName.value
      const { data: res } = await ctx.$http.get('/proxy/news', {
        params: {
          key: activeName.value,
          pagenum: pagenum.value,
          pagesize: 10
        }
      })
      if (res.status_code == 1) {
        tableData.value = res.list.data
        total.value = Math.floor(res.list.pager.Total)
      }
      console.log(res);
    }
    getList()
    const handleClose = function () {
      dialogVisible.value = false
    }
    // 点击页码进行跳转
    const currentChange = function (e:number) { 
      pagenum.value = e
      getList()
    }
    // 点击跳转
    const clickTarget = function (link: string) {
      console.log(link);
    }
    const editCurrentUser = function (id: string) {

    }
    // 删除
    const deleteUser = function (id: string) {

    }
    // 定义一个获取数据的方法
    return {
      activeName,
      handleClick,
      zxlists,
      tableData,
      dialogVisible, // 资讯弹窗
      handleClose,
      clickTarget,
      editCurrentUser,
      deleteUser,
      pagenum, // 页码
      total,
      currentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
}

.cover_w {
  width: 50px;
  height: 50px;
}

.a_link {
  text-decoration: none;
  color: var(--themeColor);
}
</style>