<template>
    <div class="container">
        <h1>Uploads</h1>
        <div class="d-flex align-items-end flex-column bd-highlight mb-3">
            <router-link to="/createUploads">
                <button class="btn btn-outline-success ">
                    &plus; Upload Exam
                </button>
            </router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
        data() {
            return {
                name: '',
                file: '',
                title: '',
                unit_id: '',
                success: ''
            };
        },
        computed: {

        },
        methods: {

        }
}
</script>