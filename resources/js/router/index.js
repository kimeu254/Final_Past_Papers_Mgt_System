import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('@/components/layouts/Default.vue')
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('@/components/Dashboard.vue')
/* Authenticated Component */
const Faculties = () => import('@/components/Faculties.vue')
const Courses = () => import('@/components/Courses.vue')
const Units = () => import('@/components/Units.vue')
const Users = () => import('@/components/Users.vue')
const editFaculty = () => import('@/components/cruds/edit/EditFaculty.vue')
const EditCourse = () => import('@/components/cruds/edit/EditCourse.vue')
const EditUnit = () => import('@/components/cruds/edit/EditUnit.vue')
const EditUploads = () => import('@/components/cruds/edit/EditUploads.vue')
const EditUser = () => import('@/components/cruds/edit/EditUser.vue')
const createFaculty = () => import('@/components/cruds/create/CreateFaculty.vue')
const createCourse = () => import('@/components/cruds/create/CreateCourse.vue')
const createUnit = () => import('@/components/cruds/create/CreateUnit.vue')
//const createUser = () => import('@/components/cruds/create/CreateUser.vue')
const Uploads = () => import('@/components/Uploads.vue')
const createUploads = () => import('@/components/cruds/create/CreateUploads.vue')


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            },
            {
                name: "uploads",
                path: '/uploads',
                component: Uploads,
                meta: {
                    title: `Uploads`
                }
            },
            {
                name: "createUploads",
                path: '/createUploads',
                component: createUploads,
                meta: {
                    title: `createUploads`
                }
            },
            {
                name: "editUploads",
                path: '/editUploads/:id',
                component: EditUploads,
                params: true,
                meta: {
                    title: `editUploads`
                }
            },
            {
                name: "users",
                path: '/users',
                component: Users,
                meta: {
                    title: `Users`
                }
            },
            // {
            //     name: "createUser",
            //     path: '/createUser',
            //     component: createUser,
            //     meta: {
            //         title: `createUser`
            //     }
            // },
            {
                name: "editUser",
                path: '/editUser/:id',
                component: EditUser,
                params: true,
                meta: {
                    title: `editUser`
                }
            },
            {
                name: "faculties",
                path: '/faculties',
                component: Faculties,
                meta: {
                    title: `Faculties`
                }
            },
            {
                name: "createfaculty",
                path: '/createFaculty',
                component: createFaculty,
                meta: {
                    title: `createFaculty`
                }
            },
            {
                name: "editFaculty",
                path: '/editFaculty/:id',
                component: editFaculty,
                params: true,
                meta: {
                    title: `editFaculty`
                }
            },
            {
                name: "courses",
                path: '/courses',
                component: Courses,
                meta: {
                    title: `Courses`
                }
            },
            {
                name: "createCourse",
                path: '/createCourse',
                component: createCourse,
                meta: {
                    title: `createCourse`
                }
            },
            {
                name: "editCourse",
                path: '/editCourse/:id',
                component: EditCourse,
                params: true,
                meta: {
                    title: `editCourse`
                }
            },
            {
                name: "units",
                path: '/units',
                component: Units,
                meta: {
                    title: `Units`
                }
            },
            {
                name: "createUnit",
                path: '/createUnit',
                component: createUnit,
                meta: {
                    title: `createUnit`
                }
            },
            {
                name: "editUnit",
                path: '/editUnit/:id',
                component: EditUnit,
                params: true,
                meta: {
                    title: `editUnit`
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router