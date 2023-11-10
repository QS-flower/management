<template>
    <el-table :data="searchResults" border height="90%" style="width: 96%">
        <el-table-column prop="subject" label="科目" width="200" align="center" />
        <el-table-column prop="name" label="任课老师" width="200" align="center" />
        <el-table-column prop="score" label="分数" width="200" align="center" />
        <el-table-column prop="rank" label="排名" align="center" />
        <el-table-column label="查分申请" align="center">
            <template #default="scope">
                <el-button size="small" @click="editRow(scope.row, scope.$index)" :type="typeArray[scope.$index]">{{
                    butArray[scope.$index] }}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { post } from '../../axios_setting/index'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore();
const props = defineProps(['inputNum', 'numValue'])
const emit = defineEmits(["page_num"])
const searchResults = computed(() => {
    // 通过 Vuex 的 getters 获取数据
    //   console.log('here1')
    emit('page_num', Math.ceil(store.getters.search_result.length / props.numValue))
    // console.log(props.inputNum)
    // console.log(props.numValue)
    const data = store.getters.search_result.slice((props.inputNum - 1) * props.numValue, props.inputNum * props.numValue)
    return data
});
const typeArray = ref(Array(100).fill('')); // 初始化一个和行数相同长度的数组
const butArray = ref(Array(100).fill('查分申请')); // 初始化一个和行数相同长度的数组
const editRow = (rowdata, index) => {
    if (butArray.value[index] === '查分申请') {
        ElMessageBox.prompt('请输入查分申请信息', '备注信息', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
        }).then(({ value }) => {
            const data = { subject: rowdata.subject, name: rowdata.name, exam: store.getters.getExam, msg: value, operation: butArray.value[index] }
            post('/api/apply', data).then((response) => {
                ElMessage({
                    message: '查分申请成功',
                    type: 'success',
                })
                typeArray.value[index] = 'danger';
                butArray.value[index] = '撤销申请'
            }).catch((err) => {
                console.log(err)
                ElMessage({
                    message: '查分申请失败',
                    type: 'warning',
                })
            })
        }).catch(() => {
        })
    } else {
        ElMessageBox.confirm(
            '确定撤销申请吗',
            'Warning',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            const data = { subject: rowdata.subject, name: rowdata.name, exam: store.getters.getExam, operation: butArray.value[index] }
            post('/api/apply', data).then((response) => {
                ElMessage({
                    message: '撤销申请成功',
                    type: 'success',
                })
                typeArray.value[index] = '';
                butArray.value[index] = '查分申请'
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
}
</script>

<style scoped>
.el-table {
    margin: 2%;
}

.el-table--border::after {
    height: 90%;
}

.el-table--border::before {
    height: 90%;
}
</style>