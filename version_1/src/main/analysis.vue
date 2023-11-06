<template>
    <el-row :gutter="12">

        <el-col :span="8">
            <el-card shadow="hover" class="btn1" @click="toclass"> 学科成绩分析 </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="hover" class="btn2" @click="tostudnet"> 整体成绩查看 </el-card>
        </el-col>
    </el-row>
    <div class="tip">Tips:若查看历次考试某学科的成绩分析（如数学的成绩分析），点击“学科成绩分析”按钮；若查看历次考试总成绩与班级排名情况，点击“整体成绩查看”按钮</div>
</template>
<script>
export default {
    methods: {
        toclass() {
            this.$router.push('/student/analysis1');
        },
        tostudnet() {
            this.$router.push('/student/analysis2');
        },
    },
};
</script>
<style scoped>
.tip {
    opacity: 70%;
    color: rgb(101, 94, 94);
    text-align: center;
    font-size: 12px;
    margin-top: 40px;
}

.el-row {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 幼圆;
}
</style>
  