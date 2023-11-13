<template>
    <div class="topmsg" style="margin-top: 30px;">个人信息修改</div>
    <span style="margin-left: 26%;">输入新密码</span><el-input v-model="input1" type="password" placeholder="输入密码" show-password
        style="margin-top: 30px;margin-bottom: 30px;width: 500px;" />
    <div></div>
    <span style="margin-left: 26%;">确认新密码</span><el-input v-model="input2" type="password" placeholder="确认密码" show-password
        style="margin-top: 30px;margin-bottom: 30px;width: 500px;" />
    <div></div>
    <button class="btn" type="submit" @click="checkPasswords">
        重 置
    </button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { post } from '../axios_setting/index.js'
import { ElMessage } from 'element-plus'
const input1 = ref('')
const input2 = ref('')
const alter_msg1 = (msg) => {
    ElMessage({
        message: msg,
        type: 'warning',
    })
}
const alter_msg2 = (msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}
const checkPasswords = () => {

    if (input1.value != input2.value && (input1.value != '' && input2.value != '')) {
        alter_msg1('两次输入的密码不一致，请重新输入！')
        input1.value = '';
        input2.value = '';
    }
    else if (input1.value == '' || input2.value == '') {
        alter_msg1('密码不能为空，请重新输入！')
        input1.value = '';
        input2.value = '';
    } else if (input1.value.length < 6 || input1.value.length > 20) {
        alter_msg1('密码长度需为6-20位')
    }
    else {
        post('/api/setting', { new_psd: input1.value }).then(rsponse => {
            alter_msg2('修改密码成功')
        }).catch(err => {
            alter_msg1('修改密码失败')
        })
    }
}
</script>
<style scoped>
.topmsg {
    font-family: youyuan;
    color: black;
    text-align: center;
    font-size: 30px;
}

span {
    font-family: songti;
    margin-right: 5px;
    font-size: 18px;
    color: rgb(211, 58, 58);
    opacity: 80%;
}

.btn {
    position: relative;
    left: 43%;
    height: 60px;
    background-color: #34bd5b;
    color: #fff;
    padding: 6px 12px;
    font-family: 幼圆;
    font-size: 25px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border-radius: 7px;
    text-decoration: none;
    border: 1px solid transparent;
    width: 170px;
}

.btn:hover {
    background-color: rgb(6, 129, 16);
}
</style>

