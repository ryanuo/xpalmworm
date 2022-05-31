<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-12-02 18:06:24
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-31 22:17:17
 * @LastEditors: harry
-->
<template>
  <div class="ranking_w">
    <!-- <add-med /> -->
    <h2 class="h2_w">添加害虫信息</h2>
    <el-row>
      <el-button type="info" title="" @click="edidAddMed(0)">+</el-button>
    </el-row>
    <el-dialog v-model="editMedAdd" :title="dialogTitle == '新增' ? '添加害虫信息' : '修改该害虫信息'" width="50%"
      :before-close="medhandleClose">
      <el-form ref="SubmitAddRef" label-width="120px" :model="ruleForm" :rules="medRules">
        <el-form-item label="上传图片" prop="img_url">
          <el-upload action="#" :on-change="onChange" :file-list="ruleForm.img_url" list-type="picture-card"
            :auto-upload="false" :on-remove="RemovePic">
            <el-icon>
              <Plus />
            </el-icon>
            <template #file="{ file }">
              <!-- {{ file }} -->
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
        <el-form-item label="危害草药名称" prop="harm_host">
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
            <el-button @click="medhandleClose">取消</el-button>
            <el-button type="primary" @click="medsubmitForm('SubmitAddRef', 0)" v-if="dialogTitle === '新增'">增加
            </el-button>
            <el-button type="primary" @click="medsubmitForm('SubmitAddRef', 1, ruleForm.pid)" v-else>修改</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <h2 class="h2_w">中草药害虫列表</h2>
    <!-- 积分操作列表 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in melists" :key="item.uid" :label="item.label" :name="item.name">
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column align="center" type="index" label="#" width="50" />
          <el-table-column align="center" label="图像" width="100">
            <template #default="props">
              <el-image v-if="props.row.pest_name" :src="url_f + props.row.pest_name + '.jpg'"
                :preview-src-list="srcList" :initial-index="1" @click.stop="handleClickItem"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="pest_name" label="害虫名称" width="120" />
          <el-table-column align="center" prop="cate_sk" label="类别" width="150">
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
          <el-table-column align="center" prop="harm_host" label="危害寄主" width="260" />
          <el-table-column align="center" prop="harm_feat" label="危害特点" />
          <el-table-column align="center" prop="control_measures" label="防治措施" />
          <el-table-column align="center" label="操作" width="200">
            <template #default="props">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="edidAddMed(1, props.row)" circle>
              </el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(props.row)" circle>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页模式 -->
    <br />
    <el-pagination background v-model:currentPage="currentPage" :page-sizes="[5, 10, 20, 50]"
      v-model:page-size="pagesize" layout="sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="currentChange" :total="total"></el-pagination>
  </div>
</template>

<script lang="ts">
import { handleClickItem } from "@/utils/samll/maskdia";
import { melists } from "@/utils/samll/zixunlists";
import { addPest, tempImageInsects, updatePest } from "@/utils/api/getData"
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { getInsectsList } from "@/utils/api/getData";
import { ElNotification } from "element-plus";
// import AddMed from '@/views/home/menu/med1/AddMed.vue'
export default {
  name: "Rank",
  // components: { AddMed },
  // emits: ["handleSizeChange", "currentChange", 'handleClickItem'],
  setup() {
    // 获取数据
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    let activeName = ref("草本害虫");
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
        pagenum: fn.currentPage
      };
      const { data: res } = await getInsectsList({ params });
      if (res.status_code == 1) {
        fn.tableData = res.data;
        fn.total = res.total;
        fn.srcList = res.data.map((v: any) => url_f + v.pest_name + ".jpg");
      }
    };
    const deleteMed = function (key: Object) {
      console.log(key);
      const data = {
        // @ts-ignore
        pid: key["pid"],
      };
      proxy.$http.delete("/insects", { data });
    };
    const editMedAdd = ref(false)
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
      { min: 2, max: 5000, message: 'Length should be 2 to 500', trigger: 'blur' },
    ]
    const state = reactive({
      ruleForm: {
        pest_name: '',
        cate_sk: '',
        harm_host: '',
        base_cate: '',
        harm_feat: '',
        control_measures: '',
        img_url: [],
        pid: ''
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
    // 上传图片时变化
    const onChange = async function (e: any, uploadFiles: any) {
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
      const { data: res } = await tempImageInsects(formdata)
      if (res.status_code === 1) {
        //@ts-ignore
        state.ruleForm.img_url = [{ name: res.data, url: res.data }]
      }
      console.log(res);
      return
    }
    // 当页面关闭时
    const medhandleClose = function () {
      for (let i in state.ruleForm) {
        if (i !== 'img_url') {
          // @ts-ignore
          state.ruleForm[i] = '';
        } else {
          state.ruleForm['img_url'] = []
        }
      }
      editMedAdd.value = false
    }
    // 编辑修改具体操作
    const editCurrentMed = function (key: any) {
      const item = key['img_url']
      const img_url = [{
        name: item,
        url: item
      }]
      Object.assign(state.ruleForm, key, { img_url })
      console.log(state.ruleForm);
    };
    // 新增和更新框的展示与隐藏
    const edidAddMed = function (params: number, key: Object) {
      editMedAdd.value = true
      if (params === 0) {
        state.dialogTitle = '新增'
      } else {
        state.dialogTitle = '修改'
        console.log(key);
        editCurrentMed(key)
      }
    }
    // 增加或者更新害虫信息
    const medsubmitForm = async (refs: any, type: number, pid = null) => {
      const formEl = proxy.$refs[refs]
      console.log(formEl);
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          if (type === 0) {
            addmedDetail()
          } else {
            updateMed(pid)
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 新增信息
    const addmedDetail = async function () {
      const params = state.ruleForm
      const { data: res } = await addPest(params)
      ElNotification({
        title: '提示',
        message: res.msg,
        type: res.status_code === 1 ? 'success' : 'error'
      })
      console.log(res);
    }
    // 更新某一类信息
    const updateMed = async function (p: any) {
      const params = state.ruleForm
      const { data: res } = await updatePest(params)
      ElNotification({
        title: '提示',
        message: res.msg,
        type: res.status_code === 1 ? 'success' : 'error'
      })
      getMedList()
      // const a = fn.tableData.findIndex(v => v['pid'] === p)
      // console.log(a);
      // //@ts-ignore
      // fn.tableData[a]['img_url'] = state.ruleForm['img_url']
      setTimeout(() => { medhandleClose() })
      console.log(res);
    }
    // // 请求分类列表
    // const getCateLists = function () {
    //   return 
    // }
    onMounted(() => {
      // 获取数据
      // console.log('object');
      getMedList();
    });
    return {
      ...toRefs(fn),
      editMedAdd,
      edidAddMed,
      medsubmitForm,
      onChange,
      // getCateLists,
      ...toRefs(state),
      melists,
      handleSizeChange,
      currentChange,
      deleteMed,
      medhandleClose,
      activeName,
      handleClick,
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