<template>
  <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :placeholder="placeholder"
      @select="handleSelect"
      @keydown.enter.native = "onEnter"
  />
</template>

<script lang="ts" setup>
import {debounce} from "lodash";
import {useRoute} from 'vue-router';
import {computed, onMounted, ref, watch} from 'vue'
import { useGlobalSearch } from '@/stores/globalSearch'
import { useSearchTrigger } from '@/stores/searchTrigger'

const triggerStore = useSearchTrigger()

const state = ref('')
const searchStore = useGlobalSearch()
const route = useRoute()
const placeholder = computed(() => {
  return route.meta.searchPlaceholder
})
// ✅ 防抖触发查询
const debounceTriggerSearch = debounce((query: string) => {
  searchStore.setQueryString(query)
  triggerStore.trigger()
}, 500)
// 自动同步到全局搜索关键词
watch(state, (val) => {
  const trimmedVal = val.trim()
  searchStore.setQueryString(trimmedVal)
  debounceTriggerSearch(trimmedVal)
})
const onEnter = () => {
  // 触发搜索事件
  searchStore.setQueryString(state.value.trim())
  triggerStore.trigger()
}

// 输入建议联想数据
interface LinkItem {
  value: string
  link: string
}
const links = ref<LinkItem[]>([])

const loadAll = () => [
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
]

// 异步搜索模拟
let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 300 + 200 * Math.random()) // 建议不要用 3000，体验太慢
}

const createFilter = (queryString: string) => {
  return (item: LinkItem) =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
}

const handleSelect = (item: LinkItem) => {
  state.value = item.value
  searchStore.setQueryString(item.value)
}

onMounted(() => {
  links.value = loadAll()
})
</script>

<style scoped>

</style>