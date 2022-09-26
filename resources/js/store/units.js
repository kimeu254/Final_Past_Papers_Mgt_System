import axios from "axios";

export default {
    state: {
        units: []
    },
    getters: {
        units(state) {
            return state.units
        }
    },
    actions: {
        getUnits({commit}){
            return axios.get('/api/units').then(({data}) =>{
                commit('SET_UNITS', data)
            })
        },
        newUnit({commit}, unit){
            return axios.post('/api/unit', unit).then(res => {
                console.log(res.data)
                commit('NEW_UNIT', unit)
            })
        },
        removeUnit({commit}, id){
            return axios.delete('/api/unit/'+id).then(res => {
                commit('DELETE_UNIT', id)
            })
        },
    },
    mutations: {
        SET_UNITS(state, units) {
            state.units = units
        },
        NEW_UNIT(state, unit) {
            state.units = state.units.unshift(unit)
        },
        DELETE_UNIT(state, id) {
            state.units = state.units.filter(f => {
                return f.id !== id
            })
        },
    },
}