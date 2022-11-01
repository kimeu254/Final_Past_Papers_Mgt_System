<template>
    <div class="container" v-if="user.role_id === 1">
        <h2>Courses</h2>
        <div class="d-flex align-items-end flex-column bd-highlight mb-5">
            <router-link to="/createCourse">
                <button class="btn btn-outline-success">
                    &plus; Add Course
                </button>
            </router-link>
        </div>
        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="datatable">
                <thead class="bg-light">
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Faculty</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course.id">
                        <td>{{ course.id }}</td>
                        <td>{{ course.name }}</td>
                        <td>
                            <span v-if="faculties.length > 0" v-for="faculty in faculties" :key="faculty.id"><span v-if="faculty.id == course.faculty_id">{{ faculty.name }}</span></span>
                            <span v-else>No Faculty</span>
                        </td>
                        <td>{{ course.status }}</td>
                        <td>
                            <div class="d-flex flex-row">
                                <div>
                                    <router-link :to="{name: 'editCourse', params: {id: course.id}}">
                                        <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i>
                                        </button>
                                    </router-link>
                                </div>
                                <div class="px-2">
                                    <button @click="deleteCourse(course.id)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
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
    name: "courses",
    data() {
        return{
            user:this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters(["courses", "faculties"])
    },
    created() {
        this.$store.dispatch("getCourses").then(() => {
            $('#datatable').DataTable()
        })
    },
    watch: {
        courses(val) {
            $('#datatable').DataTable().destroy();
            this.$nextTick(()=> {
                $('#datatable').DataTable()
            });
        }
    },
    methods: {
        deleteCourse(id) {
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
                    this.$store.dispatch("removeCourse", id)
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