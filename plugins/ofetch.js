import { ofetch } from 'ofetch';
import { useAuthStore } from "~/stores/auth";
import { useToast } from "vue-toastification";

export default defineNuxtPlugin((_nuxtApp) => {
  
  const authStore = useAuthStore();

  globalThis.$fetch = ofetch.create({
    onRequest ({ request, options }) {
      if (authStore.isAuthenticated) {
        options.headers = { 
          Authorization: `Bearer ${authStore.token}`,
          Accept: 'application/json',
        }
      }
    },
    onRequestError({ request, options, error }) {
    },
    onResponse({ request, response, options }) {
    },
    onResponseError({ request, response, options }) {
      console.log('error=>', response);
      if(response.status === 422 && response.hasOwnProperty('_data') && response._data.hasOwnProperty('message')){
          useToast().error(response._data.message);
      }

      if(response.status === 401){
        authStore.isAuthenticated = false;
        authStore.user = null;
        authStore.token = null;
        localStorage.removeItem("AUTH_STATUS");
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("AUTH_TOKEN_USER");
        localStorage.removeItem("AUTH_USER_PERMISSIONS");
        localStorage.removeItem("AUTH_USER_ROLES");
        return navigateTo('/login');
      }
    }
  })
})