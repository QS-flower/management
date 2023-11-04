import { createStore } from 'vuex'
import { post, get } from '../axios_setting/index'
export default createStore({
    state: {
        name: '',
        data: [],
        search_result: [],
        message:[],
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    mutations: {
        updata(state, results) {
            state.search_result = results
        },
        changeLogin(state, user) {
            state.Authorization = user;
            //console.log(state.Authorization+'here')
            localStorage.setItem('Authorization', user.Authorization);
        },
        changeMsg(state,msg){
            state.message=msg
        },
        changeName(state, user_name) {
            state.name = user_name
        }
    },
    actions: {
        searchData({ commit, state }, query) {
            //console.log(query)
            post('/api/exam_course', query).then(function (response) {
                //console.log('exam_course:' + response)
                const results = response
                commit('updata', results)
            }).catch(function (error) {
                // const results=state.data;
                // commit('updata',results)
            })
        }
    },
    getters: {
        getName: state => state.name,
        search_result: state => state.search_result,
        getMsg:state=>state.message,
    }
})