<template>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleMenuSelect"
      >
        <el-menu-item index="shop">
          <el-icon><location /></el-icon>
          <span>店铺</span>
        </el-menu-item>
        <el-menu-item index="user">
          <el-icon><icon-menu /></el-icon>
          <span>用户</span>
        </el-menu-item>
        <el-menu-item index="product">
          <el-icon><document /></el-icon>
          <span>商品</span>
        </el-menu-item>
        <el-menu-item index="order">
          <el-icon><setting /></el-icon>
          <span>订单</span>
        </el-menu-item>
        <el-menu-item index="axios-test">
          <el-icon><setting /></el-icon>
          <span>AxiosTest</span>
        </el-menu-item>
      </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const handleMenuSelect = (index: string) =>{
  router.push(`/${index}`)
}


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style>
</style>