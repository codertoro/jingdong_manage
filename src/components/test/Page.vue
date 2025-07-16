<template>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 100]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { ComponentSize } from 'element-plus'

defineProps<{ total: number }>();
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>('default')
const background = ref(true)
const disabled = ref(false)
const emit =  defineEmits(['page-change', 'size-change'])


const handleSizeChange = (size: number) => {
  console.log(`${size} items per page`)
  pageSize.value = size
  currentPage.value = 1
  emit('size-change', size)
}
const handleCurrentChange = (page: number) => {
  console.log(`current page: ${page}`)
  currentPage.value = page;
  emit("page-change", page)
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>