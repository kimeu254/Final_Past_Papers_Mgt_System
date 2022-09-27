<template>
    <div class="vh-100" >
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
                <div class="card" style="border-radius: 1rem; background: whitesmoke;">
                <div class="row g-0">
                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 0;" />
                    </div>
                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">

                        <form action="javascript:void(0)" @submit="register" class="row" method="post">

                        <div class="d-flex align-items-center mb-3 pb-1">
                            <h1 class="h1 fw-bold mb-0">
                                <span class="text-success">Past</span>
                                <span class="text-warning">Papers</span>
                            </h1>
                        </div>

                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Create an account</h5>

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
                            <input type="password" v-model="user.password" name="password" id="password" class="form-control">
                            <label class="form-label" for="form2Example27">Password<span class="text-danger">*</span></label>
                        </div>

                        <div class="mb-4">
                            <input type="password" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" class="form-control">
                            <label class="form-label" for="form2Example27">Password Confirm<span class="text-danger">*</span></label>
                        </div>

                        <div class="pt-1 mb-4">
                            <button type="submit" :disabled="processing" class="btn btn-success btn-lg btn-block">
                                {{ processing ? "Please wait..." : "Register" }}
                            </button>
                        </div>

                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Already have an account? <router-link :to="{name:'login'}" class="text-success">Login Now!</router-link></p>
                        
                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:'register',
    data(){
        return {
            user:{
                first_name:"",
                last_name:"",
                email:"",
                password:"",
                password_confirmation:""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async register(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/register',this.user).then(response=>{
                this.validationErrors = {}
                this.signIn()
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
    }
}
</script>