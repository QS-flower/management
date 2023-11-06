<template>
    <el-table :data="searchResults" border height="90%" style="width: 96%">
        <el-table-column prop="subject" label="科目" width="200" align="center"/>
        <el-table-column prop="name" label="任课老师" width="200" align="center"/>
        <el-table-column prop="score" label="分数" width="200" align="center"/>
        <el-table-column prop="rank" label="排名" align="center"/>
        <el-table-column label="查分申请" align="center">
            <template #default="scope">
                <el-button size="small" @click="editRow(scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const props = defineProps(['inputNum', 'numValue'])
const emit = defineEmits(["page_num"])
const searchResults = computed(() => {
    // 通过 Vuex 的 getters 获取数据
    //   console.log('here1')
    emit('page_num',Math.ceil(store.getters.search_result.length/props.numValue))
    // console.log(props.inputNum)
    // console.log(props.numValue)
    const data=store.getters.search_result.slice((props.inputNum-1)*props.numValue,props.inputNum*props.numValue)
    return data
});

const editRow = (rowData) => {
    console.log('Edit row:', rowData);
    console.log('here'+rowData.subject)
    // 这里可以处理编辑逻辑，比如打开一个编辑窗口
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