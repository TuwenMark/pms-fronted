<template>
  <div id="teamCreate">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="teamUpdateData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />
        <van-field
            v-model="teamUpdateData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            maxlength="100"
            placeholder="请输入队伍描述"
            show-word-limit
        />

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="teamUpdateData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="teamUpdateData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="teamUpdateData.expireTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              title="选择过期时间"
              :min-date="minDate"
              @confirm="showPicker = false"
              @cancel="showPicker = false"
          />
        </van-popup>

        <van-field name="radio" label="队伍类型">
          <template #input>
            <van-radio-group v-model="teamUpdateData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私密</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field v-if="Number(teamUpdateData.status) === 2"
                   v-model="teamUpdateData.password"
                   type="password"
                   name="password"
                   label="队伍密码"
                   placeholder="请输入队伍密码"
                   :rules="[{ required: true, message: '请填写队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();
// 展示日期选择器
const showPicker = ref(false);

const minDate = new Date();
const teamUpdateData = ref({});
const id = route.query.id;
onMounted(async () => {
  console.log(id);
  console.log(id);
  if (id <= 0) {
    Toast.fail("加载队伍失败！");
  }
  const res = await myAxios.get("/team/query", {
    params: {
      id: Number(id),
    }
  })
  if (res.data && res.code === 20000) {
    teamUpdateData.value = res.data;
  }
  console.log(teamUpdateData);
})

// 过期时间格式化处理函数，返回格式化后的日期
const timeFormatter = (originTime: Date) => {
  let date: Date = new Date(Date.parse(originTime))
  let separator1 = "-";
  let separator2 = ":";
  type stringOrNumber = (string | number);
  let months: stringOrNumber = date.getMonth() + 1;
  let days: stringOrNumber = date.getDate();
  let hours: stringOrNumber = date.getHours();
  let minutes: stringOrNumber = date.getMinutes();
  if (months >= 1 && months <= 9) {
    months = "0" + months;
  }
  if (days >= 0 && days <= 9) {
    days = "0" + days;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  return date.getFullYear() +
      separator1 +
      months +
      separator1 +
      days +
      " " +
      hours +
      separator2 +
      minutes +
      separator2 +
      "00";
}

const onSubmit = async () => {
  const postData = {
    ...teamUpdateData.value,
    maxNum: Number(teamUpdateData.value.maxNum),
    status: Number(teamUpdateData.value.status),
    expireTime: timeFormatter(teamUpdateData.value.expireTime)
  }
  // TODO 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  console.log(postData);
  if (res.data && res.code === 20000) {
    Toast.success("队伍修改成功！");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    Toast.fail("队伍修改失败！");
  }
}

</script>

<style scoped>

</style>