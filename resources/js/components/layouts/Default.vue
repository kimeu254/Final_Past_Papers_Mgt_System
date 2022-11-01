<template>
    <div class="container-scroller">
        <nav class="sidebar sidebar-offcanvas bg-white" id="sidebar" :class="{ active : isActive}">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top bg-success">
          <a class="sidebar-brand brand-logo">
            <div class="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="38" height="38"
                    viewBox="0 0 48 48"
                    style=" fill:#000000;"><path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z"></path><path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z"></path><path fill="#1976D2" d="M16 21H33V23H16zM16 25H29V27H16zM16 29H33V31H16zM16 33H29V35H16z"></path>
                </svg>
                <router-link :to="{name:'dashboard'}" class="navbar-brand">
                    <h2>
                        <span class="text-white">Past</span>
                        <span class="text-warning">Papers</span>
                    </h2>
                </router-link>
            </div>
          </a>
          <a class="sidebar-brand brand-logo-mini">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="38" height="38"
                    viewBox="0 0 48 48"
                    style=" fill:#000000;"><path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z"></path><path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z"></path><path fill="#1976D2" d="M16 21H33V23H16zM16 25H29V27H16zM16 29H33V31H16zM16 33H29V35H16z"></path>
            </svg>
          </a>
        </div>
        <ul class="nav">
          <li class="nav-item nav-category">
            <span class="nav-link"></span>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'dashboard'}" class="nav-link" aria-current="true">
                <span class="menu-icon">
                <i class="mdi mdi-view-dashboard"></i>
              </span>
              <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'users'}" class="nav-link"  aria-current="true" v-if="user.role_id === 1">
                <span class="menu-icon">
                <i class="mdi mdi-account-group"></i>
              </span>
              <span class="menu-title">Users</span>
            </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'faculties'}" class="nav-link"  aria-current="true" v-if="user.role_id === 1">
                <span class="menu-icon">
                <i class="mdi mdi-pillar"></i>
              </span>
              <span class="menu-title">Faculties</span>
            </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'courses'}" class="nav-link"  aria-current="true" v-if="user.role_id === 1">
                <span class="menu-icon">
                <i class="mdi mdi-school"></i>
              </span>
              <span class="menu-title">Courses</span>
            </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'units'}" class="nav-link"  aria-current="true" v-if="user.role_id === 1">
                <span class="menu-icon">
                <i class="mdi mdi-chart-line"></i>
              </span>
              <span class="menu-title">Units</span>
            </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link :to="{name:'uploads'}" class="nav-link"  aria-current="true" v-if="user.role_id === 2">
              <span class="menu-icon">
                <i class="mdi mdi-upload"></i>
              </span>
              <span class="menu-title">Uploads</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="container-fluid page-body-wrapper">
        <nav class="navbar p-0 fixed-top d-flex flex-row bg-success">
          <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <a class="navbar-brand brand-logo-mini">
                <div class="d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="38" height="38"
                        viewBox="0 0 48 48"
                        style=" fill:#000000;"><path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z"></path><path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z"></path><path fill="#1976D2" d="M16 21H33V23H16zM16 25H29V27H16zM16 29H33V31H16zM16 33H29V35H16z"></path>
                    </svg>
                    <router-link :to="{name:'dashboard'}" class="navbar-brand">
                        <h2>
                            <span class="text-white">Past</span>
                            <span class="text-warning">Papers</span>
                        </h2>
                    </router-link>
                </div>
            </a>
          </div>
          <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" @click="minimize">
              <span class="mdi mdi-menu"></span>
            </button>
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item dropdown">
                <a class="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                  <div class="navbar-profile">
                    <img src="http://www.gravatar.com/avatar/?d=mp" class="rounded-circle" height="22"
                        alt="" loading="lazy" />
                    <p class="mb-0 d-none d-sm-block navbar-profile-name">Hello {{ user.first_name }}</p>
                    <i class="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                  <a class="dropdown-item preview-item" href="javascript:void(0)" @click="logout">
                    <div class="preview-item-content d-flex">
                        <i class="mdi mdi-logout text-danger"></i>
                        <p class="preview-subject mb-1">Log out</p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" @click="isActive = !isActive">
              <span class="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
        <div class="main-panel">
            <main class="content-wrapper">
                <router-view></router-view>
            </main>
            <footer class="footer container" style="background: whitesmoke;">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                    <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2022</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Open <a href="https://github.com/kimeu254" target="_blank">Source</a> available on github</span>
                </div>
          </footer>
        </div>
      </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

const links = document.querySelectorAll(".nav-item");

links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
    })
})

export default {
    name:"default-layout",
    data(){
        return {
            user:this.$store.state.auth.user,
            isActive: false,
            active: false
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
        },
        minimize() {
            var myBody = document.getElementsByTagName('body')[0]
            if ((myBody.classList.contains('sidebar-toggle-display') || myBody.classList.contains('sidebar-absolute'))) {
                myBody.classList.toggle('sidebar-hidden')
            }
            else {
                myBody.classList.toggle('sidebar-icon-only')
            }
        },
        myFilter() {
          this.isActive = !this.isActive;
        }
    }
}
</script>
