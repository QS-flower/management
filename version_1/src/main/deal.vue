<template>
    <div class="before1">
        <div class="title">正在处理的申请</div>
        <el-table :data="apply_do" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="exam" label="考试" width="200" align="center" />
            <el-table-column prop="name" label="学生学号" width="200" align="center" />
            <el-table-column prop="subject" label="科目" width="200" align="center" />
            <el-table-column prop="message" label="备注信息" />
            <el-table-column label="处理申请" align="center">
                <template #default="scope">
                    <el-button size="small" @click="repeal(scope.row,scope.$index)" type="success">进行处理</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="after1">
        <div class="title">已经处理的申请</div>
        <el-table :data="apply_done" style="width: 100%" :header-cell-style="setcolor" :cell-style="setcolor">
            <el-table-column prop="exam" label="考试" width="200" align="center" />
            <el-table-column prop="subject" label="科目" width="200" align="center" />
            <el-table-column prop="name" label="学生学号" width="200" align="center" />
            <el-table-column prop="message" label="备注信息" />
        </el-table>
    </div>
</template>


<script lang="ts" setup>
import { ElMessage,ElMessageBox } from 'element-plus'
import {get,post} from '../axios_setting/index'
import {onMounted, ref} from 'vue'
const setcolor = () => {
    return {
        textAlign: "center",
        
    };

}
const apply_do=ref([])
const apply_done=ref([])
const fetchdata=()=>{
    get('/api/dealdata').then((response)=>{
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
    ElMessageBox.prompt('请输入处理申请信息', '处理申请', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
    }).then(({value}) => {
            const data = { subject: rowdata.subject, exam: rowdata.exam, operation: '处理申请',msg:value,name:rowdata.name }
            post('/api/deal', data).then((response) => {
                ElMessage({
                    message: '处理申请成功',
                    type: 'success',
                })
                apply_do.value.splice(index,1)
            }).catch((err) => {
                console.log(err)
                ElMessage({
                    message: '处理申请失败',
                    type: 'warning',
                })
            })
        }).catch(() => {
        })
}
</script>

<style scoped>
.before1 {
    
    width: 100%;
    height: 48%;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}

.after1 {
   
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