<template>
  <div id="teamCard">
    <van-card v-for="team in props.teamList"
              :title="`${team.name} (${team.teamId})`"
              :desc="team.description"
              :thumb="ikun"
    >
      {{ team }}
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 6px; margin-bottom: 6px;">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        {{ `人数：${team.currentNum} / ${team.maxNum}` }}
        <br/>
        {{ `创建时间：${team.createTime}` }}
        <br/>
        {{ `过期时间：${team.expireTime}` }}
      </template>

      <template #footer>
        <van-button type="primary" size="mini" @click="doJoinTeam(team.teamId)">加入队伍</van-button>
        <van-button v-if="team.leaderId === currentUser.id" type="primary" size="mini"
                    @click="toUpdatePage(team.teamId)">更新队伍
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/Team";
import {teamStatusEnum} from "../constants/team";
import ikun from "../assets/ikun.png"
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

// 定义属性类型
interface teamCardProps {
  teamList: TeamType[];
}

// 定义变量
const props = withDefaults(defineProps<teamCardProps>(), {
  teamList: props1 => [],
});

const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const router = useRouter();

/**
 * 加入队伍
 *
 * @param teamId
 */
const doJoinTeam = async (teamId: number) => {
  console.log("teamId:" + teamId);
  const res = await myAxios.post("/team/join", {
    teamId: teamId,
  });
  if (res?.data && res.code === 20000) {
    Toast.success("加入队伍成功！");
  } else {
    Toast.fail("加入队伍失败！" + (res.description ? res.description : ''))
  }
}

const toUpdatePage = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    }
  })
}
</script>

<style scoped>

#teamCard :deep(.van-image__img) {
  height: 120px;
}

</style>