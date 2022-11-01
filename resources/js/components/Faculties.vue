<template>
    <div class="container" v-if="user.role_id === 1">
        <h2>Faculties</h2>
        <div class="d-flex align-items-end flex-column bd-highlight mb-3">
            <router-link to="/createFaculty">
                <button class="btn btn-outline-success ">
                    &plus; Add Faculty
                </button>
            </router-link>
        </div>

        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="example">
                <thead class="bg-light">
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="faculty in faculties" :key="faculty.id">
                        <td>{{ faculty.id }}</td>
                        <td>{{ faculty.name }}</td>
                        <td>{{ faculty.status }}</td>
                        <td>
                            <div class="d-flex flex-row">
                                <div>
                                <router-link :to="{name: 'editFaculty', params: {id: faculty.id}}">
                                    <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i>Edit</button>
                                </router-link>

                                </div>
                                <div class="px-2">
                                    <button @click="deleteFaculty(faculty.id)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
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
import axios from 'axios';
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name:"faculties",
    data() {
        return {
          faculty: {
            name: '',
            status: '',
          },
          user:this.$store.state.auth.user
        }
    },
    computed: {
      ...mapGetters(["faculties"])
    },
    created() {
      this.$store.dispatch("getFaculties")
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("newFaculty", this.faculty)
      },
      deleteFaculty(id) {
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
                    this.$store.dispatch("removeFaculty", id)
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
      async editFaculty(id) {
        //this.$store.dispatch("updateFaculty", this.faculty)
        // axios.put('/api/faculty/'+id, this.faculty).then(res =>{
        //   console.log(res.data)
        // }).catch((err) => {
        //   console.log(err)
        // })
        try {
                let result = await axios.put("/api/faculty/"+id, this.faculty)
                console.log(result.response.data)
              } catch (error) {
                console.error(error.response.data);    
              }
        
      }
    }    
}
</script>