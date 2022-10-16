<template>

</template>

<script setup>

import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
onMounted(async () => {
  router.back();
})

</script>

<style scoped>

</style>