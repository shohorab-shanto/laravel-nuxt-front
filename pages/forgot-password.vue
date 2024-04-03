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
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <ErrorMessage class="text-danger" name="email" />
            <div class="row mt-2">
              <div class="col-12">
                <button type="submit" :disabled="submit_disabled" class="btn btn-primary btn-block">
                  Request new password
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

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
});

const api_url = useRuntimeConfig().public["apiBaseUrl"];

const submit_disabled = ref(false);

const onSubmit = async (values, { resetForm }) => {
  submit_disabled.value = true;
  try {
    let url = api_url + "forget-password";
    let method = "POST";

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