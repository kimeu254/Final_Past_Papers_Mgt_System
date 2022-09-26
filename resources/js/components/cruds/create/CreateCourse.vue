<template>
    <div class="h-100 h-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Create Course</h3>

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
                            <button type="submit" class="btn btn-light btn-lg">Cancel</button>
                        </router-link>
                        <button type="submit" class="btn btn-success btn-lg ms-2">Save Changes</button>
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
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default{
    name:"createCourse",
    data() {
        return{
            course: {
                name: '',
                faculty_id: '',
                status: '',
            },
        }
    },
    computed: {
        ...mapGetters(["faculties"])
    },
    methods: {
        onSubmit() {
        this.$store.dispatch("newCourse", this.course).then(() => {
            this.$swal.fire({
                icon: 'success',
                title: 'Course has been uploaded',
                showConfirmButton: false,
                timer: 1500
            })
            this.$router.push("/courses")
        })
      },
    },
}
</script>