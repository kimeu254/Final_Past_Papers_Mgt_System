import axios from "axios";

export default {
    state: {
        faculties: [],
    },
    getters: {
        faculties(state) {
            return state.faculties
        }
    },
    actions: {
        getFaculties({commit}){
            return axios.get('/api/faculties').then(({data}) =>{
                commit('SET_FACULTIES', data)
            })
        },
        newFaculty({commit}, faculty){
            return axios.post('/api/faculty', faculty).then(res => {
                console.log(res.data)
                commit('NEW_FACULTY', faculty)
            })
        },
        removeFaculty({commit}, id){
            return axios.delete('/api/faculty/'+id).then(res => {
                commit('DELETE_FACULTY', id)
            })
        },
        async updateFaculty({commit}, id, faculty){
            // return axios.put('/api/faculty/'+id).then(res =>{
            //     commit('EDIT_FACULTY', id)
            // })  
            try {
                let result = await axios.put("/api/faculty/"+id, faculty)
                console.log(result.response.data)
                commit('EDIT_FACULTY', faculty)
              } catch (error) {
                console.error(error.response.data);    
              }
        }
    },
    mutations: {
        SET_FACULTIES(state, faculties) {
            state.faculties = faculties
        },
        NEW_FACULTY(state, faculty) {
            state.faculties = state.faculties.unshift(faculty)
        },
        DELETE_FACULTY(state, id) {
            state.faculties = state.faculties.filter(f => {
                return f.id !== id
            })
        },
        EDIT_FACULTY(state, faculty) {
            const index = state.faculties.findIndex(f => f.id === faculty.id)

            if(index !== -1) {
                state.faculties.splice(index, 1, faculty)
            }
        }
    },
}