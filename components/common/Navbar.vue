<script setup lang="ts">

import {useAuthStore} from "~/stores/auth";
</script>

<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light custom-navbar-background">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link pl-0" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-bell"></i>
                    <span class="badge badge-warning navbar-badge">15</span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-item dropdown-header">15 Notifications</span>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-envelope mr-2"></i> 4 new messages
                        <span class="float-right text-muted text-sm">3 mins</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-users mr-2"></i> 8 friend requests
                        <span class="float-right text-muted text-sm">12 hours</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-file mr-2"></i> 3 new reports
                        <span class="float-right text-muted text-sm">2 days</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
            </li>
            <li class="nav-item">
                <p class="navbar-user-info"><strong>{{useAuthStore().user?.name}}</strong> <br> Superadmin</p>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link navbar-user-logo" data-toggle="dropdown" href="#">
                    <img class="img-circle" src="https://lh3.googleusercontent.com/ogw/AGvuzYa0dHMA3dACgya-5rKD4JmT4qhfFZPx0DiyLxIgOw=s32-c-mo" alt="" srcset="">
                </a>
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-user mr-2"></i> Profile
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="javascript:" class="dropdown-item" @click="useAuthStore().logout()">
                        <i class="fa fa-sign-out-alt mr-2"></i> Sign Out
                    </a>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style scoped>

</style>