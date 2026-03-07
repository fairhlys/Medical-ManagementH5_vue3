<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
const active = ref(0)
const router = useRouter();
const route = useRoute();
const chose = () => {
    active.value = router.options.routes[0].children.findIndex(item => item.path === router.currentRoute.value.path.split('/')[1])
}
watch(() => route.path, chose, { immediate: true })
</script>
<template>
    <RouterView></RouterView>
    <van-tabbar v-model="active">
    <van-tabbar-item v-for="item in router.options.routes[0].children" :key="item.path" :icon="item.meta.icon" :url="`#/${item.path}`">{{ item.meta.name }}</van-tabbar-item>
    </van-tabbar>
</template>