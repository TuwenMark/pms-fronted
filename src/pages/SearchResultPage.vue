<template>
  <user-card-list :user-list="userList"/>

  <van-empty v-if="!userList || userList.length < 1" description="暂无符合条件的伙伴" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
const {tags} = route.query;

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        Toast.success('请求成功！')
        console.log(response)
        return response.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error);
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
const mockUser = {
  id: 1234,
  username: 'yupi',
  userAccount: 'yupi256',
  avatarUrl: 'https://csdnimg.cn/release/blogv2/dist/pc/img/original.png',
  profile: '你好，我是鱼皮，一名货真价实的大佬，请多多关照！',
  gender: 0,
  phone: '123456789',
  email: '123456@163.com',
  createTime: new Date(),
  userRole: 0,
  planetCode: 12345,
  tags: ['Java', 'C++', 'emo', '打工人', 'Go', 'Java', 'C++', 'emo', '打工人', 'Go'],
}
</script>

<style scoped>

</style>