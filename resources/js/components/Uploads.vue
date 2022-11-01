<template>
    <div class="container" v-if="user.role_id == 2">
        <h2>Uploads</h2>
        <div class="d-flex align-items-end flex-column bd-highlight mb-3">
            <router-link to="/createUploads">
                <button class="btn btn-outline-success ">
                    &plus; Upload Exam
                </button>
            </router-link>
        </div>

        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="example">
                <thead class="bg-light">
                    <tr>
                        <th>Title</th>
                        <th>Unit</th>
                        <th>Exam Year</th>
                        <th>Actions</th>
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
                        <td>
                            <div class="d-flex flex-row">
                                <div>
                                <router-link :to="{name: 'editUploads', params: {id: upload.id}}">
                                    <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i></button>
                                </router-link>

                                </div>
                                <div class="px-2">
                                    <button @click="deleteFaculty(faculty.id)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
        data() {
            return {
                user:this.$store.state.auth.user
            };
        },
        computed: {
            ...mapGetters(["uploads", "units"])
        },
        created() {
            this.$store.dispatch("getUploads")
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