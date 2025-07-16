<template>
  <div>
<!--    <div style="margin-bottom: 10px; display: flex; gap: 10px;">-->
<!--      <el-input v-model="search" size="small" placeholder="在当前页 搜索订单号/用户名/电话/店铺名..." clearable />-->
<!--      <el-button size="small" @click="resetFilters">重置筛选</el-button>-->
<!--    </div>-->

    <el-table
        ref="tableRef"
        :data="filterTableData"
        height="600"
        style="width: 100%"
    >
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

      <el-table-column
          prop="payStatus"
          label="支付状态"
          :filters="[
          { text: '待支付', value: PayStatus.Pending },
          { text: '支付成功', value: PayStatus.Success }
        ]"
          :filter-method="filterPayStatus"
          filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.payStatus === PayStatus.Success ? 'success' : 'warning'">
            {{ PayStatusText[scope.row.payStatus as PayStatus] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="orderStatus"
          label="订单状态"
          :filters="[
          { text: '未支付', value: OrderStatus.Unpaid },
          { text: '已支付', value: OrderStatus.Paid },
          { text: '未发货', value: OrderStatus.Undelivered },
          { text: '已发货', value: OrderStatus.Delivered },
          { text: '已取消', value: OrderStatus.Cancelled }
        ]"
          :filter-method="filterOrderStatus"
      >
        <template #default="scope">
          <el-tag :type="scope.row.orderStatus === OrderStatus.Paid ? 'success' : 'warning'">
            {{ OrderStatusText[scope.row.orderStatus as OrderStatus] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime">
        <template #default="scope">
          {{ formatTime(scope.row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template #default="scope">
          <el-button  size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
          <el-button  size="small" type="warning"  @click="handleEdit(scope.row)">编辑</el-button>
          <el-button  size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <Page
          :total="total"
          @page-change="handlePageChange"
          @size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Order'
})
import {ref, computed, onMounted, watch,onActivated,onDeactivated} from 'vue'
import Page from '@/components/test/Page.vue'
import axios from '@/axios/axios.ts'
import type { Order } from '@/type/order.ts'
import { PayStatus, OrderStatus } from '@/enums/orderStatus.ts'
import type { TableInstance } from 'element-plus'
import {useGlobalSearch} from "@/stores/globalSearch.ts";
import { useSearchTrigger } from '@/stores/searchTrigger.ts'
import { useRouter } from 'vue-router'
import { openEmailPrompt } from '@/utils/messageBox'
const router = useRouter()
const triggerStore = useSearchTrigger()


const searchStore = useGlobalSearch()
const tableRef = ref<TableInstance>()
const search = ref('')
const tableData = ref<Order[]>([])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const hasLoaded = ref(false)

// 表格序号
const indexMethod = (index: number) => index + 1

// 枚举映射文字
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

// 筛选器方法
const filterPayStatus = (value: PayStatus, row: Order) => {
  return row.payStatus === value
}
const filterOrderStatus = (value: OrderStatus, row: Order) => {
  return row.orderStatus === value
}

// 全文搜索筛选
const filterTableData = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return tableData.value

  return tableData.value.filter((order) =>
      order.userName?.toLowerCase().includes(keyword) ||
      order.userPhone?.toLowerCase().includes(keyword) ||
      order.orderNo?.toLowerCase().includes(keyword) ||
      order.shopName?.toLowerCase().includes(keyword)
  )
})

// 格式化时间
function formatTime(iso: string) {
  return new Date(iso).toLocaleString()
}

// 重置筛选器 + 搜索
function resetFilters() {
  tableRef.value?.clearFilter()
  search.value = ''
}

// 分页事件
function handlePageChange(page: number) {
  currentPage.value = page
  getOrderData()
}
function handlePageSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  getOrderData()
}

// 获取订单数据
async function getOrderData() {
  try {
    const response = await axios.get('/order/admin/orders/all', {
      params: {
        token: '123',
        page: currentPage.value,
        size: pageSize.value,
        query_string: searchStore.queryString.trim()// 全局搜索
      },
    })
    if (response.status === 200 && response.data?.data.records) {
      tableData.value = response.data.data.records
      total.value = response.data.data.total
    } else {
      console.error('获取订单数据失败')
    }
  } catch (error) {
    console.error('请求异常', error)
  }
}

// 操作按钮
function handleDetail(order: Order) {
  console.log('订单详情', order)
  router.push({
    path: `/order/${order.orderNo}`,
    query: {} // 如果还需要其他参数，也可以写这里
  })
}
function handleEdit(order: Order) {
  console.log('编辑订单', order)
}
function handleDelete(order: Order) {
  console.log('删除订单', order)
  openEmailPrompt(order.orderNo)
}
watch(() => triggerStore.triggerKey, () => {
  // getOrderData()
})
onActivated(async () => {
  if (!hasLoaded.value) {
    console.log("首次激活加载数据")
    await getOrderData()
    hasLoaded.value = true
  } else {
    console.log("组件已激活但无需重新加载")
  }
})
onDeactivated(() => {
  // getOrderData()
  console.log("停用了")
})
// 初始化加载
// onMounted(async () => {
//   console.log("初始化加载")
//   if (!hasLoaded.value) {
//     await getOrderData()
//     hasLoaded.value = true
//   }
// })
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>