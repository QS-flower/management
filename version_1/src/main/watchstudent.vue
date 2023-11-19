<template>
    <el-scrollbar height="600px">
        <div class="main">
            <div style="text-align: center; font-family: youyuan; font-weight:500;position: relative;left: 35%;">学 生 成 绩 分 析
            </div>
            <div style="height: 150px; border: 1px solid rgb(216, 214, 214);position: relative;left: 35%;">
                <div class="first">
                    <span style="margin-left: 26%;position: relative;left: 11.9%;">请输入待查询学生学号</span><el-input
                        v-model="input1" placeholder="输入学号进行查询"
                        style="margin-top: 30px;margin-bottom: 30px;width: 500px;position: relative;left: 15.5%;" />
                </div>
                <div class="but" style="position: relative; left:37.9%; width: 200px;">
                    <el-button type="success" :icon="Search" @click="hand_search">查询</el-button>
                    <el-button :icon="Delete" @click="reset">重置</el-button>
                </div>
            </div>
            <div v-if="isVisible" ref="lineChart" style="width: 800px;height: 500px;top:30px;left: 31%;"></div>
            <div v-if="isVisible1" ref="lineChart1" style="width: 800px;height: 500px;top:30px;left: 31%;"></div>
        </div>
    </el-scrollbar>
</template>
  
  
   
<script lang="ts" setup>

import { ref, onBeforeMount, onMounted } from 'vue'
import * as echarts from 'echarts';
import { Delete, Search } from '@element-plus/icons-vue'
import { get, post } from '../axios_setting/index'
const isVisible = ref(false);
const isVisible1 = ref(false);
const input1 = ref('');
const examscore = ref<Array<{ name: string; score: string }>>([])
const examsrank = ref<Array<{ name: string; rank: string }>>([])
const lineChart = ref<HTMLElement>();
const lineChart1 = ref<HTMLElement>();
const myChart1 = ref<any>();
const myChart2 = ref<any>();
const fetchData = async () => {
    try {

    } catch (error) {
        // console.log('获取数据失败', error);
    }
};

onBeforeMount(() => {
    fetchData()
})
const hand_search = () => {
    if (input1.value != '') {
        post('/api/watchstudent', { sid: input1.value }).then((response) => {
            examscore.value = response.examscore;
            examsrank.value = response.examsrank;
            isVisible.value = true;
            isVisible1.value = true;
            chartOptions();
            chartOptions1();
        }).catch((err) => {
            console.log(err);
        })
    }
}
const reset = () => {
    input1.value = '';
    isVisible.value = false;
    isVisible1.value = false;
    myChart1.value.clear();
    myChart2.value.clear();
}
function chartOptions() {
    if (myChart1.value) {
        myChart1.value.clear();
    }
    const x = examscore.value.map(item => item.name);
    const y = examscore.value.map(item => item.score);
    setTimeout(function () {
        myChart1.value = echarts.init(lineChart.value!);
        myChart1.value.setOption({
            title: {
                text: `${input1.value}的成绩报告`,
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
    const x = examsrank.value.map(item => item.name);
    const y = examsrank.value.map(item => item.rank);
    setTimeout(function () {
        myChart2.value = echarts.init(lineChart1.value!);
        myChart2.value.setOption({
            title: {
                text: `${input1.value}的历次成绩排名`,
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
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                inverse: true,
                axisLine: {
                    show: false
                }
            },
            color: ['red', '#6dbcf7'],
            series: [
                {
                    name: '排名',
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
}

.main1 {
    width: 1000px;
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
    left: 11%;
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
</style>