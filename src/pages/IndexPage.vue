<template>
  <!--引用组件-->
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
const {tags} = route.query;

onMounted(async () => {
  const userListData = await myAxios.get('/user/match')
      .then(function (response) {
        console.log('/user/match succeed', response);
        Toast.success('请求成功！')
        console.log(response)
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/match error', error);
        Toast.fail('请求失败！')
      })
  // 相当于finally，一定会执行
  // .then(function (response) {
  //   console.log(tags)
  // });
  if(userListData) {
    userListData.forEach(user =>{
      if(user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})
</script>

<style scoped>

</style>