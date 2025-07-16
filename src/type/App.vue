<script setup lang="ts">
import Tab from "@/components/header/Tab.vue";
import TopMenu from "@/components/TopMenu.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import LeftMenuCollapse from "@/components/LeftMenuCollapse.vue";

</script>
<template>
    <el-container>
      <el-header><TopMenu /></el-header>
      <el-container>
        <el-aside width="180px"><LeftMenuCollapse/></el-aside>
        <el-main>
          <Tab></Tab>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>
<style scoped>
</style>
