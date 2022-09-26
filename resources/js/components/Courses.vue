<template>
    <div class="container">
        <h1>Courses</h1>
        <div class="d-flex align-items-end flex-column bd-highlight mb-3">
            <router-link to="/createCourse">
                <button class="btn btn-outline-success">
                    &plus; Add Course
                </button>
            </router-link>
        </div>
        <div class="table-responsive">
            <table class="table table-hover align-middle bg-white" id="example">
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
                                    <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil"></i></button>
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

export default{
    name: "courses",
    data() {
        return{}
    },
    computed: {
        ...mapGetters(["courses", "faculties"])
    },
    created() {
        this.$store.dispatch("getCourses")
        },
    methods: {
        deleteCourse(id) {
            this.$store.dispatch("removeCourse", id)
        },
    }, 
}
</script>