<template>
  <!-- 标签页组件 -->
  <el-tabs
      v-model="currentTab"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="handleTabRemove"
  >
    <el-tab-pane
        v-for="tab in editableTabs"
        :key="tab.name"
        :label="tab.title"
        :name="tab.name"
        :closable="tab.closable !== false"
    >
      <div class="router-view" v-if="tab.name === currentTab">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tabStore'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

// 当前 tab 的绑定值
const currentTab = ref('')

// 所有已打开的 tab，来自 Pinia Store
const editableTabs = computed(() => tabStore.tabs)
// const title = ref(;

/**
 * 将当前路由封装成一个 tab 对象
 */
function createTabFromRoute() {
  const isHome = route.path === '/'
  return {
    title: route.meta.title?.toString() || route.name?.toString() || '首页',
    name: route.fullPath,
    path: route.fullPath,
    closable: !isHome, // 首页不可关闭
  }
}

// 监听 tabStore 中 activeTab 的变化 → 更新当前 tab
watch(
    () => tabStore.activeTab,
    (newActiveTab) => {
      if (newActiveTab) {
        currentTab.value = newActiveTab
      }
    },
    { immediate: true }
)

// 路由变化时自动添加新 tab
watch(
    () => route.fullPath,
    () => {
      setTimeout(() => {
        const newTab = createTabFromRoute()
        tabStore.addTab(newTab)
        currentTab.value = newTab.name
      }, 50)
    },
    { immediate: true }
)

// 页面首次加载时设置当前 tab
onMounted(() => {
  const initialTab = createTabFromRoute()
  currentTab.value = initialTab.name
})

// 切换 tab 时，进行路由跳转
watch(currentTab, (newTabName) => {
  const targetTab = tabStore.tabs.find(tab => tab.name === newTabName)
  if (targetTab && route.fullPath !== targetTab.path) {
    tabStore.setActive(newTabName)
    router.push(targetTab.path)
  }
})

// 关闭 tab 时，跳转到激活的 tab（由 store 决定）
function handleTabRemove(targetName: string) {
  if (targetName === '/') {
    // 首页不可关闭
    return
  }
  console.log(targetName+"hahah")
  tabStore.removeTab(targetName)
  if (tabStore.activeTab && targetName !== tabStore.activeTab) {
    currentTab.value = tabStore.activeTab
    router.push(tabStore.activeTab)
  }
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

/* 调整嵌套路由显示位置 */
.router-view {
  margin-top: -30px;
  margin-left: -30px;
}
</style>