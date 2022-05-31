<!--
 * @Author: Harry
 * @Date: 2022-05-31 11:06:48
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-31 18:29:06
 * @FilePath: \xpalmworm\src\views\home\menu\med1\AddMed.vue
-->
<template>
  <h2 class="h2_w">添加害虫信息</h2>
  <el-row>
    <el-button type="info" title="" @click="edidAddMed(0)">+</el-button>
  </el-row>
  <el-dialog v-model="editMedAdd" :title="dialogTitle == '新增' ? '添加害虫信息' : '修改该害虫信息'" width="50%"
    :before-close="handleClose">
    <el-form ref="SubmitAddRef" label-width="120px" :model="ruleForm" :rules="medRules">
      <el-form-item label="上传图片" prop="img_url">
        <el-upload action="#" :on-change="onChange" :file-list="ruleForm.img_url" list-type="picture-card"
          :auto-upload="false" :on-remove="RemovePic">
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
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="害虫名称" prop="pest_name">
        <el-input v-model="ruleForm.pest_name" type="text" />
      </el-form-item>
      <el-form-item label="害虫类别" prop='base_cate'>
        <el-select v-model="ruleForm.base_cate" class="m-2" placeholder="选择类别">
          <el-option v-for="item in melists" :key="item.name" :label="item.label" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="害虫所属目科" prop="cate_sk">
        <el-input v-model="ruleForm.cate_sk" type="text" placeholder="格式如用英文逗号隔开：半翅目,蝽科" />
      </el-form-item>
      <el-form-item label="危害中草药名称" prop="harm_host">
        <el-input v-model="ruleForm.harm_host" type="textarea" />
      </el-form-item>
      <el-form-item label="害虫危害特点" prop="harm_feat">
        <el-input v-model="ruleForm.harm_feat" type="textarea" />
      </el-form-item>
      <el-form-item label="害虫防治措施" prop="control_measures">
        <el-input v-model="ruleForm.control_measures" type="textarea" />
      </el-form-item>
      <el-form-item>
        <span class="dialog-footer">
          <el-button @click="editMedAdd = false">取消</el-button>
          <el-button type="primary" @click="medsubmitForm('SubmitAddRef')" v-if="dialogTitle === '新增'">增加</el-button>
          <el-button type="primary" @click="mededitForm('SubmitAddRef')" v-else>修改</el-button>
        </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { tempImageInsects } from "@/utils/api/getData"
import { melists } from "@/utils/samll/zixunlists"
import { getCurrentInstance, reactive, ref, toRefs } from "vue"
export default {
  setup() {
    const editMedAdd = ref(false)
    const { proxy } = getCurrentInstance()! as any;
    // 编辑和新增害虫列表
    const validateCate = function (rule: {}, value: string, callback: Function) {
      if (value === '') {
        callback(new Error('请选择害虫类别'));
      } else {
        const reg = /^(.*?)[目|科],(.*?)[目|科]$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('按照格式填写（用英文逗号隔开）：半翅目,蝽科'))
        }
      }
    }
    // 规则相似、
    const textRule = [
      { required: true, message: 'Please input 详细信息', trigger: 'blur' },
      { min: 2, max: 500, message: 'Length should be 2 to 500', trigger: 'blur' },
    ]
    const state = reactive({
      ruleForm: {
        pest_name: '',
        cate_sk: '',
        harm_host: '',
        base_cate: '',
        harm_feat: '',
        control_measures: '',
        img_url: []
      },
      dialogTitle: '',
      fileLists: [],
      medRules: {
        pest_name: [
          { required: true, message: 'Please input pest_name', trigger: 'blur' },
          { min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur' },
        ],
        base_cate: [
          { required: true, message: 'Please input base_cate', trigger: 'blur' },
          { min: 4, max: 4, message: 'Length should be 4', trigger: 'blur' },
        ],
        cate_sk: [
          { validator: validateCate, trigger: 'blur' },
        ],
        harm_feat: textRule,
        harm_host: textRule,
        control_measures: textRule
      }
    })

    const onChange = function (e: any, uploadFiles: any) {
      console.log(e);
      if (uploadFiles.length > 1) {
        uploadFiles.shift()
      }
      const obj: any = { file_: e['raw'] }
      const formdata = new FormData()
      for (let i in obj) {
        formdata.append(i, obj[i])
        console.log(i);
      }
      const a = tempImageInsects(formdata)
      console.log(a);
      return
    }
    const edidAddMed = function (params: number) {
      editMedAdd.value = true
      if (params === 0) {
        state.dialogTitle = '新增'
      } else {
        state.dialogTitle = '修改'
      }
    }
    // 增加害虫信息
    const medsubmitForm = async (refs: any) => {
      const formEl = proxy.$refs[refs]
      console.log(formEl);
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 修改害虫信息
    const mededitForm = function () {

    }
    // // 请求分类列表
    // const getCateLists = function () {
    //   return 
    // }
    return {
      editMedAdd,
      edidAddMed,
      medsubmitForm,
      mededitForm,
      onChange,
      // getCateLists,
      ...toRefs(state),
      melists
    }
  }
}
</script>
<style lang='scss' scoped>
</style>