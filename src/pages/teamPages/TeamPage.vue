<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索的关键词"
        @search="searchByKeyWords(activeName, searchText)"
        @cancel="searchTeams(activeName, searchText)"
    />
  </form>
  <van-tabs v-model:active="activeName" swipeable @click-tab="searchByKeyWords(activeName, searchText)">
    <van-tab title="所有队伍" name="all">
      <team-card-list :team-list="teamList"/>
    </van-tab>
    <van-tab title="我的队伍" name="my">
      <team-card-list :team-list="myTeamList"/>
    </van-tab>
  </van-tabs>
  <van-empty v-if="teamList?.length < 1" description="暂无符合条件的队伍"/>

  <van-empty mage-size="100" description="已经到底啦~"
             style="--van-empty-image-size: 0px; --van-empty-padding: 0px; --van-empty-description-font-size:10"
  />

  <div style="padding-left: 310px">
    <van-sticky :offset-bottom="70" position="bottom">
      <van-button icon="plus" round type="primary" to="/team/create"></van-button>
    </van-sticky>
  </div>


</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {Toast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";

const router = useRouter();
const teamList = ref([]);
const myTeamList = ref([]);
const searchText = ref("");

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

const listTeams = async (keyWords: string) => {
  const res = await myAxios.get("/team/list", {
    params: {
      keyWords: keyWords,
    }
  });
  if (res.data && res.code === 20000) {
    teamList.value = res.data;
  } else {
    Toast.fail("队伍加载失败，请稍后重试！");
  }
}

onMounted(() => {
  // user.value = await getCurrentUser();
  listTeams("");
})

const activeName = ref('all');

const searchByKeyWords = async (activeName: string, searchText: string) => {
  if (activeName === 'all') {
    listTeams(searchText);
  } else {
    const res = await myAxios.get("/team/list/my", {
      params: {
        keyWords: searchText,
      }
    })
    if (res.data && res.code === 20000) {
      myTeamList.value = res.data;
    }
  }
}

const searchTeams = (activeName: string, searchText: string) => {
  searchByKeyWords(activeName, searchText);
}
</script>

<style scoped>

</style>