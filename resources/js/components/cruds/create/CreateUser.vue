<template>
    <div class="h-100 h-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
                <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Create User</h3>

                    <form class="px-md-2" action="javascript:void(0)" @submit.prevent="register" method="post">

                        <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                            <div class="alert alert-danger">
                                <ul class="mb-0">
                                    <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="mb-4">
                            <input type="text" v-model="user.first_name" name="name" id="first_name" class="form-control">
                            <label class="form-label" for="form2Example17">First Name<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="text" v-model="user.last_name" name="name" id="last_name" class="form-control">
                            <label class="form-label" for="form2Example17">Last Name<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="text" v-model="user.email" name="email" id="email" class="form-control">
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

                        <div class="mb-4">
                            <input type="password" v-model="user.password" name="password" id="password" class="form-control">
                            <label class="form-label" for="form2Example27">Password<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="password" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" class="form-control">
                            <label class="form-label" for="form2Example27">Password Confirm<span class="text-danger">*</span></label>
                        </div>

                        <div class="d-flex justify-content-end">
                            <div>
                                <router-link to="/users">
                                    <button type="button" class="btn btn-light">Cancel</button>
                                </router-link>
                            </div>

                            <div class="px-2">
                                <button type="submit" :disabled="processing" class="btn btn-success btn-block">
                                    {{ processing ? "Please wait..." : "Register" }}
                                </button>  
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
 import { mapGetters } from 'vuex';

 export default{
    name: "createUser",
    data() {
        return{
            user:{
                first_name:"",
                last_name:"",
                email:"",
                role_id: "",
                password:"",
                password_confirmation:""
            },
            validationErrors:{},
            processing:false
        }
    },
    computed: {
        ...mapGetters(["roles"])
    },
    methods: {
        async register(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/user',this.user).then(response=>{
                this.validationErrors = {}
                this.$swal.fire({
                    icon: 'success',
                    title: 'User added succesfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push("/users")
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        }
    },
 }
</script>