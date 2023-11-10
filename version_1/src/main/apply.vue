<template>
    <div class="before1">
        <div class="title">正在处理的申请</div>
        <el-table :data="tableData" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="subject" label="科目" width="200" align="center" />
            <el-table-column prop="name" label="科任老师" width="200" align="center" />
            <el-table-column prop="message" label="备注信息" />
            <el-table-column label="申请状况" align="center">
                <template #default="scope">
                    <el-button size="small" @click="" type="success">撤销申请</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="after1">
        <div class="title">已经处理的申请</div>
        <el-table :data="tableData" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="subject" label="科目" width="200" align="center" />
            <el-table-column prop="name" label="科任老师" width="200" align="center" />
            <el-table-column prop="message" label="备注信息" />
            <el-table-column label="申请状况" align="center">
                <template #default="scope">
                    <el-button size="small" @click="" type="success" disabled>撤销申请</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script lang="ts" setup>
import { ElMessage } from 'element-plus'
const alter_msg1=(msg) => {
    ElMessage({
        message: msg,
        type: 'warning',
    })
}
const alter_msg2=(msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}
const setcolor = () => {
    return {
        color: "#000",
        textAlign: "center",
        background: "rgb(250, 254, 252)",
        fontFamily: 'KaiTi',
    };

}
const tableData = [
    {
        subject: '数学',
        name: 'Tom',
        message: '成绩差距过大',
    },
    {
        subject: '数学',
        name: 'Tom',
        message: '成绩差距过大',
    },
    {
        subject: '数学',
        name: 'Tom',
        message: '成绩差距过大',
    },
    {
        subject: '数学',
        name: 'Tom',
        message: '成绩差距过大',
    },
]
</script>

<style scoped>
.before1 {
    background-color: rgb(250, 254, 252);
    width: 100%;
    height: 48%;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}

.after1 {
    background-color: rgb(250, 254, 252);
    margin-top: 20px;
    width: 100%;
    height: 48%;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}

.title {
    text-align: center;
    font-size:20px;
    font-family: YouYuan;
    color: red;
}
</style>