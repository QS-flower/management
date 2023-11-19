<template>
    <el-menu active-text-color="#ffd04b" background-color="white" class="el-menu-vertical-demo"
        :default-active="activeIndex" text-color="black" @open="handleOpen" @close="handleClose" :router="true">
        <el-menu-item index="/teacher/main">
            <el-icon>
                <House />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/teacher/query">
            <el-icon>
                <search />
            </el-icon>
            <span>成绩查看</span>
        </el-menu-item>
        <el-menu-item index="/teacher/update">
            <el-icon><DataAnalysis /></el-icon>
            <span>上传成绩</span>
        </el-menu-item>
        <el-menu-item index="/teacher/deal">
            <el-icon>
                <ChatDotRound />
            </el-icon>
            <span>受理查分</span>
        </el-menu-item>
        <el-menu-item index="/teacher/change">
            <el-icon>
                <Edit />
            </el-icon>
            <span>修改成绩</span>
        </el-menu-item>
        <el-menu-item index="/teacher/setting">
            <el-icon>
                <Setting />
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
    Edit,
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

  
  