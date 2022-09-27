<template>
    <div class="container" v-if="user.role_id === 1">
        <div class="row">
            <div class="col-12 mt-3 mb-1">
                <h5 class="text-uppercase">Dashboard</h5>
                <p>You are logged in as <b>{{user.email}}</b></p>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-users text-info fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{ usersCount }}</h3>
                    <p class="mb-0">Users</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-university text-warning fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{facultiesCount}}</h3>
                    <p class="mb-0">Faculties</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-graduation-cap text-success fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{coursesCount}}</h3>
                    <p class="mb-0">Courses</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-chart-line text-danger fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{unitsCount}}</h3>
                    <p class="mb-0">Units</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    
    </div>
    <div class="container" v-else>
        <div class="row">
            <div class="col-12 mt-3 mb-1">
                <h5 class="text-uppercase">Minimal Statistics Cards</h5>
                <p>You are logged in as <b>{{user.email}}</b></p>
            </div>
        </div>
        <div>
            <div v-for="upload in uploads" :key="upload.id">
            <a :href="'/uploads/'+upload.name" @click.prevent="download(upload.name, upload.title)">
                <p>{{upload.title}} 
                    <span v-if="units.length > 0" v-for="unit in units" :key="unit.id"><span v-if="unit.id == upload.unit_id">{{ unit.name }}</span></span>
                    <span v-else>No Course</span>
                    {{ upload.exam_year}}
                </p>
            </a>
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters(["facultiesCount", "coursesCount", "unitsCount", "usersCount", "uploads", "units"])
    },
    methods: {
            forceFileDownload(response, title) {
                console.log(title)
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', title)
                document.body.appendChild(link)
                link.click()
                },
            download(url, title) {
                axios({
                    method: 'get',
                    url,
                    responseType: 'arraybuffer',
                })
                    .then((response) => {
                    this.forceFileDownload(response, title)
                    })
                    .catch(() => console.log('error occured'))
            },
        }
}
</script>