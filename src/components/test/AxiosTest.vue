<script setup lang="ts" type="module">
import { reactive } from 'vue'
import axios from 'axios'

const message = reactive({ code: 1, content: '' })

async function fun() {
  const response = await axios.get('/api/qinghua?format=json')
  Object.assign(message, response.data)
}
</script>

<template>
<div>
  <p>
    {{message.content}}
  </p>
  <button @click="fun">点击</button>
</div>
</template>

<style scoped>

</style>