<template>
  <van-button type="primary" @click="onCreate">创建队伍</van-button>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const onCreate = () => {
  router.push("/team/create");
}

</script>

<style scoped>

</style>