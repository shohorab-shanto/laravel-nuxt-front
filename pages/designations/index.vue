<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Designations</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <NuxtLink to="/">Home</NuxtLink>
              </li>
              <li class="breadcrumb-item active">Designations</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Designation List</h3>
                <button
                  style="float: right"
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  <i class="fa fa-plus"></i> Add New
                </button>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <common-table
                  :columns="table_header"
                  :entities="data"
                  @onEdit="onEdit"
                  @onDelete="onDelete"
                  v-if="checkPermissions('user_show')"
                >
                  <template v-slot:column_sl="{ index }">
                    <td>{{ index + 1 }}</td>
                  </template>
                </common-table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                  <li class="page-item">
                    <a class="page-link" href="#">&laquo;</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Create Designation
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- modal start -->
          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter Title"
                      name="name"
                    />
                    <ErrorMessage name="name" />
                  </div>

                  <div class="form-group">
                    <label for="email">Description</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="Enter Description"
                      name="description"
                    />
                    <ErrorMessage name="description" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </Form>

          <!-- modal end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const config = useRuntimeConfig();

const table_header = [
  { label: "Sl", field: "sl", sortable: false },
  { label: "Title", field: "name" },
  { label: "Description", field: "description" },
];

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
});

function onSubmit(values) {
  // Submit values to API...
  // alert(JSON.stringify(values, null, 2));
  try {
    const response = $fetch(config.public.apiBaseUrl + "designations", {
      method: "POST",
      body: values,
    });
    getData();
    closeModal();
    console.log("🚀 ~ file: index.vue:176 ~ onSubmit ~ response:", response);
  } catch (error) {
    console.log("🚀 ~ file: index.vue:175 ~ onSubmit ~ error:", error);
  }
}

const closeModal = (event) => {
  $("#staticBackdrop").modal("hide");
};

// get data
let data = ref([]);
const getData = async () => {
  const response = await $fetch(config.public.apiBaseUrl + "designations", {
    method: "GET",
  });

  data.value = response?.data;
};
watchEffect(() => getData());

function onEdit(entity) {
  alert("edit click");
  console.log("edit event: ", entity);
}

const onDelete = async (entity) => {
  try {
    const response = await $fetch(
      config.public.apiBaseUrl + "designations/" + entity?.id,
      {
        method: "DELETE",
      }
    );
    getData();
    console.log("🚀 ~ file: index.vue:176 ~ onSubmit ~ response:", response);
  } catch (error) {
    console.log("🚀 ~ file: index.vue:175 ~ onSubmit ~ error:", error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
