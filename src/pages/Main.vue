<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const active = ref(0)
const router = useRouter();
onMounted(() => {
    console.log(router);
    const data = router.options.routes[0]
    active.value = data.children.findIndex(item => item.path ===    router.currentRoute.value.path.split('/')[1])
})
</script>
<template>
    <RouterView></RouterView>
    <van-tabbar v-model="active">
    <van-tabbar-item v-for="item in router.options.routes[0].children" :key="item.path" :icon="item.meta.icon" :url="`#/${item.path}`">{{ item.meta.name }}</van-tabbar-item>
    </van-tabbar>
</template>