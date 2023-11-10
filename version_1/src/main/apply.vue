<template>
    <div class="before1">
        <div class="title">正在处理的申请</div>
        <el-table :data="apply_do" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="exam" label="考试" width="120" align="center" />
            <el-table-column prop="subject" label="科目" width="120" align="center" />
            <el-table-column prop="name" label="科任老师" width="120" align="center" />
            <el-table-column prop="message" label="备注信息" />
            <el-table-column label="申请状况" align="center">
                <template #default="scope">
                    <el-button size="small" @click="repeal(scope.row,scope.$index)" type="success">撤销申请</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="after1">
        <div class="title">已经处理的申请</div>
        <el-table :data="apply_done" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="exam" label="考试" width="180" align="center" />
            <el-table-column prop="subject" label="科目" width="180" align="center" />
            <el-table-column prop="name" label="科任老师" width="180" align="center" />
            <el-table-column prop="message" label="备注信息" />
        </el-table>
    </div>
</template>


<script lang="ts" setup>
import { ElMessage,ElMessageBox } from 'element-plus'
import {get,post} from '../axios_setting/index'
import {onMounted, ref} from 'vue'
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
const apply_do=ref([])
const apply_done=ref([])
const fetchdata=()=>{
    get('/api/applydata').then((response)=>{
        apply_do.value=response.ondo
        apply_done.value=response.done
    }).catch((err)=>{
        console.log(err)
    })
}
onMounted(()=>{
    fetchdata()
})
const repeal=(rowdata,index)=>{
    ElMessageBox.confirm(
            '确定撤销申请吗',
            'Warning',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            const data = { subject: rowdata.subject, name: rowdata.name, exam: rowdata.exam, operation: '撤销申请' }
            post('/api/apply', data).then((response) => {
                ElMessage({
                    message: '撤销申请成功',
                    type: 'success',
                })
                apply_do.value.splice(index,1)
            }).catch((err) => {
                console.log(err)
                ElMessage({
                    message: '撤销申请失败',
                    type: 'warning',
                })
            })
        }).catch(() => {
        })
}
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