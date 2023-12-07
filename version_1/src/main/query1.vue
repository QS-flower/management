<template>
  
  <el-row :gutter="12" >
    <el-col :span="8">
      <el-card shadow="hover" class="btn2" @click="tostudnet"> 学生成绩查看 </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" class="btn1" @click="toclass"> 班级成绩分析 </el-card>
    </el-col>
  </el-row>
  <div class="tip">若查看某个学生的成绩状况，点击“学生成绩查看”按钮；若查看班级的整体成绩，点击“班级成绩分析”按钮；</div>

</template>
<script>
  export default {
    methods: {
      toclass() {
        this.$router.push('/teacher/watchclass');
        console.log("班级成绩查看按钮被点击");
      },
      tostudnet() {
        this.$router.push('/teacher/watchstudent');
        console.log("学生成绩查看按钮被点击");
      },
    },
  };
</script>
<style scoped>
.tip{
  opacity: 70%;
  color: rgb(101, 94, 94);
  text-align: center;
  font-size: 12px;
  margin-top: 40px;
}
.el-row{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 幼圆;
}
</style>