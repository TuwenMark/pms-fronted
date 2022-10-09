<template>
  <van-button type="primary" @click="onCreate">创建队伍</van-button>
  <team-card-list :team-list="teamList"/>
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

onMounted( async () => {
  const res = await myAxios.get("/team/list")
  if (res.data && res.code === 20000) {
    teamList.value = res.data;
  } else {
    Toast.fail("队伍加载失败，请稍后刷新重试！");
  }
})
</script>

<style scoped>

</style>