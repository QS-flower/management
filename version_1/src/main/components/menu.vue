<template>
    <el-menu active-text-color="#ffd04b" background-color="white" class="el-menu-vertical-demo"
        :default-active="activeIndex" text-color="black" @open="handleOpen" @close="handleClose" :router="true">
        <el-menu-item index="/student/main">
            <el-icon>
                <House />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/student/query">
            <el-icon>
                <Search />
            </el-icon>
            <span>成绩查询</span>
        </el-menu-item>
        <el-menu-item index="/student/analysis">
            <el-icon>
                <DataAnalysis />
            </el-icon>
            <span>成绩分析</span>
        </el-menu-item>
        <el-menu-item index="/student/apply">
            <el-icon>
                <ChatDotRound />
            </el-icon>
            <span>查分申请</span>
        </el-menu-item>
        <el-menu-item index="/student/setting">
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
import { ref, Ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
// setup
const { currentRoute } = useRouter()

const activeIndex: Ref<string> = ref<string>(currentRoute.value.path)
watchEffect(() => {
   //console.log('Current Route Path:', currentRoute.value.path);
    activeIndex.value = currentRoute.value.path;
});
const handleOpen = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo {
    height: 100%;
}

span {
    font-size: 16px;
    text-align: center;
}
</style>

  