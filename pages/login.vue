<script setup>
import { useAuthStore } from "~/stores/auth";

const { $toast } = useNuxtApp();
const authStore = useAuthStore();

import { useForm } from "vee-validate";
import * as yup from "yup";

const remember_me = useCookie("remember");
if (remember_me.value === undefined) {
  remember_me.value = {
    is_remember_me: false,
    email: "",
    password: "",
  };
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const [email, password] = useFieldModel(["email", "password"]);

email.value = remember_me.value.email;
password.value = remember_me.value.password;

const remember = ref(remember_me.value.is_remember_me);

const borderDanger = ref("");
const loginFailed = ref(false);

useHead({
  title: "Login",
});

definePageMeta({
  layout: "auth",
});

const onSubmit = handleSubmit((values) => {
  try {
    const form = ref({
      email: email.value,
      // phone: phone.value,
      password: password.value,
    });
    const isSigninSuccess = authStore.signin(form.value);
    if (!isSigninSuccess) {
      loginFailed.value = true;
      borderDanger.value = "border border-danger";
    } else {
      if (remember.value) {
        remember_me.value = {
          is_remember_me: true,
          email: email.value,
          password: password.value,
        };
      } else {
        remember_me.value = {
          is_remember_me: false,
          email: "",
          password: "",
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>DPHE</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to Start your session</p>

          <form @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
                autofocus
                :class="!email || loginFailed ? borderDanger : ''"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
              <span class="error">
                {{ errors.email }}
              </span>
            </div>

            <!-- <div class="input-group mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="phone"
                v-model="phone"
                autofocus
                :class="!phone || loginFailed ? borderDanger : ''"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
              <span class="error">
                {{ errors.phone }}
              </span>
            </div> -->

            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
                :class="!password || loginFailed ? borderDanger : ''"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
              <span class="error">{{ errors.password }}</span>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" v-model="remember" />
                  <label for="remember"> Remember Me </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
          <p class="mb-1">
            <NuxtLink to="/forgot-password">I forgot my password</NuxtLink>
          </p>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </body>
</template>

<style scoped></style>
