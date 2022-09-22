<template>
  <div class="login">
    123
    <div class="login-container">
      <h3 class="login-title">欢迎登录 ZYewon 交流社区后台</h3>
      <div class="login-content">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" :prefix-icon="Check" />
          </el-form-item>
          <el-form-item>
            <div class="svg" v-html="svg" @click="captcha"></div>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button type="primary" class="submit-btn" @click="submit"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { User, Lock, Check } from "@element-plus/icons-vue";
import { ElForm, ElMessage } from "element-plus";
import { v4 as uuid } from "uuid";
import globalStore from "store/global";
import UserStore from "store/user";
import MenuStore from "store/menu";
import { isEmpty } from "@/libs";
import { getCaptcha } from "api/public";
import { loginAsync } from "api/login";
const loginFormRef = ref<InstanceType<typeof ElForm>>();
const loginForm = reactive({
  username: "",
  password: "",
  code: "",
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: "请输入正确的邮箱",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
    { min: 4, max: 4, message: "验证码长度不正确" },
  ],
});
const store = globalStore();
const userStore = UserStore();
const menuStore = MenuStore();
const svg = ref<string>("");
// 获取验证码
const getCaptchaAsync = async () => {
  let id = "";
  if (isEmpty(store.sid)) {
    id = uuid();
    store.setSid(id);
  } else {
    id = store.sid;
  }
  const res = await getCaptcha(id);
  if (res.code !== 200) {
    return ElMessage.error(res.msg as string);
  }
  svg.value = res.data;
};
onMounted(() => {
  getCaptchaAsync();
});
// 获取验证码
const captcha = () => {
  getCaptchaAsync();
};
const router = useRouter();
// 登录
const submit = async () => {
  const isValid = await loginFormRef.value?.validate();
  if (!isValid) return;
  // 登录
  const params = { ...loginForm, sid: store.sid };
  const res = await loginAsync(params);
  if (res.code !== 200) {
    return ElMessage.error(res.msg as string);
  }
  userStore.setIsLogin(true);
  userStore.setToken(res.data.token);
  userStore.setUserInfo(res.data.data);
  ElMessage.success("登陆成功");
  await menuStore.getMenuListAsync();
  await menuStore.addRoutes();
  router.replace({ name: "home" });
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    margin-left: -150px;
    width: 300px;
    // transform: translateY(-50%);
    background-color: #fff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    .login-title {
      margin: 0px 0 10px 0;
      text-align: center;
      font-weight: 700;
    }
    .login-content {
      margin: 10px 0 0 0;
    }
    .submit {
      display: flex;
      justify-content: center;
      .submit-btn {
        width: 150px;
        border-radius: 10px;
      }
    }
    .svg {
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  }
}
</style>
