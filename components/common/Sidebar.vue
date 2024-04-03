<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
</script>

<template>
  <aside class="main-sidebar sidebar-dark-primary">
    <!-- Brand Logo -->
    <a href="#" class="brand-link text-center custom-navbar-background">
      <img
        src="https://e7.pngegg.com/pngimages/18/660/png-clipart-dhaka-government-of-bangladesh-vision-2021-logo-logo-sign-thumbnail.png"
        alt="AdminLTE Logo"
        class="left-logo img-circle"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">DPHE</span>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/PKSF_Official_Logo.png/791px-PKSF_Official_Logo.png?20210826043115"
        alt="AdminLTE Logo"
        class="right-logo"
        style="opacity: 0.8"
      />
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">
              <i class="nav-icon fas fa-th-large"></i>
              <p>Dashboard</p>
            </NuxtLink>
          </li>

          <!-- <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-globe-asia"></i>
                            <p>
                                Organizations
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Submenu 1</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Submenu 2</p>
                                </a>
                            </li>
                        </ul>
                    </li> -->

          <!-- users -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                User Information
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/designations">
                  <i class="fas fa-users nav-icon"></i>
                  <p>Designations</p>
                </NuxtLink>
              </li>
            </ul>

            <ul class="nav nav-treeview">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/roles">
                  <i class="fas fa-users nav-icon"></i>
                  <p>Roles</p>
                </NuxtLink>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/users">
                  <i class="fas fa-users nav-icon"></i>
                  <p>Users</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- <li class="nav-header">Authenticate</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <NuxtLink class="nav-link" to="/profiles">
                <i class="nav-icon fas fa-cog"></i>
                <p>Profile</p>
              </NuxtLink>
            </a>
          </li> -->
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style scoped></style>
