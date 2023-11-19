<template>
    <div class="main">
        <div class="first">
            <span>学号：</span>
            <el-input v-model="Stu" class="m-2" placeholder="请输入学号" />
        </div>
        <div class="but">
            <el-button type="success" :icon="Search" @click="hand_search">查询</el-button>
            <el-button :icon="Delete" @click="reset">重置</el-button>
        </div>
    </div>
    <div class="table" v-if="show">
        <el-table :data="tabledata" border height="90%" style="width: 96%">
            <el-table-column prop="exam" label="考试" width="200" align="center" />
            <el-table-column prop="subject" label="科目" width="200" align="center" />
            <el-table-column prop="name" label="任课老师" width="200" align="center" />
            <el-table-column prop="score" label="分数" width="200" align="center" />
            <el-table-column label="查分申请" align="center">
                <template #default="scope">
                    <el-button size="small" @click="edit(scope.row)" type="success">修改成绩</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
import { post } from '../axios_setting/index'
import { ElMessage, ElMessageBox } from 'element-plus'
const tabledata = ref([])
const Stu = ref('')
const show = ref(false)
const hand_search = () => {
    // console.log('here')
    post('/api/changedata', { Stu: Stu.value }).then((response) => {
        tabledata.value = response.grade
        show.value = true
        ElMessage.success('查询成功')
    }).catch((err) => {
        ElMessage.error('查询失败' + err)
    })
}
const reset = () => {
    Stu.value = ''
    show.value = false
}
const edit = (rowdata) => {
    ElMessageBox.prompt('请输入修改的成绩', '修改成绩', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
    }).then(({ value }) => {
        const data = { subject: rowdata.subject, name: rowdata.name, exam: rowdata.exam, new_score: value,Stu:Stu.value}
        post('/api/change', data).then((response) => {
            ElMessage({
                message: '修改成绩成功',
                type: 'success',
            })
            rowdata.score=value
        }).catch((err) => {
            console.log(err)
            ElMessage({
                message: '修改成绩失败'+err,
                type: 'warning',
            })
        })
    }).catch(() => {
    })
}
</script>
  
<style scoped>
.main {
    background-color: rgb(255, 254, 254);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
    height: 10%;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.m-2 {
    width: 300px;
}

.first .second {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

span {
    font-size: medium;
    font-weight: 700;
}

.el-table--border::after {
    height: 90%;
}

.el-table--border::before {
    height: 90%;
}

.table {
    margin: 20px;
    height: 80%;
    min-height: 300px;
    width: auto;
}
</style>