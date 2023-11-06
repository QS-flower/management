<template>
    <div class="main" v-if="visual1">
        <div class="head">
            <el-button class="search" type="success" :icon="Edit">成绩打印</el-button>
            <div class="text1">您的总分为<span class="score">{{ score }}</span>,排名<span class="grade">{{ grade }}/{{ grade_total
            }}</span></div>
        </div>
        <div class="table">
            <Table :inputNum="input_num" :numValue="num_value" @page_num="hand_page"/>
        </div>
        <div class="footer">
            <div>共{{ num }}页</div>
            <el-select v-model="num_value" class="m-2">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="page1" :disabled="last" @click="lastpage">上一页</el-button>
            <el-button class="page2" :disabled="next" @click="nextpage">下一页</el-button>
            <div>第</div>
            <el-input v-model="input_num" />
            <div>页</div>
        </div>
    </div>
</template>
<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref,computed } from 'vue'
import Table from './table.vue'
import { useStore } from 'vuex'
const store = useStore();
const score = computed(()=>{
    return store.getters.getRank.score
})
const grade = computed(()=>{
    return store.getters.getRank.rank1
})
const grade_total = computed(()=>{
    return store.getters.getRank.number
})
const num = ref(1)
const input_num=ref(1)
const num_value = ref(7); // 设置初始值
const last=ref(true)
const next=ref(false)

const options = [
  { label: '7条/页', value: 7 },
  { label: '14条/页', value: 14 },
];
const hand_page=(pagenum)=>{
    //console.log(pagenum+' here')
    num.value=pagenum;
    last.value=input_num.value<=1?true:false;
    next.value=input_num.value>=num.value?true:false;
}
const lastpage=()=>{
    console.log(input_num.value)
    input_num.value=input_num.value-1
    if(input_num.value<num.value){
        next.value=false
    }
    if(input_num.value==1){
        last.value=true
    }
}
const nextpage=()=>{
    console.log(input_num.value)
    input_num.value++;
    if(input_num.value>1){
        last.value=false
    }
    if(input_num.value==num.value){
        next.value=true
    }
}
const visual1=computed(()=>{
    return store.getters.getVisual
})
</script>

<style scoped>
.main {
    height: 50%;
    min-height: 400px;
    margin-top: 1%;
    background-color: rgb(255, 254, 254);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}
.head {
    height: 9%;
    /* border-style: solid;
    border-width: 1px;
    border-radius: 5px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1%;
}

.score {
    color: rgb(230, 75, 19);
    text-decoration-line: underline;
    font-size: larger;
}

.grade {
    color: rgb(230, 75, 19);
    text-decoration-line: underline;
    font-size: larger;

}

.text1 {
    font-size: larger;
    margin-right: 2%;
}

.search {
    margin-left: 2%;
}

.footer {
    height: 8%;
    margin:0 3% 0 1%;
    /* border-style: solid;
    border-width: 1px;
    border-radius: 5px; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.table {
    height: 75%;
    margin: 1% 1% 0 1%;
    /* border-style: solid;
    border-width: 1px;
    border-radius: 5px; */
}
.el-select{
    width: 7%;
    border-color: #ccdada;
    margin: 0 1% 0 1%;
}
.el-input{
    width: 3%;
    margin: 0 2px 0 2px;
}
.page2{
    margin: 0 1% 0 1%;
}
.el-button>span{
    font-size: 12px;
}
</style>