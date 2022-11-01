<template>
    <div class="container" v-if="user.role_id === 1">
        <h2>Users</h2>
        <div class="d-flex align-items-end flex-column bd-highlight mb-3">
                <button class="btn btn-outline-success ">
                    &plus; Add New User
                </button>
        </div>
  
        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="example">
                <thead class="bg-light">
                    <tr>
                        <th>#ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <span v-if="roles.length > 0" v-for="role in roles" :key="role.id"><span v-if="role.id == user.role_id">{{ role.display_name }}</span></span>
                            <span v-else>No role</span>
                        </td>
                        <td>
                            <div class="d-flex flex-row">
                                <div>
                                    <router-link :to="{name: 'editUser', params: {id: user.id}}">
                                        <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i>
                                        </button>
                                    </router-link>
                                </div>
                                <div class="px-2">
                                    <button @click="deleteUser(user.id)" type="button" class="btn btn-outline-danger pl-2"><i class="bi bi-trash"></i></button>
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
import Swal from 'sweetalert2';

export default{
    name: "users",
    data() {
        return{
            user:this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters(["users", "roles"])
    },
    created() {
        this.$store.dispatch("getUsers")
        this.$store.dispatch("getRoles")
    },
    methods: {
        deleteUser(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((response)=>{
                if (response.isConfirmed){
                    this.$store.dispatch("removeUser", id)
                    this.$swal.fire(
                        {
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        }
                    )
                } else if (
                    response.dismiss === Swal.DismissReason.cancel
                ) {
                    this.$swal.fire({
                        title: 'Canceled',
                        text: 'Your imaginary file is safe :)',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
    }, 
  }
  </script>