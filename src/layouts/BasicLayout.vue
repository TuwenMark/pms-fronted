<template>
  <van-sticky :offset-top="0">
    <van-nav-bar
        title="主页"
        left-arrow
        @click-left="onClickIndexLeft"
        @click-right="onClickIndexRight"
        v-if="active==='index'"
    >
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>

    <van-nav-bar
        title="队伍"
        left-arrow
        @click-left="onClickTeamLeft"
        @click-right="onClickTeamRight"
        v-if="active==='team'"
    >
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
  </van-sticky>

  <div id="content">
    <router-view/>
  </div>


  <van-tabbar v-model="active" @change="onChange">
    <!--  <van-tabbar route @change="onChange">-->
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">我的</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import {ref} from 'vue';
import {Toast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()

/**
 * 主页左上角返回
 */
const onClickIndexLeft = () => {
  router.back();
};
/**
 * 主页右上角搜索
 */
const onClickIndexRight = () => {
  router.push('/index/search');
};

/**
 * 队伍页面左上角返回
 */
const onClickTeamLeft = () => {
  router.back();
}
/**
 * 队伍页面右上角搜索
 */
const onClickTeamRight = () => {
  router.push('/team/search');
}
const active = ref("index");
const onChange = (index) => Toast(`标签 ${index}`);

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>