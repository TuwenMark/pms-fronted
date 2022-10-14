<template>
  <van-button type="primary" @click="onCreate">创建队伍</van-button>
  <van-search v-model="searchText" placeholder="请输入搜索关键词"  @search="onSearch"/>
  <team-card-list :team-list="teamList"/>
  <van-empty v-if="teamList?.length < 1" description="暂无符合条件的队伍" />
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {Toast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";

const router = useRouter();
const onCreate = () => {
  router.push("/team/create");
}

const teamList = ref([]);
const searchText = ref("");

const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list", {
    params:{
      keyWords: val,
    },
  });
  if (res.data && res.code === 20000) {
    teamList.value = res.data;
  } else {
    Toast.fail("队伍加载失败，请稍后刷新重试！");
  }
}
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
}
</script>

<style scoped>

</style>