import {useAuthStore} from "~/stores/auth";
import {defineNuxtRouteMiddleware, navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    let guest_path = ['/login', '/forgot-password', '/reset-password'];
    if(guest_path.includes(to.path) && auth.isAuthenticated){
        return navigateTo('/');
    }else if(!auth.isAuthenticated && !guest_path.includes(to.path)){
        return navigateTo('/login');
    }

  })