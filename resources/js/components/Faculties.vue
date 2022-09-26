<template>
    <div class="container">
        <h1>Faculties</h1>
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
                                    <button data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + faculty.id" type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i></button>
                                <!-- <router-link :to="{name: 'editFaculty', params: {id: faculty.id}}">
                                    <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i>Edit</button>
                                </router-link> -->

                                </div>
                                <div class="px-2">
                                    <button @click="deleteFaculty(faculty.id)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                                </div>
                            </div>
                        </td>
                        <div class="modal" :id="'staticBackdrop' + faculty.id"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">New Faculty</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form action="" @submit.prevent="editFaculty(faculty.id)">
                                    <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12 form-group">
                                        <label for="title" class="col-form-label col-form-label-lg">
                                            Name 
                                            <span class="text-danger">*</span>
                                        </label>
                                        <input type="name" class="form-control" v-model.trim="faculty.name" required=""/>
                                        </div>
                                        <div class="col-12 form-group">
                                        <label for="title" class="col-form-label col-form-label-lg">
                                            Status 
                                            <span class="text-danger">*</span>
                                        </label>
                                        <select class="form-select" aria-label="Default select example" v-model.trim="faculty.status">
                                            <option selected></option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
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
          }
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