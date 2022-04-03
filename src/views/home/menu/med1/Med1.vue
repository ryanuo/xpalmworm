<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-02 18:06:24
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 17:02:15
 * @LastEditors: harry
-->
<template>
  <div class="ranking_w">
    <h2 class="h2_w">中草药害虫列表</h2>
    <!-- 积分操作列表 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in melist"
        :key="item.uid"
        :label="item.label"
        :name="item.name"
      >
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column align="center" type="index" label="#" width="50" />
          <el-table-column align="center" label="图像" width="100">
            <template #default="props">
              <el-image
                v-if="props.row.pest_name"
                :src="url_f + props.row.pest_name + '.jpg'"
                :preview-src-list="srcList"
                :initial-index="1"
                @click.stop="handleClickItem"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="pest_name"
            label="害虫名称"
            width="120"
          />
          <el-table-column
            align="center"
            prop="cate_sk"
            label="类别"
            width="150"
          >
            <template #default="props">
              <!-- {{props.row.cate_sk}} -->
              <el-tag type="success" v-if="props.row.cate_sk">{{
                props.row.cate_sk.split(",")[0]
              }}</el-tag>
              <el-tag v-if="props.row.cate_sk">{{
                props.row.cate_sk.split(",")[1]
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="harm_host"
            label="危害寄主"
            width="260"
          />
          <el-table-column align="center" prop="harm_feat" label="危害特点" />
          <el-table-column
            align="center"
            prop="control_measures"
            label="防治措施"
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
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页模式 -->
    <br />
    <el-pagination
      background
      v-model:currentPage="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      v-model:page-size="pagesize"
      layout="sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="currentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { handleClickItem } from "@/utils/samll/maskdia";
import { melists } from "@/utils/samll/zixunlists";
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { getInsectsList } from "@/utils/api/getData";
export default {
  name: "Rank",
  // emits: ["handleSizeChange", "currentChange", 'handleClickItem'],
  setup() {
    // 获取数据
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    let activeName = ref("草本害虫");
    let melist = ref(melists);
    const fn = reactive({
      currentPage: 1,
      tableData: [],
      pagesize: 5,
      total: 0,
      srcList: [],
    });
    // 图片的链接地址
    const url_f = process.env.VUE_APP_URL + "/images/";
    // console.log(process.env.NODE_ENV);
    const handleClick = async function (tab: string, event: string) {
      getMedList();
    };
    const handleSizeChange = function (size: number) {
      fn.pagesize = size;
      getMedList();
    };

    const currentChange = function (num: number) {
      fn.currentPage = num;
      getMedList();
    };

    const getMedList = async function () {
      const params = {
        key: activeName.value,
        pagesize: fn.pagesize,
        pagenum: fn.currentPage,
      };
      const { data: res } = await getInsectsList({ params });
      if (res.status_code == 1) {
        fn.tableData = res.data;
        fn.total = res.total;
        fn.srcList = res.data.map((v: any) => url_f + v.pest_name + ".jpg");
      }
    };
    const editCurrentUser = function (key: Object) {};
    const deleteUser = function (key: Object) {
      console.log(key);
      const data = {
        // @ts-ignore
        pid: key["pid"],
      };
      proxy.$http.delete("/insects", { data });
    };
    onMounted(() => {
      // 获取数据
      // console.log('object');
      getMedList();
    });
    return {
      ...toRefs(fn),
      handleSizeChange,
      currentChange,
      editCurrentUser,
      deleteUser,
      activeName,
      handleClick,
      melist,
      url_f,
      handleClickItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.cover_w {
  width: 100%;
  height: 80px;
  border-radius: 50%;
  color: #983536;
}
div el-image {
  img.el-image__preview {
    width: 100%;
    height: 80px;
    border-radius: 50%;
    // color: #983536;
  }
}
</style>