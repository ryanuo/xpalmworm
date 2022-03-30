<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-29 13:24:10
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-19 15:02:52
 * @LastEditors: Harry
-->
<template>
  <h2 class="h2_w">上传识别</h2>
  <div v-if="!isShow">
    <el-row class="el_img_res">
      <el-col :span="12">
        <div class="img_l">
          <el-image
            style="width: 80%;"
            :src="srcList[0]"
            :preview-src-list="srcList"
            :initial-index="0"
            @click.stop="handleClickItem"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="img_l">
          <el-image
            style="width: 80%;"
            :src="srcList[1]"
            :preview-src-list="srcList"
            :initial-index="1"
            :hide-on-click-modal="true"
            @click.stop="handleClickItem"
          ></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-upload
    v-if="isShow"
    ref="upload"
    :auto-upload="true"
    class="upload-demo"
    drag
    action
    capture="camera"
    :http-request="uploadFile"
    :on-change="handleChangePic"
    accept=".jpg, .png, .jpeg"
    :limit="1"
  >
    <!-- :on-exceed="onExceed" -->
    <div class="upload_f">
      <div class="up_svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
          <path
            fill="currentColor"
            d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
          />
        </svg>
      </div>
    </div>
    <div class="el-upload__text">
      将文件拖到此处
      <em>点击上传</em>
    </div>
  </el-upload>
  <!-- 重新上传的窗口 -->
  <el-button type="info" class="btn_re" v-if="!isShow">
    <el-upload
      id="el-upload"
      ref="upload"
      :auto-upload="true"
      drag
      action
      :http-request="uploadFile"
      :on-change="handleChangePic"
      capture="camera"
      accept=".jpg, .png, .jpeg"
      :limit="1"
    ></el-upload>重新上传
    <!-- :on-exceed="onExceed" -->
  </el-button>
  <!-- 第二个 按钮 -->
  <br />
  <!-- 预览图 -->
  <el-dialog v-model="dialogVisible">
    <img style="width:100%" :src="dialogImageUrl" />
  </el-dialog>
  <div v-if="tableData.length !== 0">
    <h2 class="h2_w">
      识别结果展示
      <span class="h2_item">
        一共识别到
        <em>{{ nums_len }}</em>
        种,耗时
        <em>{{ time_count }}</em>
      </span>
    </h2>
    <el-table :data="tableData" stripe border>
      <el-table-column label="#" type="index" />
      <el-table-column prop="name" label="害虫名称" />
      <el-table-column prop="nums" label="害虫数量" />
      <el-table-column prop="max_rate" label="识别率max" />
    </el-table>
  </div>
  <div v-else class="empty_">
    <el-image src="image/page/empty.svg" fit="cover"></el-image>
    <span class="span_s">您还未上传图片，暂无记录</span>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { ElNotification } from 'element-plus'
import { handleClickItem } from '@/utils/samll/maskdia'
// import { defineComponent } from '@vue/runtime-core'
// import { UploadFilled as upload } from '@element-plus/icons'
export default {
  name: "Hello",
  setup() {
    // @ts-ignore
    const { proxy } = getCurrentInstance()
    let dialogVisible = ref(false)
    let dialogImageUrl = ref('')
    let srcRes = reactive({
      nums: 0,
      srcList: ['0', '0'],
      isShow: true,
      nums_len: 0,
      time_count: ''
    })
    let tableData = ref([])
    const uploadFile = async function (params: any) {
      // console.log("uploadFile", params);
      const urlback = process.env.NODE_ENV == 'dev' ? 'http://localhost:5000/' : "https://detect.mr90.top/";
      const _file = params['file'];
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("input_image", _file);
      const headers = {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
      const { data: res } = await proxy.$http.post('/v5/detect', formData, headers)
      // console.log(res);
      if (res.status_code !== -2) {
        srcRes.srcList[1] = urlback + res[0].out_file_img
        srcRes.srcList[0] = getObjectURL(params['file'])
        // clf
        srcRes.isShow = false
        srcRes.nums_len = res[0]['res_name_nums'].length
        srcRes.time_count = res[0]['time_count']
        for (let a of res[0]['res_name_nums']) {
          a['max_rate'] = 0
          for (let i of res[0]['recogn_rate']) {
            if (i['rate'] >= a['max_rate'] && a['name'] == i['label']) {
              a['max_rate'] = i['rate']
            }
          }
        }
        tableData.value = res[0]['res_name_nums']
        // console.log(res);
        success_respone(res.msg, 'success')
      } else {
        success_respone(res.msg, 'error')
      }
      // if (res.nums) {
      //  
      // proxy.$message.success("识别成功！！！");
      // }
      // if (!isLt2M) {
      //   proxy.$message.error("请上传2M以下的图片");
      //   return false;
      // }
      // proxy.$refs.upload.clearFiles()
    }
    const success_respone = (msg: string, type: any) => {
      ElNotification({
        title: '通知',
        message: msg,
        type
      })
    }
    // 图片预览小哥哥
    const previewImg = function (file: string) {
      dialogVisible.value = true
      dialogImageUrl.value = file
    }
    // 文件限制超出
    const onExceed = function (files: any, fileList: any) {
      proxy.$message.error('移除第一张,可继续识别')
      // proxy.$refs.upload.clearFiles()
    }

    const submitData = function () {
      proxy.$refs.upload.submit();
    }
    const previewFile = function (file: any) {
      console.log(1);
    }
    const getObjectURL = function (file: any) {
      var url = null;
      // @ts-ignore
      if (window.createObjcectURL != undefined) {
        // @ts-ignore
        url = window.createOjcectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
    const handleChangePic = function (file: any, filelist: any) {
      // console.log(file, filelist);
      if (filelist.length >= 1) {
        filelist.splice(0, 1);
      }
    }
    // 重新上传
    const distinguishPhoto = function () {
      let len = proxy.$refs.upload.uploadFiles.length
      if (len == 0) {
        return proxy.$message.error('您还未上传图片!!')
      } else {
        proxy.$refs.upload.submit();
        proxy.$refs.upload.uploadFiles = []
      }
    }

    return {
      uploadFile, submitData, onExceed,
      previewFile, dialogVisible, dialogImageUrl,
      distinguishPhoto, ...toRefs(srcRes), getObjectURL, previewImg,
      handleClickItem,
      tableData, handleChangePic,
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  // width: 600px;
  width: 100%;
  // @media only screen and(max-width:800px) {
  //   width: 1%%;
  // }
}
.upload_f {
  width: 100%;
  height: 70%;
  color: #c0c4cc;
  // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .up_svg {
    width: 120px;
    height: 100%;
    // position: absolute;
    // top: 50%;
    // left: 50%;
  }
}
.el_img_res {
  display: flex;
  justify-content: center;
  align-items: center;
  .img_l {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
.btn_re {
  margin: 10px 0;
}
.handle_btn {
  display: flex;
  padding: 20px 0;
}
.el-row-btn {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.h2_item {
  font-size: 14px;
  em {
    color: var(--themeColor);
  }
}

.empty_ {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-image {
  padding: 50px 0;
  width: 20%;
  @media only screen and(max-width:800px) {
    width: 40%;
  }
}
.el_img_res {
  .img_l {
    @media only screen and(max-width:800px) {
      padding: 0;
    }
  }
}

.span_s {
  color: var(--themeColor);
  font-size: 10px;
}
</style>