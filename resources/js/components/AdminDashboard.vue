<template>
    <div class="container">

        <div class="row">
            <div class="col-12 mt-3 mb-1">
                <h5 class="text-uppercase">Minimal Statistics Cards</h5>
                <p>You are logged in as <b>{{user.email}}</b></p>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-users text-info fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{ usersCount }}</h3>
                    <p class="mb-0">Users</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-university text-warning fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{facultiesCount}}</h3>
                    <p class="mb-0">Faculties</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-graduation-cap text-success fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{coursesCount}}</h3>
                    <p class="mb-0">Courses</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 mb-4">
            <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between px-md-1">
                <div class="align-self-center">
                    <i class="fas fa-chart-line text-danger fa-3x"></i>
                </div>
                <div class="text-end">
                    <h3>{{unitsCount}}</h3>
                    <p class="mb-0">Units</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters(["facultiesCount", "coursesCount", "unitsCount", "usersCount"])
    }
}
</script>