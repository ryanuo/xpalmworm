<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-02 18:06:24
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-03 00:28:25
 * @LastEditors: Harry
-->
<template>
  <div class="ranking_w">
    <h2 class="h2_w">积分列表</h2>
    <!-- 积分操作列表 -->
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column align="center" type="index" label="#" width="50" />
      <el-table-column align="center" label="头像" width="100">
        <template #default="props">
          <img v-if="props.row.userInfo" class="cover_w" :src="props.row.userInfo.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userInfo.nickName" label="作者" />
      <el-table-column align="center" prop="all_err_total" label="错" width="100" />
      <el-table-column align="center" prop="all_right_total" label="对" width="100" />
      <el-table-column align="center" prop="all_total" label="答题次数" width="100" />
      <el-table-column align="center" prop="score" label="积分" width="200" />
      <el-table-column align="center" prop="time" label="更新时间" />
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
    </el-table>
    <!-- 分页模式 -->
    <br />
    <el-pagination
      background
      v-model:currentPage="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next,jumper"
      @size-change="handleSizeChange"
      @current-change="currentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "@vue/runtime-core"
export default {
  name: "Rank",
  setup() {
    // 获取数据
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    const fn = reactive({
      editCurrentUser: function (key: Object) { },
      deleteUser: function (key: Object) { },
      currentPage: 1,
      tableData: [],
      pagesize: 5,
      total: 0
    })
    const handleSizeChange = function (size: number) {
      fn.pagesize = size
      getRankList()
    }
    const currentChange = function (num: number) {
      fn.currentPage = num
      getRankList()
    }
    const getRankList = async function () {
      const params = {
        key: 'rank',
        pagesize: fn.pagesize,
        pagenum: fn.currentPage
      }
      const { data: res } = await ctx.$http.get('/proxy/rank', { params })
      if (res.status_code == 1) {
        fn.tableData = res.list.data
        fn.total = res.list.pager.Total
        console.log(fn.tableData);
      }
    }
    onMounted(() => {
      // 获取数据
      // console.log('object');
      getRankList()
    })
    return {
      ...toRefs(fn),
      handleSizeChange,
      currentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.cover_w {
  width: 100%;
  height: 80px;
  border-radius: 50%;
  color: #983536;
}
</style>