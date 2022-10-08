<template>
  <!-- TODO 此处可以设置为星球ID，因为数据库现在不是每个人都有星球ID，所以暂时设置为userId-->
  <van-card v-for="user in props.userList"
            :title="`${user.username} (${user.id})`"
            :desc="user.profile"
            :thumb="user.avatarUrl"
  >
    {{ user }}
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px;">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {UserType} from "../models/User";
// 定义属性类型
interface UserCardProps{
  userList: UserType[];
}
// 定义变量
const props = withDefaults(defineProps<UserCardProps>(), {
  userList: props1 => [],
});
</script>

<style scoped>

</style>