<template>

  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />
    <el-table-column align="right">
      <template #header class="header-search">
        <el-row :gutter="20">
          <el-col :span="22">
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small"  circle ><el-icon><Plus /></el-icon></el-button>
          </el-col>
        </el-row>

      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'
import axios from "../axios/axios.ts";
import type {Order} from "../type/order.ts"


const search = ref('')

const tableData = ref<Order[]>([

])

// const filterTableData = computed(() =>
//     tableData.value.filter(
//         (data) =>
//             !search.value ||
//             data.name.toLowerCase().includes(search.value.toLowerCase())
//     )
// )
//
// const handleEdit = (index: number, row: User) => {
//   console.log(index, row)
// }
//
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }

async function getOrderData() {
 const response = await axios.get("/admin/orders");
  if (response.status === 200) {
   tableData.value = response.data.records;
  } else {
    console.error("Failed to fetch data");
  }
}
onMounted(()=> {
  getOrderData();
});
</script>

<style scoped>
</style>