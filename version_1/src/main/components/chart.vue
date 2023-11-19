<template>
    <div class="main" v-if="visual2">
        <div ref="barChart1" style="width: 800px;height: 500px;top:30px;left: 20%;"></div>
    </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref,computed ,watch,onMounted} from 'vue'
import { useStore } from 'vuex'
const store = useStore();
//const monthexam = ref<Array<{ name: string; score: string }>>([])
const barChart1 = ref<HTMLElement>();
const myChart1 = ref<any>();
const monthexam=computed(()=>{
    const data=store.getters.search_result
    //console.log(data)
    return data
})
const exam_value=computed(()=>{
    const data=store.getters.getExam
    return data
})
function chartOptions() {
    if (myChart1.value) {
        myChart1.value.clear();
    }
    const x = monthexam.value.map(item => item.subject);
    const y = monthexam.value.map(item => item.score);
    setTimeout(function () {
        myChart1.value = echarts.init(barChart1.value!);
        myChart1.value.setOption({
            title: {
                text: `${store.getters.getName}的${exam_value.value}成绩`,
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
    console.log("monthexam"+monthexam)
}
watch(monthexam, () => {
  chartOptions();
});
onMounted(()=>{
    chartOptions()
})
const visual2=computed(()=>{
    return store.getters.getVisual
})
</script>

<style scoped>
.main{
    height: 50%;
    margin-top: 1%;
    background-color: rgb(255, 254, 254);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}
</style>


