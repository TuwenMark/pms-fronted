<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选标签
  </van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>


  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    选择标签
  </van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";

const searchText = ref('');
const router = useRouter();

// 标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
    ],
  },
]

let tagList = ref(originTagList);
// /**
//  * 将搜索到的标签直接选中（不支持模糊搜索）
//  *
//  * @param val
//  */
// const onSearch = (val) => {
//   if (tagList.flatMap(parentTag => parentTag.children).flatMap(children => children.id).includes(searchText.value)) {
//     activeIds.value.push(searchText.value);
//   } else {
//     alert("您所搜索的标签不存在！")
//   }
// }

// const onSearch = (val) => {
//   tagList.value = originTagList.value.map(parentTag => {
//     const tempParentTag = [...parentTag];
//     const tempChildren = [...parentTag.children];
//     tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
//     return tempParentTag;
//   })
// }

const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempParentTag = {...parentTag};
    const tempChildren = [...parentTag.children];
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
}


const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const close = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<style scoped>

</style>