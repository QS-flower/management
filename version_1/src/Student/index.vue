
<template>
    <div class="common-layout">
        <el-container>
            <el-header style="padding: 0 !important;">
                <div class="word">学生管理系统教师端</div>
                <div class="right">
                    <div class="portrait">
                        <el-avatar :size="50" :fit="cover"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                    <div class="login_out">
                        <el-button type="info" plain>Login Out</el-button>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Menu />
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script>
import Menu from './components/menu.vue'
import logo from '../assets/logo.png'

export default {
    data() {
        return {
            logo: logo
        }
    },
    components: {
        Menu,
    }
}
</script>

<style>
.common-layout {
    width: 100vw;
    border-radius: 25px;
    overflow: hidden;
}
.el-container {
    width: 100%;
    height: 100%;
}

.el-header {
    font-family: YouYuan;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    margin-top: 10px;
}

.word {
    margin-left: 15px;
    font-size: 20px;
    color: black;
    font-weight: bolder;
}
.right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.portrait {
    margin-right: 20px;
    margin-top: 8px;
}
.login_out{
    margin-right: 20px;
    
}
.el-main{
    background-color:aliceblue;
}
</style>