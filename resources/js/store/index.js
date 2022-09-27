import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import faculties from '@/store/faculties'
import courses from '@/store/courses'
import units from '@/store/units'
import uploads from '@/store/uploads'
import users from '@/store/users'
import roles from '@/store/roles'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        faculties,
        courses,
        units,
        uploads,
        users,
        roles
    }
})

export default store