<template>
  <div class="main">
    <div class="first">
      <span>考试：</span>
      <el-select v-model="exam_value" class="m-2" placeholder="请选择考试项目">
        <el-option v-for="item in examOptions" :key="item.value" :label="item.label" :value="item.label" />
      </el-select>
    </div>
    <div class="but">
      <el-button type="success" :icon="Search" @click="hand_search">查询</el-button>
      <el-button :icon="Delete" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref , onBeforeMount} from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
import {get} from '../../axios_setting/index'
import {useStore} from 'vuex'
const store=useStore();
const exam_value = ref('')
const examOptions = ref<Array<{ value: string; label: string }>>([])
const fetchData = async () => {
  try {
    examOptions.value = [];
    const examResponse = await get('/api/exam');
    //console.log('exam数据:', examResponse);
    examOptions.value = examResponse;
  } catch (error) {
    console.log('获取数据失败', error);
  }
};

onBeforeMount(()=>{
  fetchData()
})
const hand_search=()=>{
  // console.log('here')
  store.dispatch('searchData', {exam:exam_value.value});
  store.commit('changeVisual',true)

}
const reset=()=>{
  exam_value.value=''
  store.commit('changeVisual',false)
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
  min-height: 70px;
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