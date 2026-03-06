<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
<template>
    <div class="header">
        <div class="header-left">
            中部地区
        </div>
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
    </div>
</template>