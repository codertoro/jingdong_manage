<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" >
      <router-link to="/">
        <img
            style="width: 100px"
            src="@/assets/images/jingdonglogo.svg"
            alt="Element logo"
        />
      </router-link>

    </el-menu-item>
    <div class="search">
      <AutocompleteSearch />
    </div>
    <el-menu-item index="2">Processing Center</el-menu-item>
    <el-sub-menu index="3">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <Avatar></Avatar>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Avatar from "@/components/header/Avatar.vue";
import AutocompleteSearch from "@/components/header/AutocompleteSearch.vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
  border: none;
}
.el-menu--horizontal > .el-menu-item:nth-child(1):hover {
  background: none;
  border: none;
}
.search{
  display: flex;
  width: 600px;
  margin: 10px auto;
}
</style>