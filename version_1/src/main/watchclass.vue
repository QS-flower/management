<template>
    <el-scrollbar height="600px">
        <div
            style="font-family: youyuan;font-size: 20px;font-weight: bolder;color: rgb(43, 206, 43);border-bottom: 1px solid #ccdada;">
            班级内查看</div>
        <div class="main">
            <div class="first">
                <span>班级：</span>
                <el-select v-model="class_value" class="m-2" placeholder="请选择班级" @change="handlechange1">
                    <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </div>
            <div class="second">
                <span>考试名称：</span>
                <el-select v-model="exam_value" class="m-2" placeholder="请选择考试名称">
                    <el-option v-for="item in examOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </div>
            <div class="but">
                <el-button type="success" :icon="Search" @click="hand_search">查询</el-button>
                <el-button :icon="Delete" @click="reset">重置</el-button>
            </div>
        </div>
        <div v-if="isVisible" ref="barChart" style="width: 800px;height: 500px;top:30px;left: 20%;"></div>
        <div v-if="isVisible" ref="pieChart" style="width: 800px;height: 500px;top:30px;left: 20%;"></div>
        <div style="font-family: youyuan;font-size: 20px;font-weight: bolder;color: rgb(96, 154, 236);margin-top: 50px;">
            班级间比较
        </div>
        <div class="main">
            <div class="second">
                <span>考试名称：</span>
                <el-select v-model="exam_value1" class="m-2" placeholder="请选择考试名称">
                    <el-option v-for="item in examOptions1" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </div>
            <div class="but" style="margin-left: 465px; position: relative;">
                <el-button type="success" :icon="Search" @click="hand_search1">查询</el-button>
                <el-button :icon="Delete" @click="reset1">重置</el-button>
            </div>
        </div>
        <div v-if="isVisible1" ref="barChart1" style="width: 800px;height: 500px;top:30px;left: 20%;"></div>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import * as echarts from 'echarts';
import { Delete, Search } from '@element-plus/icons-vue'
import { get, post } from '../axios_setting/index'
const isVisible = ref(false);
const isVisible1 = ref(false);
const class_value = ref('')
const exam_value = ref('')
const exam_value1 = ref('')
const classOptions = ref<Array<{ value: string; label: string }>>([])
const examOptions = ref<Array<{ value: string; label: string }>>([])
const examOptions1 = ref<Array<{ value: string; label: string }>>([])
const monthexam2 = ref<Array<{ name: string; value: string }>>([])
const monthexam = ref<Array<{ name: string; score: string }>>([])
const monthexam1 = ref<Array<{ name: string; score: string }>>([])
const barChart = ref<HTMLElement>();
const barChart1 = ref<HTMLElement>();
const pieChart = ref<HTMLElement>();
const myChart1 = ref<any>();
const myChart2 = ref<any>();
const myChart3 = ref<any>();
const fetchData = async () => {
    try {
        classOptions.value = [];
        examOptions.value = [];
        const suboption = await get('/api/watchclass')
        classOptions.value = suboption.class;
    } catch (error) {
        console.log('获取数据失败', error);
    }
};

onBeforeMount(() => {
    fetchData()
})

const hand_search = () => {
    if (exam_value.value != '' && class_value.value != '') {
        post('/api/watchclass0', { class1: class_value.value, exam: exam_value.value }).then((response) => {
            monthexam.value = response.inclassexam;
            monthexam2.value = response.inclassexam1;
            isVisible.value = true;
            chartOptions();
            chartOptions1();
        }).catch((err) => {
            console.log(err);
        })
    }
}
const handlechange1 = () => {
    if (class_value.value != '') {
        post('/api/watchclass2', { class1: class_value.value }).then((response) => {
            examOptions.value = response.exam;
            examOptions1.value = response.exam;
        }).catch((err) => {
            console.log(err);
        })
    } else {
        exam_value.value = '';
        exam_value1.value = '';
    }
}
const hand_search1 = () => {
    if (exam_value1.value != '') {
        post('/api/watchclass1', { exam1: exam_value1.value }).then((response) => {
            monthexam1.value = response;
            isVisible1.value = true;
            chartOptions2();
        }).catch((err) => {
            console.log(err);
        })
    }
}
const reset = () => {
    examOptions1.value = [];
    examOptions.value = [];
    class_value.value = '';
    exam_value.value = '';
    isVisible.value = false;
    myChart1.value.clear();
    myChart2.value.clear();
}
const reset1 = () => {
    exam_value1.value = '';
    isVisible1.value = false;
    myChart1.value.clear();
}
function chartOptions() {
    if (myChart1.value) {
        myChart1.value.clear();
    }
    const x = monthexam.value.map(item => item.name);
    const y = monthexam.value.map(item => item.score);
    setTimeout(function () {
        myChart1.value = echarts.init(barChart.value!);
        myChart1.value.setOption({
            title: {
                text: `${class_value.value}的${exam_value.value}成绩`,
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
                    type: 'bar',
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
    const x = monthexam2.value.map(item => item.name);
    setTimeout(function () {
        myChart2.value = echarts.init(pieChart.value!)
        myChart2.value.setOption({
            title: {
                text: `${class_value.value}${exam_value.value}班级考试成绩分析`,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}:{c}({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                left: 0,
                top: 30,
                height: 150,
                data: x,
            },
            color: ['#61adf2', '#56dae8', '#efa49e', '#7ea1ed', '#5ae05a', '#f2d2a2', '#5881e8', '#63d6c0', '#edc29f', '#5b97d3', '#3eceb3', '#6a96ed', '#426ed1', '#65d18b'],
            series: [
                {
                    name: '班级成绩分析',
                    type: 'pie',
                    radius: '30%',
                    center: ['60%', '50%'],
                    data: monthexam2.value,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}:{c}({d}%)'
                    }
                }
            ]
        })
    }, 100);
}
function chartOptions2() {
    if (myChart3.value) {
        myChart3.value.clear();
    }
    const x = monthexam1.value.map(item => item.name);
    const y = monthexam1.value.map(item => item.score);
    setTimeout(function () {
        myChart3.value = echarts.init(barChart1.value!);
        myChart3.value.setOption({
            title: {
                text: "班级平均成绩",
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
                    type: 'bar',
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
.main {
    background-color: rgb(255, 254, 254);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
    height: 10%;
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
</style>