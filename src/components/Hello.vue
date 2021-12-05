<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-11-29 13:24:10
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-05 13:24:02
 * @LastEditors: Harry
-->
<template>
  <h2 class="h2_w">上传识别</h2>
  <el-upload
    ref="upload"
    :auto-upload="false"
    class="upload-demo"
    drag
    action
    :http-request="uploadFile"
    list-type="picture"
    :on-preview="handlePictureCardPreview"
    accept=".jpg, .jpeg, .png"
    :on-remove="handleRemove"
    :limit="1"
    :on-exceed="onExceed"
  >
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
  <br />
  <el-button type="info" @click="distinguishPhoto">点击识别</el-button>
  <!-- 预览图 -->
  <el-dialog v-model="dialogVisible">
    <img style="width:100%" :src="dialogImageUrl" />
  </el-dialog>
  <h2 class="h2_w">识别结果展示</h2>
  <div>
    <img v-if="pre_res.length != 0" :src="'https://kc.mr90.top/getimg/image/' + pre_res" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
// import { defineComponent } from '@vue/runtime-core'
// import { UploadFilled as upload } from '@element-plus/icons'
export default {
  name: "Hello",
  setup() {
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    let dialogVisible = ref(false)
    let dialogImageUrl = ref('')
    let srcRes = reactive({
      nums: 0,
      pre_res: ''
    })
    const uploadFile = async function (params: any) {
      console.log("uploadFile", params);
      const _file = params['file'];
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("input_image", _file);
      const headers = {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
      const { data: res } = await ctx.$http.post('/uploads', formData, headers)
      srcRes.nums = res.nums
      srcRes.pre_res = res.pre_res.split('/')[2]
      if (res.nums) {
        ctx.$message.success("识别成功！！！");
      }
      // if (!isLt2M) {
      //   ctx.$message.error("请上传2M以下的图片");
      //   return false;
      // }
      // ctx.$refs.upload.clearFiles()
    }
    // 文件限制超出
    const onExceed = function (files: any, fileList: any) {
      ctx.$message.error('移除第一张,可继续识别')
      // ctx.$refs.upload.clearFiles()
    }
    const submitData = function () {
      ctx.$refs.upload.submit();
    }
    const previewFile = function (file: AnalyserOptions) {
      console.log(1);

    }
    const handlePictureCardPreview = function (file: AnalyserOptions) {
      dialogVisible.value = true
      // @ts-ignore
      dialogImageUrl.value = file.url
    }
    const handleRemove = function (file: AnalyserOptions) {
      srcRes.nums = 0
      srcRes.pre_res = ''
    }
    const distinguishPhoto = function () {
      let len = ctx.$refs.upload.uploadFiles.length
      if (len == 0) {
        return ctx.$message.error('您还未上传图片!!')
      }
      ctx.$refs.upload.submit();
    }

    return {
      uploadFile, submitData, onExceed,
      previewFile, dialogVisible, dialogImageUrl,
      handleRemove, handlePictureCardPreview,
      distinguishPhoto, ...toRefs(srcRes)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 600px;
  @media only screen and(max-width:800px) {
    width: 300px;
  }
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
    width: 130px;
    height: 100%;
    // position: absolute;
    // top: 50%;
    // left: 50%;
  }
}
</style>