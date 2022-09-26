import axios from "axios";

export default {
    state: {
        courses: []
    },
    getters: {
        courses(state) {
            return state.courses
        }
    },
    actions: {
        getCourses({commit}){
            return axios.get('/api/courses').then(({data}) =>{
                commit('SET_COURSES', data)
            })
        },
        newCourse({commit}, course){
            return axios.post('/api/course', course).then(res => {
                console.log(res.data)
                commit('NEW_COURSE', course)
            })
        },
        removeCourse({commit}, id){
            return axios.delete('/api/course/'+id).then(res => {
                commit('DELETE_COURSE', id)
            })
        },
    },
    mutations: {
        SET_COURSES(state, courses) {
            state.courses = courses
        },
        NEW_COURSE(state, course) {
            state.courses = state.courses.unshift(course)
        },
        DELETE_COURSE(state, id) {
            state.courses = state.courses.filter(f => {
                return f.id !== id
            })
        },
    },
}