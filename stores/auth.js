import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("AUTH_STATUS") || false,
    user: JSON.parse(localStorage.getItem("AUTH_TOKEN_USER")) || null,
    token: localStorage.getItem("AUTH_TOKEN") || null,
    permissions:
      JSON.parse(localStorage.getItem("AUTH_USER_PERMISSIONS")) || [],
    roles: JSON.parse(localStorage.getItem("AUTH_USER_ROLES")) || [],
  }),
  actions: {
    async signup(formData) {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] + "auth/signup",
          {
            method: "POST",
            body: JSON.stringify(formData),
          }
        );
        if (response.data.status === "success") {
          navigateTo("/auth/verify-email?email=" + formData.email);
          return true;
        }
      } catch (error) {
        if (error.response.status === 422) {
          useToast().warning(error.response._data.message);
        } else {
          console.log(error);
        }
      }
    },
    async resendVerificationEmail(email) {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] +
            "auth/resendVerificationEmail",
          {
            method: "POST",
            body: JSON.stringify({ email }),
          }
        );
        if (response.data.status === "success") {
          navigateTo("/auth/verify-email?email=" + email);
          useToast().success("Email verification link sent successfully");
          return true;
        }
      } catch (error) {
        useToast().error(
          "Email verification link sending failed! Please try again."
        );
        console.log(error);
      }
    },
    async signin(formData) {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] + "auth/signin",
          {
            method: "POST",
            body: JSON.stringify(formData),
          }
        );
        if (response.data.status === "success") {
          this.isAuthenticated = true;
          this.user = response.data.user;
          this.token = response.data.token;
          localStorage.setItem("AUTH_STATUS", this.isAuthenticated);
          localStorage.setItem("AUTH_TOKEN", response.data.token);
          localStorage.setItem(
            "AUTH_TOKEN_USER",
            JSON.stringify(response.data.user)
          );
          localStorage.setItem(
            "AUTH_USER_PERMISSIONS",
            JSON.stringify(response.data.user.permissions)
          );
          localStorage.setItem(
            "AUTH_USER_ROLES",
            JSON.stringify(response.data.user.role)
          );
          return navigateTo("/");
        }
      } catch (error) {
        if (error.response.status === 401) {
          useToast().warning(error.response._data.data.message);
        } else {
          console.log(error);
        }
      }
    },
    async logout() {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] + "logout",
          {
            method: "POST",
          }
        );
        if (response.status_code === 200) {
          this.isAuthenticated = false;
          this.user = null;
          this.token = null;
          localStorage.removeItem("AUTH_STATUS");
          localStorage.removeItem("AUTH_TOKEN");
          localStorage.removeItem("AUTH_TOKEN_USER");
          localStorage.removeItem("AUTH_USER_PERMISSIONS");
          localStorage.removeItem("AUTH_USER_ROLES");
          return navigateTo("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async forgotPassword(email) {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] + "auth/forgotPassword",
          {
            method: "POST",
            body: JSON.stringify({ email }),
          }
        );
        if (response.data.status === "success") {
          useToast().success(response.data.message);
          return true;
        }
      } catch (error) {
        useToast().error(
          "Password reset email sending failed! Please try again after few minutes."
        );
        console.log(error);
      }
    },
    async resetPassword(formData) {
      try {
        const response = await $fetch(
          useRuntimeConfig().public["apiBaseUrl"] + "auth/resetPasswordProcess",
          {
            method: "POST",
            body: JSON.stringify(formData),
          }
        );
        if (response.data.status === "success") {
          useToast().success(response.data.message);
          navigateTo("/auth");
          return true;
        }
      } catch (error) {
        useToast().error("Password reset failed! Please try again.");
        console.log(error);
      }
    },
  },
});
