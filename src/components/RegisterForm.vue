<template>
  <el-form
    ref="registerForm"
    :model="registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerUser.username" placeholder="Enter UserName..."></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerUser.email" placeholder="Enter Email..."></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerUser.password" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="registerUser.password2" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>

    <el-form-item label="选择身份">
      <el-select v-model="registerUser.role" placeholder="请选择身份">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="用户" value="user"></el-option>
        <el-option label="游客" value="visitor"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleRegister('registerForm')" type="primary" class="submit-btn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
// import axios from 'axios' // 仅限在当前组件使用
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(prop: any) {
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    const handleRegister = (formName: string) => {
      ctx.$refs[formName].validate(async (valid: boolean) => {
        if (valid) {
          const { data: res } = await ctx.$http.post('/proxy/api', {
            data: prop.registerUser
          })
          if (res.status_code == 1) {
            ctx.$message.success(res.msg)
          } else {
            ctx.$message.error(res.msg)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };


    return { handleRegister };
  },
};
</script>
<style scoped>
</style>