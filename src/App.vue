<script setup lang="ts">
import Tab from "@/components/header/Tab.vue";
import TopMenu from "./components/header/TopMenu.vue";
import LeftMenu from "./components/aside/LeftMenu.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopMenu></TopMenu>

      </el-header>
      <el-container>
        <el-aside width="180px"><LeftMenu/></el-aside>

        <el-main>
          <div class="tab">
            <Tab></Tab>
          </div>

<!--          <router-view/>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
