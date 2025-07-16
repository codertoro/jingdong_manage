<template>
  <div  v-if="order && orderDetail.length>0&&address " class="order-detail-page">
    <el-page-header @back="goBack" content="订单详情" :title="`订单号：${order?.orderNo || '-'}`" class="mb-4" />

    <el-card class="mb-4">
      <el-descriptions title="用户信息" :column="2" border>
        <el-descriptions-item label="用户名">{{ order.userName }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ order.userPhone }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">
          {{ address?.province + address?.city + address?.area + address?.house }}
        </el-descriptions-item>
        <el-descriptions-item label="店铺">{{ order.shopName }}</el-descriptions-item>
        <el-descriptions-item label="金额">¥{{ order.orderAmount }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card>
      <template #header>
        <div class="table-title">商品列表</div>
      </template>

      <el-table :data="orderDetail" border stripe style="width: 100%">
        <el-table-column prop="imgUrl" label="图片" width="80">
          <template #default="scope">
            <el-image
                :src="scope.row.imgUrl"
                :preview-src-list="[scope.row.imgUrl]"
                style="width: 60px; height: 60px"
                fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" />
        <el-table-column prop="price" label="价格（¥）" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column label="小计（¥）" width="100" align="right">
          <template #default="scope">
            {{ (scope.row.price * scope.row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-empty v-if="!order || orderDetail.length === 0 || !address" description="加载中..." class="mt-4" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'OrderDetail'
})
import {ref, onMounted, watch, onActivated, onUpdated} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tabStore'
import axios from '@/axios/axios'
import type { Order, OrderDetail } from '@/type/order'
import type { Address } from '@/type/address.ts'

const tabStore = useTabStore()
const route = useRoute()
const router = useRouter()
const order = ref<Order | null>(null)
const orderDetail = ref<OrderDetail[]>([])
const address = ref<Address | null>(null)

const openid = "oroeFwug86KuObVDTro9VGCFN4Mc"
const orderNo = route.params.orderNo as string

function goBack() {
  router.back()
}

async function fetchData() {
  try {
    const res = await axios.post(`/order/detail?openid=${openid}&order_no=${orderNo}`)
    if (res.status === 200 && res.data.data) {
      orderDetail.value = res.data.data.orderDetailDTOList
      order.value = res.data.data
    } else {
      console.error('获取订单详情失败')
    }
  } catch (err) {
    console.error('接口异常', err)
  }
}

async function fetchAddress() {
  try {
    if (order.value?.userId && order.value?.userAddressId) {
      const res = await axios.get(`/address/${order.value.userId}/${order.value.userAddressId}`)
      if (res.status === 200 && res.data.data) {
        address.value = res.data.data
      } else {
        console.error('获取地址失败')
      }
    }
  } catch (err) {
    console.error('接口异常', err)
  }
}

// watch(
//     () => route.params.orderNo,
//     (orderNo) => {
//       if (typeof orderNo === 'string') {
//         const newTitle = `订单-${orderNo.slice(-5)}`
//         tabStore.setTitle(route.fullPath, newTitle)
//       }
//     },
//     { immediate: true }
// )
watch(
    () => route.params.orderNo,
    async (orderNo) => {
      if (typeof orderNo === 'string') {
        // const newTitle = `订单-${orderNo.slice(-5)}`
        // tabStore.setTitle(route.fullPath, newTitle)
        //
        // console.log('订单号变化:', orderNo)
        await fetchData()
        if (order.value) {
          await fetchAddress()
        }
      }
    },
    { immediate: true }
)
// onUpdated(async () => {
//   console.log("组件更新了")
//   await fetchData()
//   if (order.value) {
//     await fetchAddress()
//   }
// })
// onMounted(async () => {
//   // console.log("组件挂载了")
//   // await fetchData()
//   // if (order.value) {
//   //   await fetchAddress()
//   // }
// })
</script>

<style scoped>
.order-detail-page {
  padding: 20px;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.table-title {
  font-weight: 600;
  font-size: 16px;
}
</style>