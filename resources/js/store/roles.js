import axios from "axios";

export default{
    state: {
        roles: []
    },
    getters: {
        roles(state) {
            return state.roles
        },
    },
    actions: {
        async getRoles({commit}){
            const { data } = await axios.get('/api/roles');
            commit('SET_ROLES', data);
        },
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles
        }
    },
}