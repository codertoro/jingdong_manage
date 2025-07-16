<template>
  <el-table :data="filterTableData" height="600"  style="width: 100%">
    <el-table-column
        label="序号"
        type="index"
        width="60"
        :index="indexMethod"
    />
    <el-table-column prop="orderNo" label="订单号" />
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="userPhone" label="电话" />
    <el-table-column prop="shopName" label="店铺名" />
    <el-table-column prop="orderAmount" label="金额（¥）" />
    <el-table-column prop="payStatus" label="支付状态">
      <template #default="scope">
        <el-tag :type="scope.row.payStatus === PayStatus.Success ? 'success' : 'warning'">
          {{ PayStatusText[scope.row.payStatus as PayStatus] }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="orderStatus" label="订单状态">
      <template #default="scope">
        <el-tag>{{ OrderStatusText[scope.row.orderStatus as OrderStatus] }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime">
      <template #default="scope">
        {{ formatTime(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="在当前页搜索..." clearable />
<!--        <el-row :gutter="10">-->
<!--          <el-col :span="20">-->
<!--            <el-input v-model="search" size="small" placeholder="搜索用户名..." clearable />-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-button type="primary" size="small" circle @click="getOrderData">-->
<!--              <el-icon><Plus /></el-icon>-->
<!--            </el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </template>
      <template #default="scope">
        <el-button size="small" type="text" @click="handleEdit(scope.row)">详情</el-button>
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <Page
        :total = "total"
        @page-change="handlePageChange"
        @size-change="handlePageSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import Page from "@/components/test/Page.vue";
import { ref, computed, onMounted } from 'vue'
import axios from '@/axios/axios'
import type { Order } from '@/type/order'
import { PayStatus, OrderStatus } from '@/enums/orderStatus'


const indexMethod = (index: number) => index + 1
// 显示映射（枚举 → 文本）
const PayStatusText = {
  [PayStatus.Pending]: '待支付',
  [PayStatus.Success]: '支付成功',
}
const OrderStatusText = {
  [OrderStatus.Unpaid]: '未支付',
  [OrderStatus.Paid]: '已支付',
  [OrderStatus.Cancelled]: '已取消',
  [OrderStatus.Undelivered]: '未发货',
  [OrderStatus.Delivered]: '已发货',
}

const search = ref('')
const tableData = ref<Order[]>([])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

function handlePageChange(page: number) {
  currentPage.value = page
  getOrderData()
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  getOrderData()
}

// const filterTableData = computed(() =>
//     tableData.value.filter((order) =>
//         order.userName.toLowerCase().includes(search.value.toLowerCase())
//     )
// )
const filterTableData = computed(() =>
    tableData.value.filter((order) => {
      const keyword = search.value.toLowerCase()
      return (
          order.userName.toLowerCase().includes(keyword) ||
          order.userPhone.toLowerCase().includes(keyword) ||
          order.orderNo.toLowerCase().includes(keyword) ||
          order.shopName.toLowerCase().includes(keyword)
      )
    })
)
async function getOrderData() {
  try {
    const response = await axios.get('/order/admin/orders/all',{
      params: {
        token: "123",
        page: currentPage.value,
        size: pageSize.value,
      },
    })
    if (response.status === 200 && response.data?.data.records) {
      console.log('获取订单数据成功', response.data.data.records)
      tableData.value = response.data.data.records
      total.value = response.data.data.total;
    } else {
      console.error('获取订单数据失败')
    }
  } catch (error) {
    console.error('请求异常', error)
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString()
}

function handleEdit(order: Order) {
  console.log('编辑订单', order)
}

function handleDelete(order: Order) {
  console.log('删除订单', order)
}

onMounted(() => {
  getOrderData()
})
</script>

<style scoped>
.pagination{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

</style>