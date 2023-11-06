<template>
    <el-scrollbar height="600px">
        <Head />
        <Main />
        <Chart />
    </el-scrollbar>
</template>

<script setup>
import Head from './components/body_head.vue'
import Main from './components/body_main.vue'
import Chart from './components/chart.vue'
</script>