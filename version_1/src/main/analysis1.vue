<template>
    <el-scrollbar height="600px">
        <div class="main">
            <div class="first">
                <span>科目：</span>
                <el-select v-model="class_value" class="m-2" placeholder="请选择科目">
                    <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </div>
            <div class="but">
                <el-button type="success" :icon="Search" @click="hand_search">查询</el-button>
                <el-button :icon="Delete" @click="reset">重置</el-button>
            </div>
        </div>
        <div v-if="isVisible" ref="lineChart" style="width: 800px;height: 500px;top:30px;left: 20%;"></div> <!-- 表示成绩 -->
        <div v-if="isVisible1" ref="lineChart1" style="width: 800px;height: 500px;top:30px;left: 20%;"></div> <!-- 表示排名 -->
    </el-scrollbar>
</template>
    
    
  
<script lang="ts" setup>

import { ref, onBeforeMount, onMounted } from 'vue'
import * as echarts from 'echarts';
import { Delete, Search } from '@element-plus/icons-vue'
import { get, post } from '../axios_setting/index'
import { useStore } from 'vuex'
const isVisible = ref(false);
const isVisible1 = ref(false);
const store = useStore();
const subjectOptions = ref<Array<{ value: string; label: string }>>([])
const monthexam = ref<Array<{ name: string; score: string }>>([])
const monthexam1 = ref<Array<{ name: string; score: string }>>([])
const class_value = ref('')
const lineChart = ref<HTMLElement>();
const lineChart1 = ref<HTMLElement>();
const myChart1 = ref<any>();
const myChart2 = ref<any>();
const fetchData = async () => {
    try {
        subjectOptions.value = [];
        monthexam.value = []
        monthexam1.value = []
        const classResponse = await get('/api/subject');
        subjectOptions.value = classResponse.subjectOptions;
    } catch (error) {
        // console.log('获取数据失败', error);
    }
};

onBeforeMount(() => {
    fetchData()
})
const hand_search = () => {

    // store.dispatch('searchData', { id:input1 });
    //此处在数据库中检查数据，成功执行isVisible.value= true...，否则报错
    post('/api/class', { subject: class_value.value }).then((response) => {
        monthexam.value = response.monthexam
        monthexam1.value = response.monthexam1
        isVisible.value = true;
        isVisible1.value = true;
        chartOptions();
        chartOptions1();
    }).catch((err)=>{
        console.log(err);
    })

}
const reset = () => {
    isVisible.value = false;
    isVisible1.value = false;
    myChart1.value.clear();
}
function chartOptions() {
    if (myChart1.value) {
        myChart1.value.clear();
    }
    const x = monthexam.value.map(item => item.name);
    const y = monthexam.value.map(item => item.score);
    // alert("dd")
    setTimeout(function () {
        myChart1.value = echarts.init(lineChart.value!);
        myChart1.value.setOption({
            title: {
                text: `${store.getters.getName}的${class_value.value}成绩报告`,
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: ['成绩'],
                orient: 'vertical',
                right: 60,
                top: 20
            },
            xAxis: {
                data: x,
            },
            yAxis: {},
            color: ['#c38bef', '#6dbcf7'],
            series: [

                {
                    name: '成绩',
                    type: 'line',
                    data: y,
                    barWidth: '20',
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            ]
        });
    }, 100);
}
function chartOptions1() {
    if (myChart2.value) {
        myChart2.value.clear();
    }
    const x = monthexam1.value.map(item => item.name);
    const y = monthexam1.value.map(item => item.score);
    // alert("dd")
    setTimeout(function () {
        myChart2.value = echarts.init(lineChart1.value!);
        myChart2.value.setOption({
            title: {
                text: `${store.getters.getName}的${class_value.value}历次考试排名报告`,
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: ['排名'],
                orient: 'vertical',
                right: 60,
                top: 20
            },
            xAxis: {
                data: x,
            },
            yAxis: {},
            color: ['#c38bef', '#6dbcf7'],
            series: [
                {
                    name: '成绩',
                    type: 'line',
                    data: y,
                    barWidth: '20',
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            ]
        });
    }, 100);
}
</script>
      
<style scoped>
.topmsg {
    font-family: youyuan;
    color: black;
    text-align: center;
    font-size: 30px;
}

span {
    font-family: songti;
    margin-right: 5px;
    font-size: 18px;
    color: rgb(207, 175, 45);
    opacity: 80%;
}

.main {
    width: 742px;
    background-color: rgb(255, 254, 254);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    left: 20%;
}



.btn:hover {
    background-color: rgb(6, 6, 129);
}

.first .second {
    display: inline-block;
    align-items: center;
    justify-content: flex-start;
    width: 200px;
}

.m-2 {
    width: 300px;
}

.first {
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>