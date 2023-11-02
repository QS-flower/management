import { createRouter, createWebHistory } from 'vue-router';
import Query from '../main/query.vue'
import Test from '../main/test1.vue'
import Wel from '../main/welcome.vue'
import Apply from '../main/apply.vue'
import Login from '../Login/Login2.vue'
import Layout from '../main/index.vue'
const routes = [
  // 登录页面作为独立的路由
  { path: '/login', component: Login },

  // 布局组件包含的其他路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'query', component: Query },
      { path: 'main', component: Wel },
      { path: 'test', component: Test },
      { path: 'apply', component: Apply },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
