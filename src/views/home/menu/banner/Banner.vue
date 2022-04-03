<!--
 * @Author: Harry
 * @Date: 2022-03-30 16:07:34
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-04-03 15:32:53
 * @FilePath: \xpalmworm\src\views\home\menu\banner\Banner.vue
-->
<template>
  <h2 class="h2_w">添加轮播图</h2>
  <el-row>
    <el-button type="info" title="添加轮播图" @click="editBannerAdd = true">+</el-button>
  </el-row>
  <h2 class="h2_w">轮播图列表</h2>
  <el-row>
    <el-table :data="bannerList" stripe style="width: 100%" border>
      <el-table-column align="center" type="index" label="#" width="50" />
      <el-table-column align="center" label="封面图">
        <template #default="props">
          <el-image
            style="width: 100px; height: 100px"
            :src="handlePic + props.row.pic"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          />
          <!-- <img class="cover_w" :src="handlePic + props.row.pic" /> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
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
  </el-row>
  <!-- 资讯弹窗 -->
  <el-dialog v-model="editBannerAdd" title="添加banner图" width="50%" :before-close="handleClose">
    <el-form ref="SubmitEditRef">
      <el-form-item>
        <el-upload
          action="#"
          :on-change="onChange"
          :file-list="fileLists"
          list-type="picture-card"
          :auto-upload="false"
          :on-remove="RemovePic"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon>
                    <zoom-in />
                  </el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 修改文件名称 -->
      <el-form-item>
        <span class="dialog-footer">
          <el-button @click="editBannerAdd = false">取消</el-button>
          <el-button type="primary" @click="addBannerList('SubmitEditRef')">增加</el-button>
        </span>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="editBanner" title="编辑轮播图" width="50%" :before-close="handleClose">
    <el-form ref="SubmitEditRef">
      <el-form-item>
        <el-upload
          action="#"
          :on-change="onChange"
          :file-list="fileLists"
          list-type="picture-card"
          :auto-upload="false"
          :on-remove="RemovePic"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon>
                    <zoom-in />
                  </el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 修改文件名称 -->
      <el-form-item>
        <span class="dialog-footer">
          <el-button @click="editBanner = false">取消</el-button>
          <el-button type="primary" @click="editBannerBackData('SubmitEditRef')">修改</el-button>
        </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
interface BS {
  bannerList: [],
  tableData: [],
  srcList: Object,
  editBanner: Boolean,
  fileLists: any[],
  bid: number,
  fileData: any,
  beforePicName: string,
  editBannerAdd: Boolean
}
import { getBannerList } from "@/utils/api/getData";
import { reactive, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { ElNotification, ElMessageBox } from 'element-plus';
import debounce_merge from '@/utils/samll/debounce';
import { UpdateBanner, AddBanner, deleteBanner } from '@/utils/api/getData'
// import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
export default {
  name: "Banner",
  setup() {
    const state = reactive<BS>({
      bannerList: [],
      tableData: [],
      srcList: [],
      editBanner: false,
      fileLists: [],
      bid: 0,
      fileData: null,
      beforePicName: '',
      editBannerAdd: false
    });
    // 编辑轮播图
    const editCurrentUser = function (p: any) {
      console.log(p);
      const { pic, bid } = p
      state.bid = bid
      state.editBanner = true
      state.fileLists[0] = { bid: state.bid, url: handlePic.value + pic }
      state.beforePicName = pic
    }
    // 处理页面的图片信息
    const handlePic = computed(() => {
      return process.env.VUE_APP_URL + "/banner/";
    });
    // 获取轮播图
    const getBanner = async function () {
      const { data: res } = await getBannerList();
      if (res.status_code === 1) {
        state.bannerList = res.banner_list.data;
        const a = state.bannerList.map(v => process.env.VUE_APP_URL + "/banner/" + v['pic'])
        state.srcList = a
        console.log(a);
      }
      console.log(res);
    };
    // 上传图片
    const updatePic = function () {
      const { bid } = state.fileLists[0]
      const obj: any = { bid, file_: state.fileData, beforename: state.beforePicName }
      const formdata = new FormData()
      for (let i in obj) {
        formdata.append(i, obj[i])
        console.log(i);
      }
      return formdata
    }

    // 轮播文件改变时执行
    const onChange = function (uploadFile: any, uploadFiles: any) {
      if (state.fileLists.length <= 1) {
        state.fileLists[0] = { bid: state.bid, url: process.env.VUE_APP_URL + "/banner/" + uploadFile.name }
      }
      if (uploadFiles.length > 1) {
        uploadFiles.shift()
      }
      state.fileData = uploadFile.raw
      console.log(uploadFile);
    }
    // 提交修改后的信息
    const editBannerBackData = debounce_merge(async function (ref: any) {
      // console.log(proxy.refs.ref);
      console.log(state.fileLists);
      if (state.fileLists.length === 0) {
        ElNotification({
          title: '提示',
          message: '图片或者名称为空！！！',
          type: 'error'
        })
      } else {
        const { data: res } = await UpdateBanner(updatePic())
        if (res.status_code == 1) {
          state.editBanner = false
          getBanner()
        }
        ElNotification({
          title: '提示',
          message: res.msg,
          type: res.status_code == 1 ? 'success' : 'error'
        })
      }
    }, 400, true)
    // 图片移除时的处理事件
    const RemovePic = function (uploadFile: any, uploadFiles: any) {
      console.log(uploadFile);
      console.log(uploadFiles.length);
      if (uploadFiles.length === 0) {
        state.fileLists = []
      }
    }
    // 加入轮播图
    const addBannerList = async function () {
      const { data: res } = await AddBanner(updatePic())
      console.log(res);
      const status = res.status_code === 1
      if (status) {
        state.editBannerAdd = false
      }
      ElNotification({
        title: '提示',
        message: res.msg,
        type: status ? 'success' : 'error'
      })
      getBanner()
    }
    // 再关闭之前
    const handleClose = function () {
      state.fileData = null
      state.fileLists = []
      state.beforePicName = ''
      state.editBannerAdd = false
      state.editBanner = false
    }
    // 删除图片
    const deleteUser = function (e: any) {
      ElMessageBox.confirm(
        '确认删除该图片，无法逆转？',
        '删除确认提示',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(async () => {
          console.log(e);
          const { bid, pic } = e
          const { data: res } = await deleteBanner({ bid, pic })
          if (res.status_code === 1) {
            getBanner()
          } ElNotification({
            title: '提示',
            message: res.msg,
            type: res.status_code === 1 ? 'success' : 'error'
          })
        })
        .catch(() => {
        })
    }
    onMounted(() => {
      getBanner();
    });
    return {
      ...toRefs(state),
      handleClose,
      deleteUser,
      RemovePic,
      editCurrentUser,
      editBannerBackData,
      onChange,
      addBannerList,
      handlePic,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
}

.cover_w {
  width: 100px;
  height: 100px;
}

.a_link {
  text-decoration: none;
  color: var(--themeColor);
}
</style>