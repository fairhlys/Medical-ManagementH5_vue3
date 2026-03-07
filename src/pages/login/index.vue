<script setup>
import { ref } from 'vue'
import { login } from '../../api/login'
import { lock } from '@/utils/lock'
import { showSuccessToast, showFailToast } from 'vant';
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const form = ref({
    userName: '',
    passWord: ''
})
const lockLogin = lock(login)
const onSubmit = lock(async () => {
    try {
    const res = await lockLogin(form.value)
    if(res.code !== 10000){
        throw new Error(res.message || '登录失败')
    }
    userStore.setToken(res.data.token)
    userStore.setUserInfo(res.data.userInfo)
    showSuccessToast('登录成功');
    router.push('/home')
    } catch (error) {
        showFailToast(error.message || '登录失败');
    }  
})
</script>
<template>
    <div class="login-container">
        <div class="login-card">
            <div class="logo">
                <h1 class="header">寻诊管理</h1>
                <p class="subtitle">Medical Management</p>
            </div>
            <van-form @submit="onSubmit" class="login-form">
              <van-cell-group inset>
                <van-field
                  v-model="form.userName"
                  name="userName"
                  label="用户名"
                  placeholder="请输入用户名"
                  :rules="[{ required: true, message: '请填写用户名' }]"
                  autocomplete="off"
                  clearable
                />
                <van-field
                  v-model="form.passWord"
                  type="passWord"
                  name="passWord"
                  label="密码"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请填写密码' }]"
                  autocomplete="new-password"
                  clearable
                />
              </van-cell-group>
              <div class="button-group">
                <van-button round block type="primary" native-type="submit" size="large">
                  登录
                </van-button>
              </div>
            </van-form>
        </div>
    </div>
</template>
<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
    overflow: hidden;
}

.login-card {
    width: 100%;
    max-width: 380px;
    background: white;
    border-radius: 12px;
    padding: 40px 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    animation: slideUp 0.5s ease-out;

    @media (max-height: 600px) {
        padding: 30px 25px;
    }
}

.logo {
    text-align: center;
    margin-bottom: 40px;
}

.header {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #333;
    letter-spacing: -0.5px;
}

.subtitle {
    margin: 0;
    font-size: 12px;
    color: #999;
    font-weight: 300;
    letter-spacing: 2px;
}

.login-form {
    :deep(.van-cell-group) {
        margin-bottom: 24px;
    }

    :deep(.van-field__label) {
        width: 70px;
        font-weight: 500;
        color: #333;
    }

    :deep(.van-field__body) {
        input {
            font-size: 14px;
            color: #333;

            &::placeholder {
                color: #bbb;
            }
        }
    }
}

.button-group {
    margin: 24px 0 0 0;

    :deep(.van-button) {
        font-size: 16px;
        font-weight: 600;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;

        &:active {
            opacity: 0.9;
        }
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>