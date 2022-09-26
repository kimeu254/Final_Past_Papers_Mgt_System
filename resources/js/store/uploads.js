import axios from "axios";

export default {
    state: {
        uploads: []
    },
    getters: {
        uploads(state) {
            return state.uploads
        }
    },
    actions: {
        getUploads({commit}){
            return axios.get('/api/uploads').then(({data}) =>{
                commit('SET_UPLOADS', data)
            })
        },
    },
    mutations: {
        SET_UPLOADS(state, uploads) {
            state.uploads = uploads
        },
    },
}