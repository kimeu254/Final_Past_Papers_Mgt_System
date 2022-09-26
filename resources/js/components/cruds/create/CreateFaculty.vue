<template>
    <div class="h-100 h-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Create Faculty</h3>

                    <form class="px-md-2" @submit.prevent="onSubmit">


                    <div class="mb-4">
                        <input type="text" id="form3Example1q" class="form-control" v-model="faculty.name" required/>
                        <label class="form-label" for="form3Example1q">Name<span class="text-danger">*</span></label>
                    </div>

                    <div class="mb-4">
                        <select class="form-select" aria-label="Default select example" v-model="faculty.status" required>
                        <option selected></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        </select>
                        <label class="form-label" for="form3Example1q">Status<span class="text-danger">*</span></label>
                    </div>

                    <div class="d-flex justify-content-end">
                        <router-link to="/faculties">
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
import Swal from 'sweetalert2';

export default{
    name:"createFaculty",
    data() {
        return{
            faculty: {
                name: '',
                status: '',
            },
        }
    },
    methods: {
        onSubmit() {
        this.$store.dispatch("newFaculty", this.faculty).then(() => {
            this.$swal.fire({
                icon: 'success',
                title: 'Faculty has been uploaded',
                showConfirmButton: false,
                timer: 1500
            })
            this.$router.push("/faculties")
        })
      },
    },
}
</script>