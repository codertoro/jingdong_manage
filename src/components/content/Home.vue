<<template>
  <div class="home-container">
    <el-card shadow="hover" class="home-card">
      <h2>欢迎来到首页</h2>
      <p>这里是系统的起始页面，你可以在上方标签页中切换不同功能模块。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 无特殊逻辑，这里保持空即可
</script>

<style scoped>
.home-container {
  padding: 24px;
}

.home-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
</style>