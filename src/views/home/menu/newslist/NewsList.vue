<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-28 21:41:04
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 16:53:31
 * @LastEditors: harry
-->
<template>
  <h2 class="h2_w">添加资讯</h2>
  <el-row>
    <el-button type="info" title="点击添加资讯" @click="dialogVisible = true"
      >+</el-button
    >
  </el-row>
  <h2 class="h2_w">资讯列表</h2>
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in zxlists"
        :key="item.uid"
        :label="item.label"
        :name="item.name"
      >
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column align="center" type="index" label="#" width="50" />
          <el-table-column align="center" label="封面图" width="100">
            <template #default="props">
              <img class="cover_w" :src="props.row.content_img" />
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="date_upload_author"
            label="作者"
          />
          <el-table-column align="center" prop="hot_title" label="标题" />
          <el-table-column
            align="center"
            prop="upload_date"
            label="最近更新时间"
          />
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
                  >跳转</a
                >
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
    layout="sizes, prev, pager, next"
    :page-sizes="[5, 10, 20, 50]"
    :page-size="pagesize"
    @size-change="handleSizeChange"
    @current-change="currentChange"
    :total="total"
  ></el-pagination>
  <!-- 资讯弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    title="添加资讯"
    width="50%"
    :before-close="handleClose"
  >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >添加</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, toRefs } from "@vue/reactivity";
import { zxlists } from "@/utils/samll/zixunlists";
import { ElMessage, ElMessageBox } from "element-plus";
import { getNewsList, deleteNews } from "@/utils/api/getData";
export default {
  name: "NewsList",
  setup() {
    const state = reactive({
      activeName: "bd_datas",
      dialogVisible: false,
      pagenum: 1,
      total: 1,
      tableData: [],
      pagesize: 5,
    });
    const handleClick = async function (tab: string, event: string) {
      getList();
    };
    // 获取数据列表
    const getList = async function () {
      // activeName
      const { data: res } = await getNewsList({
        params: {
          key: state.activeName,
          pagenum: state.pagenum,
          pagesize: state.pagesize,
        },
      });
      if (res.status_code == 1) {
        state.tableData = res.list.data;
        state.total = Math.floor(res.list.pager.Total);
      }
      // console.log(res);
    };
    getList();
    const handleClose = function () {
      state.dialogVisible = false;
    };
    // 点击页码进行跳转
    const currentChange = function (e: number) {
      state.pagenum = e;
      getList();
    };
    // 点击跳转
    const clickTarget = function (link: string) {
      console.log(link);
    };
    const handleSizeChange = function (size: number) {
      state.pagesize = size;
      getList();
    };
    const editCurrentUser = function (params: string) {};
    // 删除
    const deleteUser = function (params: string) {
      ElMessageBox.confirm(
        "你是否要删除该条资讯，删除之后无法恢复，望谨慎操作",
        "删除该条资讯",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "Save",
          cancelButtonText: "Discard Changes",
        }
      )
        .then(async () => {
          const data = {
            key: state.activeName,
            // @ts-ignore
            _id: params._id,
          };
          const { data: res } = await deleteNews({ data });
          if (res.status_code == 1) {
            ElMessage({
              type: "success",
              message: res.msg,
            });
            getList();
          } else {
            ElMessage({
              type: "error",
              message: res.msg,
            });
          }
          // console.log(res);
        })
        .catch((action) => {
          ElMessage({
            type: "info",
            message:
              action === "cancel"
                ? "Changes discarded. Proceeding to a new route."
                : "Stay in the current route",
          });
        });
    };
    // 定义一个获取数据的方法
    return {
      handleClick,
      zxlists,
      ...toRefs(state),
      handleClose,
      clickTarget,
      editCurrentUser,
      deleteUser,
      currentChange,
      handleSizeChange,
    };
  },
};
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