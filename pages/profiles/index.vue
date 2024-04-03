<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">

          <!-- /.col -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header bg-success">
                <h3 class="card-title">User Profile Settings</h3>
              </div>
              <div class="card-body" style="background: rgba(26,166,125,0.34)">
                <div class="tab-content">
                  <div class="active tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Date Of Birth</label>
                        <div class="col-sm-10">
                          <input type="date" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Image</label>
                        <div class="col-sm-10">
                          <input type="file" class="form-control" id="inputSkills">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-4">

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header bg-success">
                <h3 class="card-title">About Me</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body" style="background: rgba(26,166,125,0.34)">

                <div class="text-center">
<!--                  <img-->
<!--                      class="profile-user-img img-fluid img-circle"-->
<!--                      :src="'/images/profile/'"-->
<!--                      alt="User profile picture">-->
                  <img
                       class="profile-user-img img-fluid img-circle"
                       src="/avatar5.png"
                       alt="User profile picture">
                </div>

<!--                <div class="alert alert-danger" v-if="errors.length">-->
<!--                  <ul>-->
<!--                    <li v-for="error in errors" :key="error">{{ error }}</li>-->
<!--                  </ul>-->
<!--                </div>-->

                <hr>
                <strong><i class="fas fa-book mr-1"></i> Name </strong>
                <p class="text-muted">Test</p>

                <hr>

                <strong><i class="fas fa-mail-bulk mr-1"></i> Email </strong>
                <p class="text-muted">test@gmail.com</p>

                <hr>

                <strong><i class="fas fa-calendar-alt mr-1"></i> Date Of Birth </strong>
                <p class="text-muted">02/05/2000</p>
                <hr>
              </div>
              <!-- /.card-body -->
            </div>

          </div>
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script setup>

</script>

<style scoped>

</style>