<template>
  <van-cell-group inset>
    <van-field
        v-model="phoneNumber"
        required
        label="手机号"
        placeholder="请输入手机号"
    />
    <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button size="small" type="primary" @click="onSend">发送验证码</van-button>
      </template>
    </van-field>
  </van-cell-group>

  <van-button round to="/user/login" size="mini" style="margin-left: 240px">使用账号密码登录</van-button>

  <van-form @submit="onSubmit">
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

const phoneNumber = ref('');
const code = ref('');

const onSend = async () => {
  const res = await myAxios.post("/user/code", {
    phoneNumber: phoneNumber.value,
  })
  switch (res.code) {
    case 20000:
      Toast.success("验证码发送成功！");
      break;
    case 42900:
      Toast.fail("当前验证码仍然有效，请勿重复发送");
      break;
    default:
      Toast.fail("验证码发送失败！");
      break;
  }
}

const onSubmit = async () => {
  const res = await myAxios.post("/user/login/phone", {
    phoneNumber: phoneNumber.value,
    code: code.value,
  })
  // console.log(res, "用户登录");
  if (res.code === 20000 && res.data) {
    Toast.success("登录成功！");
    sessionStorage.setItem('token', res.data);
    router.replace("/");
  } else {
    Toast.fail("登录失败！");
  }
};

</script>

<style scoped>

</style>