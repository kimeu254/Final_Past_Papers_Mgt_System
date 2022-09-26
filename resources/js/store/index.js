import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import faculties from '@/store/faculties'
import courses from '@/store/courses'
import units from '@/store/units'
import units from '@/store/uploads'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        faculties,
        courses,
        units,
        uploads
    }
})

export default store