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

        <div v-for="upload in uploads" :key="upload.id">
            <a :href="'/uploads/'+upload.name" @click.prevent="download(upload.name, upload.title)">
                <p>{{upload.title}} {{ upload.exam_year}}</p>
            </a>
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
            ...mapGetters(["uploads"])
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