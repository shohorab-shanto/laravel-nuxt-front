<template>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>DPHE</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">
            You forgot your password? Here you can easily retrieve a new
            password.
          </p>

          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="input-group">
              <Field
                class="form-control"
                name="password"
                type="password"
                placeholder="Enter password"
                autocomplete="off"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <!-- <span class="fas fa-eye"></span> -->
                </div>
              </div>
            </div>
            <ErrorMessage class="text-danger" name="password" />

            <div class="input-group mt-1">
              <Field
                class="form-control"
                name="password_confirmation"
                type="password"
                placeholder="Enter confirm password"
                autocomplete="off"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <!-- <span class="fas fa-eye"></span> -->
                </div>
              </div>
            </div>
            <ErrorMessage class="text-danger" name="password_confirmation" />

            <div class="row mt-2">
              <div class="col-12">
                <button
                  type="submit"
                  :disabled="submit_disabled"
                  class="btn btn-primary btn-block"
                >
                  Reset password
                </button>
              </div>
              <!-- /.col -->
            </div>
          </Form>

          <p class="mt-3 mb-1">
            <NuxtLink to="/login">Login</NuxtLink>
          </p>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </body>
</template>
  
  <script setup>
useHead({
  title: "forgot-password",
});

definePageMeta({
  layout: "auth",
});

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Swal from "sweetalert2";

const api_url = useRuntimeConfig().public["apiBaseUrl"];

const token = useRoute().query?.token;

const email = await $fetch(api_url + "get-password-reset-email", {
  method: "POST",
  body: JSON.stringify({ token }),
});

if (email == "") {
  await Swal.fire({
    title: "Error!",
    text: "Invalid Token!",
    icon: "error",
    confirmButtonText: "Ok",
  });
  navigateTo("/login");
}

const submit_disabled = ref(false);

const schema = yup.object().shape({
  password: yup
    .string()
    .label("Password")
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const onSubmit = async (values, { resetForm }) => {
  submit_disabled.value = true;
  try {
    let url = api_url + "reset-password";
    let method = "POST";

    values.email = email;
    values.token = token;

    const res = await $fetch(url, {
      method,
      body: JSON.stringify(values),
    });

    await Swal.fire({
      title: "Success!",
      text: res.message,
      icon: "success",
      confirmButtonText: "Ok",
    });
    navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
  submit_disabled.value = false;
};
</script>
  
  <style scoped>
</style>