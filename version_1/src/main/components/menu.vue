<template>
    <el-menu active-text-color="#ffd04b" background-color="white" class="el-menu-vertical-demo" default-active="/main"
        text-color="black" @open="handleOpen" @close="handleClose" :router="true">
        <el-menu-item index="/main">
            <el-icon><House /></el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/query">
            <el-icon><Search /></el-icon>
            <span>成绩查询</span>
        </el-menu-item>
        <el-menu-item index="/test">
            <el-icon><DataAnalysis /></el-icon>
            <span>成绩分析</span>
        </el-menu-item>
        <el-menu-item index="/apply">
            <el-icon><ChatDotRound /></el-icon>
            <span>查分申请</span>
        </el-menu-item>
        <el-menu-item index="/test">
            <el-icon>
                <setting />
            </el-icon>
            <span>个人设置</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import {
    ChatDotRound,
    DataAnalysis,
    Setting,
    Search,
    House,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo{
    height: 100%;
}
span{
    font-size: 16px;
    text-align: center;
}
</style>

  