<script setup>
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import od10 from '@/assets/h5_images/od_10.png'
import od20 from '@/assets/h5_images/od_20.png'
import od30 from '@/assets/h5_images/od_30.png'
import od40 from '@/assets/h5_images/od_40.png'
import clients from '@/assets/h5_images/ic_clients.png'
import clients_2 from '@/assets/h5_images/ic_share.png'
import { ref } from 'vue';
const userStore = useUserStore();
const router = useRouter();
const goOrder = (state) => {
    router.push(`/order?active=${state}`)
}
const showQuit = ref(false);
const quit = () => {
    userStore.clearUserInfo();
    userStore.removeToken();
    showQuit.value = true;
    router.push('/login');
}
</script>
<template>
    <div class="container">
        <div class="user">
            <van-image :src="userStore.userInfo.avatar" width="100" height="100" class="img" />
            <div class="text">{{ userStore.userInfo.name }}</div>
        </div>
        <div class="order">
            <div class="top">
                <div class="text1">我的订单</div>
                <div class="text2">全部</div>
            </div>
            <div class="buttom">
                <div class="item">
                    <van-image  
                        @click="goOrder(1)"
                        width="40"
                        height="40"
                    :src="od10"
                    />
                    <div>待支付</div>
                </div>
                <div class="item">
                    <van-image 
                        @click="goOrder(2)"
                        width="40"
                        height="40"
                    :src="od20"
                    />
                    <div>待服务</div>
                </div>
                <div class="item">
                    <van-image 
                        @click="goOrder(3)"
                        width="40"
                        height="40"
                    :src="od30"
                    />
                    <div>已完成</div>
                </div>
                <div class="item">
                    <van-image 
                        @click="goOrder(4)"
                        width="40"
                        height="40"
                    :src="od40"
                    />
                    <div>已取消</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="foot1">
                <div class="text1">
                    <van-image width="20" height="20" :src="clients"></van-image>
                    服务对象管理
                </div>
                <div class="text2">
                    <van-icon name="arrow"/>
                </div>
            </div>
            <div class="foot2">
                <div class="text1">
                    <van-image width="20" height="20" :src="clients_2"></van-image>
                    分享转发
                </div>
                <div class="text2">
                    <van-icon name="arrow"/>
                </div>
            </div>
        </div>
        <van-button @click="showQuit = true" type="danger" class="quit" size="large">退出登录</van-button>
        <van-dialog 
            title="提示"
            v-model:show="showQuit"
            show-cancel-button
            cancel-text="取消"
            confirm-text="确定"
            @cancel="showQuit = false"
            @confirm="quit"
        >
            <div class="quit_text">确定要退出登录吗？</div>
        </van-dialog>
    </div>
</template>
<style lang="less"scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
    overflow: hidden;
    .user {
      width: 95%;
      height: 200px;
      background-color: #fff;
      text-align: center;
      border-radius: 10px;
      margin: 10px;
      .img {
        margin-top: 30px;
      }
      .text {
        line-height: 30px;
        font-weight: bold;
      }
    }
    .order {
      width: 90%;
      margin: 10px;
      border-radius: 5px;
      background-color: #fff;
      padding: 10px;
      .top {
        margin: 10px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .text1 {
          color: #333;
        }
        .text2 {
          color: #999;
        }
        border-bottom: 0.5px solid #f5f5f5;
      }
      .buttom {
        padding: 10px;
        display: flex;
        justify-content: space-around;
        .item {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .foot {
      margin: 0 10px;
      padding: 10px;
      line-height: 50px;
      background-color: #fff;
      .foot1,
      .foot2 {
        display: flex;
        justify-content: space-between;
        color: #555;
      }
      .foot1 {
        border-bottom: 0.5px solid #f5f5f5;
      }
    }
    .quit {
      width: 90%;
      margin: 20px;
    }
    .quit_text {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>