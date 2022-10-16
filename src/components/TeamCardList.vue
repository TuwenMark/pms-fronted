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
        <van-button type="primary" size="mini" @click="doJoinTeam(team.teamId)">
          加入
        </van-button>
        <van-button v-if="team.leaderId === currentUser.id" type="primary" size="mini"
                    @click="toUpdatePage(team.teamId)">
          更新
        </van-button>
        <van-button type="primary" size="mini" @click="doQuitTeam(team.teamId)">
          退出
        </van-button>
        <van-button v-if="team.leaderId === currentUser.id" type="primary" size="mini"
                    @click="doDeleteTeam(team.teamId)">
          解散
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

/**
 * 跳转到更新页面
 *
 * @param id 待更新队伍ID
 */
const toUpdatePage = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 *
 * @param id 队伍ID
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.get("/team/quit", {
    params: {
      teamId: id,
    }
  });
  if (res?.data && res?.code === 20000) {
    Toast.success("退出队伍成功！");
    router.push("/team");
  } else {
    Toast.fail("退出队伍失败," + (res.description ? res.description : ''));
  }
  router.push("/supplier/allBack");
}

/**
 * 解散队伍
 *
 * @param id 队伍ID
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.delete("/team/delete", {
    params: {
      teamId: id,
    }
  });
  if (res.data && res.code === 20000) {
    Toast.success("解散队伍成功！");
  } else {
    Toast.fail("解散队伍失败，" + (res.description ? res.description : ''));
  }
  router.push("/supplier/allBack");
}
</script>

<style scoped>

#teamCard :deep(.van-image__img) {
  height: 120px;
}

</style>