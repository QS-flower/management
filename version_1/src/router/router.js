import { createRouter, createWebHistory } from 'vue-router';
import Query from '../main/query.vue'
import Test from '../main/test1.vue'
import Wel from '../main/welcome.vue'
import Apply from '../main/apply.vue'
import Login from '../Login/Login2.vue'
import Layout from '../main/index.vue'
import Analysis from '../main/analysis.vue'
import Analysis1 from '../main/analysis1.vue'
import Analysis2 from '../main/analysis2.vue'
import Setting from '../main/setting.vue'
import Layout1 from '../main/index1.vue'
import Query1 from '../main/query1.vue'
import WatStu from '../main/watchstudent.vue'
import WatCla from '../main/watchclass.vue'
import Update from '../main/updata.vue'
import Change from '../main/change.vue'
import Deal from '../main/deal.vue'
const routes = [
  // 登录页面作为独立的路由
  { path: '/', component: Login },
  // 布局组件包含的其他路由
  {
    path: '/student',
    component: Layout,
    children: [
      { path: 'query', component: Query },
      { path: 'main', component: Wel },
      { path: 'test', component: Test },
      { path: 'apply', component: Apply },
      { path: 'analysis', component: Analysis },
      { path: 'analysis1', component: Analysis1 },
      { path: 'analysis2', component: Analysis2 },
      { path: 'setting',component: Setting}
    ],
  },
  {
    path: '/teacher',
    component: Layout1,
    children: [
      { path: 'main', component: Wel },
      { path: 'query', component:Query1 },
      { path: 'watchstudent', component:WatStu },
      { path: 'watchclass', component:WatCla },
      { path: 'update', component:Update },
      { path: 'change', component:Change },
      { path: 'deal', component:Deal },
      { path: 'setting',component: Setting}
    ],
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router;
