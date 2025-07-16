<template>
  <div v-if="order && orderDetail.length>0&&address " class="order-detail">
    <h5>订单详情：{{ order.orderNo }}</h5>

    <el-descriptions title="用户信息" :column="2" border>
      <el-descriptions-item label="用户名">{{ order.userName }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ order.userPhone }}</el-descriptions-item>
      <el-descriptions-item label="地址" :span="2">{{ address.province+address.city+address.area+address.house }}</el-descriptions-item>
      <el-descriptions-item label="店铺">{{ order.shopName }}</el-descriptions-item>
      <el-descriptions-item label="金额">¥{{ order.orderAmount }}</el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <h3>商品列表</h3>
    <el-table :data="orderDetail" style="width: 100%">
      <el-table-column prop="imgUrl" label="图片" width="80">
        <template #default="scope">
          <el-image :src="scope.row.imgUrl" style="width: 60px; height: 60px"  :preview-src-list="[]"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名" />
      <el-table-column prop="price" label="价格（¥）" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column
          label="小计（¥）"
          width="100"
      >
        <template #default="scope">
          {{ (scope.row.price * scope.row.quantity).toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-empty v-else description="加载中..." />
</template>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '@/stores/tabStore'
import axios from '@/axios/axios'
import type {Order,OrderDetail} from '@/type/order'
import type {Address} from "@/type/address.ts";

const tabStore = useTabStore()
const route = useRoute()
const order = ref<Order | null>(null)
const orderDetail = ref<OrderDetail[]>([])
const address = ref<Address | null>(null);

const openid = "oroeFwug86KuObVDTro9VGCFN4Mc";
const orderNo = route.params.orderNo as string

console.log(orderNo)
async function fetchData() {
  try {
    const res = await axios.post(`/order/detail?openid=${openid}&order_no=${orderNo}`)
    if (res.status === 200 && res.data.data) {
      orderDetail.value = res.data.data.orderDetailDTOList
      order.value = res.data.data
      console.log(orderDetail.value)
      console.log(order.value)
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

watch(
    () => route.params.orderNo,
    (orderNo) => {
      if(typeof orderNo === 'string'){
        const newTitle = `订单-${(orderNo as string).slice(-5)}`
        // document.title = newTitle
        tabStore.setTitle(route.fullPath, newTitle)
      }
    },
    { immediate: true }
)
onMounted(
  async () => {
    await fetchData();
    if (order.value) {
      await fetchAddress();
    }
    // route.meta.title = `订单-${route.params.orderNo.slice(-5)}`
  }
)
</script>

<style scoped>
.order-detail {
  padding: 20px;
}
</style>