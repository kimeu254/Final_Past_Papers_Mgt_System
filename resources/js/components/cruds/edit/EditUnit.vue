<template>
    <div class="h-100 h-custom" v-if="user.role_id === 1">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Edit Unit</h3>

                    <form class="px-md-2" @submit.prevent="onSubmit">


                    <div class="mb-4">
                        <input type="text" id="form3Example1q" class="form-control" v-model="unit.name" required/>
                        <label class="form-label" for="form3Example1q">Name<span class="text-danger">*</span></label>
                    </div>

                    <div class="mb-4">
                        
                        <select v-if="courses.length > 0" class="form-select" aria-label="Default select example" v-model="unit.course_id" required>
                            <option selected></option>
                            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
                        </select>
                        
                        <input v-else type="text" value="No course found" class="form-control">
                        <label class="form-label" for="form3Example1q">Course<span class="text-danger">*</span></label>
                    </div>

                    <div class="mb-4">
                        <select class="form-select" aria-label="Default select example" v-model="unit.status" required>
                        <option selected></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        </select>
                        <label class="form-label" for="form3Example1q">Status<span class="text-danger">*</span></label>
                    </div>

                    <div class="d-flex justify-content-end">
                        <router-link to="/units">
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
        unit() {
            return this.$store.state.units.units.find(f => f.id == this.$route.params.id)
        },
        ...mapGetters(["courses"])
    },
    methods: {
        async onSubmit() {
            try {
                let id = this.unit.id
                const formData = new FormData()
                formData.append('name', this.unit.name)
                formData.append('course_id', this.unit.course_id )
                formData.append('status', this.unit.status)
                formData.append("_method", 'put')

                const response = await axios.post("/api/unit/"+id, formData)
                .then(res => {
                    console.log(res.data)
                })
                .then(() => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Unit updated succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.$router.push("/units")
                })               
            } catch (error) {
                console.error(error.response.data)
            }
            
        }
    }
}
</script>