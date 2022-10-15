<template>
  <van-nav-bar
      title="队伍"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <van-button type="primary" @click="onCreate">创建队伍</van-button>

  <van-tabs v-model:active="activeName" swipeable>
    <van-tab title="所有队伍" name="all">
      <team-card-list :team-list="teamList"/>
    </van-tab>
    <van-tab title="我的队伍" name="my" @click="searchMyTeams(id)">
      <team-card-list :team-list="myTeamList"/>
    </van-tab>
  </van-tabs>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {Toast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";
import axios from "axios";
import {getCurrentUser} from "../../services/user.ts";

const router = useRouter();
const onCreate = () => {
  router.push("/team/create");
}

/**
 * 点击左上角返回
 */
const onClickLeft = () => {
  // router.back();
  Toast("返回")
}

/**
 * 点击右上角搜索
 */
const onClickRight = () => {
  Toast("搜索")
}

const id = ref("");
const teamList = ref([]);
const myTeamList = ref([]);

onMounted( async () => {
  const res = await myAxios.get("/team/list")
  const user = await getCurrentUser();
  id.value = user.id;
  if (res.data && res.code === 20000) {
    teamList.value = res.data;
  } else {
    Toast.fail("队伍加载失败，请稍后重试！");
  }
})

const searchMyTeams = async (id) => {
  const res = await axios.get("/team/myList", {
    params: {
      id,
    }
  })
  if (res.data && res.code===20000) {
    myTeamList.value = res.data;
  } else {
    Toast.fail("队伍加载失败，请稍后重试！")
  }
}

const activeName = ref('all');
</script>

<style scoped>

</style>