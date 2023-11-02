<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <div class="logo">成绩管理系统</div>
                <div class="menu"><Menu /></div>
            </el-aside>
            <el-container>
                <el-header>
                    <Head />
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer height="30px">2023 成绩管理系统 By XZH LZ and QJJ</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Menu from './components/menu.vue'
import Head from './components/head.vue'
import Test from './test1.vue'
import Query from './query.vue'
import Wel from './welcome.vue'
import Apply from './apply.vue'
export default {
    components: {
        Menu,
        Head,
        Query,
        Test,
        Wel,
        Apply,
    }
}
</script>
<style scoped>
.logo{
    text-align: center;
    font-size: 25px;
    font-family: YouYuan;
    font-weight: bolder;
    margin-bottom: 10px;
}
.el-header{
    border-bottom-style: solid;
    border-width: 1px;
    border-color:#ccdada;
    font-family: YouYuan;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-aside{
    border-right-style: solid;
    border-width: 1px;
    border-color:#ccdada;
}
.el-footer{
    text-align: center;
    font-family: FangSong;
    font-weight: border;
    font-size: 15px;
    border-top-style: solid;
    border-width: 1px;
    border-color:#ccdada;
}
.el-main{
    background-color: white;
}
.common-layout{
    height: 100%;
    width: 100vw;
}
.el-container {
    width: 100%;
    height: 100%;
}
</style>