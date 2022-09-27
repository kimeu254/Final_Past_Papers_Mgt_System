<template>
    <div>
        <!--Main Navigation-->
        <header>
            <!-- Sidebar -->
            <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
                <div class="position-sticky">
                    <div class="list-group list-group-flush mx-3 mt-5">
                    <!-- <router-link :to="{name:'admin'}" class="list-group-item list-group-item-action py-4 ripple" aria-current="true" v-if="user.role_id === 1">
                        <i class="fas fa-th-large fa-fw me-3"></i><span>Dashboard</span>
                    </router-link> -->
                    <router-link :to="{name:'dashboard'}" class="list-group-item list-group-item-action py-4 ripple" aria-current="true">
                        <i class="fas fa-th-large fa-fw me-3"></i><span>Dashboard</span>
                    </router-link>
                    <router-link :to="{name:'users'}" class="list-group-item list-group-item-action py-4 ripple" v-if="user.role_id === 1"><i
                        class="fas fa-users fa-fw me-3"></i><span>Users</span>
                    </router-link>
                    <router-link :to="{name:'faculties'}"  class="list-group-item list-group-item-action py-4 ripple" v-if="user.role_id === 1">
                        <i class="fas fa-university fa-fw me-3"></i><span>Faculties</span>
                    </router-link>
                    <router-link :to="{name:'courses'}"  class="list-group-item list-group-item-action py-4 ripple" v-if="user.role_id === 1"><i
                        class="fas fa fa-graduation-cap me-3"></i><span>Courses</span>
                    </router-link>
                    <router-link :to="{name:'units'}" class="list-group-item list-group-item-action py-4 ripple" v-if="user.role_id === 1"><i
                        class="fas fa-chart-line fa-fw me-3"></i><span>Units</span>
                    </router-link>
                    <router-link :to="{name:'uploads'}" class="list-group-item list-group-item-action py-4 ripple" v-if="user.role_id === 2"><i
                        class="fas fa-upload fa-fw me-3"></i><span>Uploads</span>
                    </router-link>
                    </div>
                </div>
            </nav>
            <!-- Sidebar -->

            <!-- Navbar -->
            <nav id="main-navbar" class="navbar navbar-expand-lg navbar-dark bg-success fixed-top">

                <!-- Container wrapper -->
                <div class="container-fluid">
                <!-- Brand -->
                <a class="navbar-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="38" height="38"
                    viewBox="0 0 48 48"
                    style=" fill:#000000;"><path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z"></path><path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z"></path><path fill="#1976D2" d="M16 21H33V23H16zM16 25H29V27H16zM16 29H33V31H16zM16 33H29V35H16z"></path></svg>
                    <router-link :to="{name:'dashboard'}" class="navbar-brand">
                        <h2>
                            <span class="text-white">Past</span>
                            <span class="text-warning">Papers</span>
                        </h2>
                    </router-link>
                </a>
            

                <!-- Right links -->
                <ul class="navbar-nav ms-auto d-flex flex-row">

                <!-- Avatar -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#"
                    id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <span class="text-light px-2">Hello {{ user.first_name }}</span>
                    <img src="http://www.gravatar.com/avatar/?d=mp" class="rounded-circle" height="22"
                        alt="" loading="lazy" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a></li>
                    </ul>
                </li>
                </ul>
                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
                aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
                </button>
                </div>

                <!-- Container wrapper -->
            </nav>
            <!-- Navbar -->

        </header>

        <main style="margin-top: 100px">
            <router-view></router-view>
        </main>

        <footer class="text-center text-dark bg-light fixed-bottom">
          <div class="text-center p-3">© 2022 Copyright:
            <a class="">JIMMY MUTISO</a>
          </div>
        </footer>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:"default-layout",
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    methods:{
        ...mapActions({
            signOut:"auth/logout"
        }),
        async logout(){
            await axios.post('/logout').then(({data})=>{
                this.signOut()
                this.$router.push({name:"login"})
            })
        }
    }
}
</script>

<style scoped>
    @media (min-width: 991.98px) {
      main {
        padding-left: 240px;
      }
    }
    
    /* Sidebar */
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      padding: 58px 0 0; /* Height of navbar */
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
      width: 240px;
      z-index: 600;
    }
    
    @media (max-width: 991.98px) {
      .sidebar {
        width: 100%;
      }
    }
    .sidebar .active {
      border-radius: 5px;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    }
    
    .sidebar-sticky {
      position: relative;
      top: 0;
      height: calc(100vh - 48px);
      padding-top: 0.5rem;
      overflow-x: hidden;
      overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }
</style>