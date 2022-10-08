<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="user_account"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="user_password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <van-button round to="/user/login/code" size="mini" style="margin-left: 250px">使用验证码登录</van-button>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";


const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  // console.log(res, "用户登录");
  if (res.code === 20000 && res.data) {
    Toast.success("登录成功！");
    // sessionStorage 属性允许在浏览器中存储 key/value 对的数据，在关闭窗口或标签页之后将会删除这些数据。
    sessionStorage.setItem('token', res.data);
    const token = sessionStorage.getItem('token');
    console.log('设置的token：' + token);
    router.replace("/");
  } else {
    Toast.fail("登录失败！");
  }
};

</script>

<style scoped>

</style>