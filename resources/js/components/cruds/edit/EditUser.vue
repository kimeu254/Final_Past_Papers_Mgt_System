<template>
    <div class="h-100 h-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Edit User Role</h3>

                    <form class="px-md-2" @submit.prevent="onSubmit" method="post">

                        

                        <div class="mb-4">
                            <input type="text" v-model="user.first_name" name="name" id="first_name" class="form-control" disabled readonly>
                            <label class="form-label" for="form2Example17">First Name<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="text" v-model="user.last_name" name="name" id="last_name" class="form-control" disabled readonly>
                            <label class="form-label" for="form2Example17">Last Name<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="text" v-model="user.email" name="email" id="email" class="form-control" disabled readonly>
                            <label class="form-label" for="form2Example17">Email address<span class="text-danger">*</span></label>
                        </div>

                        
                        <div class="mb-4">
                            
                            <select v-if="roles.length > 0" class="form-select" aria-label="Default select example" v-model="user.role_id" required>
                                <option selected></option>
                                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.display_name }}</option>
                            </select>
                            
                            <input v-else type="text" value="No roles found" class="form-control">
                            <label class="form-label" for="form3Example1q">Role<span class="text-danger">*</span></label>
                        </div>

                        <div class="d-flex justify-content-end">
                            <div>
                                <router-link to="/users">
                                    <button type="button" class="btn btn-light">Cancel</button>
                                </router-link>
                                <button type="submit" class="btn btn-success ms-2">Save Changes</button>
                            </div>

                                             
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
            //user:this.$store.state.auth.user,
        }
    },
    computed: {
        user() {
            return this.$store.state.users.users.find(f => f.id == this.$route.params.id)
        },
        ...mapGetters(["roles"])
    },
    methods: {
        async onSubmit() {
            try {
                let id = this.user.id
                const formData = new FormData()
                formData.append('role_id', this.user.role_id)
                formData.append("_method", 'put')

                const response = await axios.post("/api/user/"+id, formData)
                .then(res => {
                    console.log(res.data)
                })
                .then(() => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'User role updated succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.$router.push("/users")
                })               
            } catch (error) {
                console.error(error.response.data)
            }
            
        }
    }
}
</script>