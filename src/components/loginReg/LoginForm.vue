<template>
  <el-form
    ref="loginForms"
    :model="loginUser"
    :rules="rules"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="loginUser.email"
        placeholder="Enter Email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleLogin('loginForms')"
        type="primary"
        class="submit-btn"
        >提交</el-button
      >
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>
        忘记密码？
        <a>立即找回</a>
      </p>
    </div>
  </el-form>
</template>

<script lang="ts">
import Base64 from "@/utils/samll/base64";
import { getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { loginAuth } from "@/utils/api/getData";
export default {
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    const open = function (params: Object) {
      ElMessageBox.confirm(
        "你的账户还未激活，选择激活我们将给您的邮箱发送一个激活地址，进入邮箱中确认激活哦",
        "激活账户",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "激活",
          cancelButtonText: "取消",
        }
      )
        .then(async () => {
          let data = params;
          const { data: res } = await proxy.$http.put("/isactive", data);
          if (res.status_code == 1) {
            ElMessage({
              type: "success",
              message: "我们给您的邮箱发送已发送激活地址",
            });
          }
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
    // 触发登录方法
    const handleLogin = (formName: string) => {
      proxy.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          FormData();
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    // 进行表单的提交
    const FormData = async function () {
      const { email, password } = proxy.loginUser;
      const { data: res } = await loginAuth({
        params: {
          email,
          password,
        },
      });
      if (res.status_code == 1) {
        let bs = new Base64();
        for (let i in res.data) {
          if (typeof res.data[i] == "string") {
            res.data[i] = bs.encode(res.data[i]); // 进行加密处理
          }
        }
        localStorage.setItem("token", JSON.stringify(res.data));
        // console.log(res.data.username);
        proxy.$cookie.setCookie("e_id", res.data.email);
        proxy.$cookie.setCookie("u_id", res.data.username);
        proxy.$message.success(res.msg);
        proxy.$router.replace("/home");
      } else if (res.status_code == -2) {
        open({ email, password });
      } else {
        proxy.$message.error(res.msg);
      }
    };
    return { handleLogin, open };
  },
};
</script>
<style lang="scss" scoped>
/* form */
.loginForm {
  margin: 0 14px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  @media only screen and(max-width:800px) {
    // margin-top: 100px;
  }
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>