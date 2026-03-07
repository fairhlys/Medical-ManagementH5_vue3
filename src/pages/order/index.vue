<script setup>
import { ref, onMounted } from 'vue';
import { getOrderList } from '@/api/order';
import counter from '@/components/counter.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const active = ref('');
const orderList = ref([]);

const fetchOrderList = async (item) => {
    const res = await getOrderList(item.name || '');
    orderList.value = res.data;
    orderList.value.forEach(order => {
        order.timer = Number(order.order_start_time) + 7200000 - Date.now(); 
    });
};
const colormap = {
    '待支付': '#ff4d4f',
    '待服务': '#faad14',
    '已完成': '#52c41a',
    '已取消': '#999999'
};
onMounted(() => {
    fetchOrderList(active.value);
    if(route.query.active) {
        active.value = route.query.active;
    }
});
const goDetail = (item) => {
    // 跳转到订单详情页
    router.push(`/detail?oid=${item.out_trade_no}`);
    console.log('跳转到订单详情页');
};
</script>
<template>
    <div class="container">
        <div class="header">我的订单</div>
        <van-tabs v-model:active="active" @click-tab="fetchOrderList">
            <van-tab title="全部" name=""></van-tab>
            <van-tab title="待支付" name="1"></van-tab>
            <van-tab title="待服务" name="2"></van-tab>
            <van-tab title="已完成" name="3"></van-tab>
            <van-tab title="已取消" name="4"></van-tab>
        </van-tabs>
        <van-row  justify="space-around" @click="goDetail(item)" v-for="item in orderList" :key="item.out_trade_no" >
            <van-col span="5">
                <van-image radius="5" :src="item.serviceImg" width="50" height="50" />
            </van-col>
            <van-col span="14">
                <div class="text1">{{ item.service_name }}</div>
                <div class="text2">
                    <div>{{ item.hospital_name }}</div>
                    <div>预约时间:{{ item.starttime  }}</div>
                </div>
            </van-col>
            <van-col span="5" :style="{ color: colormap[item.trade_state] }" class="text2">
                {{ item.trade_state }}
                <counter v-if="item.trade_state === '待支付'"  :second="item.timer" />
            </van-col>
        </van-row>
        <div class="bottom-text">没有更多订单了</div>
    </div>
</template>
<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
  }
  .header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
  }
  .van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    .text1 {
      font-size: 16px;
      line-height: 25px;
      font-weight: bold;
    }
    .text2 {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
    }
  }
  .bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
  }</style>