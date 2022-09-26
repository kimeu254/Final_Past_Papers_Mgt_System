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
                <i class="fas fa-pencil-alt text-info fa-3x"></i>
              </div>
              <div class="text-end">
                <h3>278</h3>
                <p class="mb-0">New Posts</p>
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
                <i class="far fa-comment-alt text-warning fa-3x"></i>
              </div>
              <div class="text-end">
                <h3>156</h3>
                <p class="mb-0">New Comments</p>
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
                <i class="fas fa-chart-line text-success fa-3x"></i>
              </div>
              <div class="text-end">
                <h3>64.89 %</h3>
                <p class="mb-0">Bounce Rate</p>
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
                <i class="fas fa-map-marker-alt text-danger fa-3x"></i>
              </div>
              <div class="text-end">
                <h3>423</h3>
                <p class="mb-0">Total Visits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </div>
</template>

<script>
export default {
    name:"dashboard",
    data(){
        return {
            user:this.$store.state.auth.user
        }
    }
}
</script>