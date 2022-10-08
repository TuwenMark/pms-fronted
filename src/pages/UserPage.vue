<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
    <van-cell title="电话号码" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话号码', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
  <div style="margin: 16px">
    <van-button round type="danger" size="large" @click="onLogout">退出登录</van-button>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.js";

// const user = {
//   id: 111,
//   username: '鱼皮',
//   userAccount: 'yupi',
//   avatarUrl: 'https://unpkg.com/@vant/assets/logo.png',
//   gender: '男',
//   phone: 1882345678,
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
  // const res = await getCurrentUser();
  // if (res.code === 20000 && res.data) {
  //   Toast.success("用户信息获取成功！");
  //   user.value = res.data;
  // } else {
  //   Toast.fail("获取用户信息失败！");
  // }
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      id: user.value.id,
      editKey,
      editName,
      currentValue,
    }
  });
}

const onLogout = async () => {
  const res = await myAxios.get("/user/logout");
  if (res.code === 20000) {
    Toast.success("退出登录成功！");
    localStorage.removeItem("token");
    router.replace("/user/login");
  } else {
    Toast.fail("退出登录失败！");
  }
}
</script>

<style scoped>

</style>