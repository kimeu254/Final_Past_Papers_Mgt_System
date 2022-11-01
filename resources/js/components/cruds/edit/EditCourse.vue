<template>
    <div class="h-100 h-custom" v-if="user.role_id === 1">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Edit Course</h3>

                    <form class="px-md-2" @submit.prevent="onSubmit">


                    <div class="mb-4">
                        <input type="text" id="form3Example1q" class="form-control" v-model="course.name" required/>
                        <label class="form-label" for="form3Example1q">Name<span class="text-danger">*</span></label>
                    </div>

                    <div class="mb-4">
                        <select v-if="faculties.length > 0" class="form-select" aria-label="Default select example" v-model="course.faculty_id" required>
                        <option selected></option>
                        <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
                        </select>
                        <input v-else type="text" value="No faculty found" class="form-control">
                        <label class="form-label" for="form3Example1q">Faculty<span class="text-danger">*</span></label>
                    </div>

                    <div class="mb-4">
                        <select class="form-select" aria-label="Default select example" v-model="course.status" required>
                        <option selected></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        </select>
                        <label class="form-label" for="form3Example1q">Status<span class="text-danger">*</span></label>
                    </div>

                    <div class="d-flex justify-content-end">
                        <router-link to="/courses">
                            <button type="submit" class="btn btn-light">Cancel</button>
                        </router-link>
                        <button type="submit" class="btn btn-success ms-2">Save Changes</button>
                    </div>

                    </form>

                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: "editFaculty",
    data() {
        return {
            user:this.$store.state.auth.user,
        }
    },
    computed: {
        course() {
            return this.$store.state.courses.courses.find(f => f.id == this.$route.params.id)
        },
        ...mapGetters(["faculties"])
    },
    methods: {
        async onSubmit() {
            try {
                let id = this.course.id
                const formData = new FormData()
                formData.append('name', this.course.name)
                formData.append('faculty_id', this.course.faculty_id)
                formData.append('status', this.course.status)
                formData.append("_method", 'put')

                const response = await axios.post("/api/course/"+id, formData)
                .then(res => {
                    console.log(res.data)
                })
                .then(() => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Course updated succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.$router.push("/courses")
                })               
            } catch (error) {
                console.error(error.response.data)
            }
            
        }
    }
}
</script>