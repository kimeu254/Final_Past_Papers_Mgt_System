import axios from "axios";

export default{
    state: {
        users: [],
    },
    getters: {
        users(state) {
            return state.users
        },
        usersCount(state) {
            return state.users.length
        }
    },
    actions: {
        async getUsers({commit}){
            const { data } = await axios.get('/api/users');
            commit('SET_USERS', data);
        },
        async newUser({commit}, user){
            const res = await axios.post('/api/user', user);
            console.log(res.data);
            commit('NEW_USER', user);
        },
        removeUser({commit}, id){
            return axios.delete('/api/user/'+id).then(res => {
                commit('DELETE_USER', id)
            })
        },
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        NEW_USER(state, user) {
            state.users = state.users.unshift(user)
        },
        DELETE_USER(state, id) {
            state.users = state.users.filter(f => {
                return f.id !== id
            })
        },
    },
}