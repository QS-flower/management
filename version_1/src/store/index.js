import { createStore } from 'vuex'
import { post, get } from '../axios_setting/index'
export default createStore({
    state: {
        name: '',
        data: [],
        search_result: [],
        message:[],
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        exam:'',
        visual:false,
        rank:{score:0,rank1:1,number:1306},
    },
    mutations: {
        updata(state, results) {
            state.search_result = results
        },
        changeLogin(state, user) {
            state.Authorization = user;
            //console.log(state.Authorization+'here')
            localStorage.setItem('Authorization', user);
        },
        changeMsg(state,msg){
            state.message=msg
        },
        changeName(state, user_name) {
            state.name = user_name
        },
        changeExam(state,exam1){
            state.exam=exam1
        },
        changeVisual(state,visual1){
            state.visual=visual1
        },
        changeRank(state,rank1){
            state.rank=rank1;
        }
    },
    actions: {
        searchData({ commit, state }, query) {
            console.log(query)
            commit('changeExam',query.exam)
            post('/api/exam_course', query).then(function (response) {
                //console.log('exam_course:' + response)
                const results = response.grade
                const ranks=response.rank
                commit('updata', results)
                commit('changeRank',ranks)
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
        getExam:state=>state.exam,
        getVisual:state=>state.visual,
        getRank:state=>state.rank,
    }
})