<template>
    <div class="container" v-if="user.role_id === 1">
        <div class="row">
            <div class="col-12 mt-3 mb-1">
                <h4 class="text-uppercase">Dashboard</h4>
                <p class="py-3">You are logged in as <b>{{user.email}}</b></p>
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
                <h3 class="text-uppercase">Dashboard</h3>
                <p>You are logged in as <b>{{user.email}}</b></p>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="datatable">
                <thead class="bg-light">
                    <tr>
                        <th>Title</th>
                        <th>Unit</th>
                        <th>Exam Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="upload in uploads" :key="upload.id">
                        <td>
                            <a :href="'/uploads/'+upload.name" @click.prevent="download(upload.name, upload.title)">
                                <p>{{upload.title}} </p>
                            </a>
                        </td>
                        <td>
                            <span v-if="units.length > 0" v-for="unit in units" :key="unit.id"><span v-if="unit.id == upload.unit_id">{{ unit.name }}</span></span>
                            <span v-else>No Course</span>
                        </td>
                        <td>{{ upload.exam_year}}</td>
                    </tr>
                </tbody>
            </table>
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
    created() {
        this.$store.dispatch("getUploads").then(() => {
            $('#datatable').DataTable()
        })
    },
    watch: {
        uploads(val) {
            $('#datatable').DataTable().destroy();
            this.$nextTick(()=> {
                $('#datatable').DataTable()
            });
        }
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