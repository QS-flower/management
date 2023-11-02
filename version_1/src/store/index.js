import {createStore} from 'vuex'
import {post,get} from '../axios_setting/index'
export default createStore({
    state:{
        data:[],
        search_result:[]
    },
    mutations:{
        updata(state,results){
            state.search_result=results
        }
    },
    actions:{
        searchData({commit,state},query){
            console.log(query)
            post('/api/exam_course',query).then(function(response){
                console.log('exam_course:'+response)
                const results=response
                commit('updata',results)
            }).catch(function(error){
                // const results=state.data;
                // commit('updata',results)
            })
        }
    },
    getters:{
        search_result:state=>state.search_result
    }
})