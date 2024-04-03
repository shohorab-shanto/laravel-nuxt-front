<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Users</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <NuxtLink to="/">Home</NuxtLink>
              </li>
              <li class="breadcrumb-item active">Users</li>
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
                <h3 class="card-title">User List</h3>
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
              <common-table
                :columns="table_header"
                :entities="entities"
                @getData="getData"
                @onEdit="onEdit"
                @onDelete="onDelete"
                v-if="checkPermissions('user_show')"
              >
                <template v-slot:column_sl="{ index }">
                  <td>{{ index + 1 }}</td>
                </template>
                <template v-slot:column_role="{ entity }">
                  <td>
                    <span
                      v-for="(role, sl) in entity.role"
                      :key="sl"
                      class="badge badge-info"
                      >{{ role }}</span
                    >
                  </td>
                </template>
                <!-- <template v-slot:header_name>
                                <th>Name Test</th>
                              </template> -->

                <!-- <template v-slot:column_role="{ entity }">
                                <td>{{ entity.role }} test</td>
                              </template> -->

                <!-- <template v-slot:column_action="{ entity }">
                                <td>
                                  <a href="javascript:" @click="onDelete(entity)"><i class="fas fa-trash"></i></a>
                                </td>
                              </template> -->
              </common-table>
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
            <h5 class="modal-title" id="staticBackdropLabel">Create User</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              :initial-values="formValues"
            >
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <Field
                      class="form-control"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter name"
                    />
                    <ErrorMessage class="text-danger" name="name" />
                  </div>

                  <div class="form-group">
                    <label for="nid">NID</label>
                    <Field
                      class="form-control"
                      id="nid"
                      name="nid"
                      type="text"
                      placeholder="Enter nid"
                    />
                    <ErrorMessage class="text-danger" name="nid" />
                  </div>

                  <div class="form-group">
                    <label for="division">Select Division</label>
                    <multiselect
                      placeholder="Select Division"
                      :options="divisions"
                      v-model="selectedDivision"
                      :taggable="false"
                      label="name"
                      track-by="id"
                      id="division"
                      :show-labels="false"
                      :allow-empty="false"
                    >
                    </multiselect>
                  </div>

                  <div class="form-group">
                    <label for="password">Password</label>
                    <Field
                      class="form-control"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      autocomplete="off"
                    />
                    <ErrorMessage class="text-danger" name="password" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <Field
                      class="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    />
                    <ErrorMessage class="text-danger" name="email" />
                  </div>

                  <div class="form-group">
                    <label for="designation">Select Designation</label>
                    <multiselect
                      placeholder="Select Designation"
                      :options="designations"
                      v-model="selectedDesignation"
                      :taggable="false"
                      label="name"
                      track-by="id"
                      id="designation"
                      :show-labels="false"
                      :allow-empty="false"
                    >
                    </multiselect>
                  </div>

                  <div class="form-group">
                    <label for="district">Select District</label>
                    <multiselect
                      placeholder="Select District"
                      :options="districts"
                      v-model="selectedDistrict"
                      :taggable="false"
                      label="name"
                      track-by="id"
                      id="district"
                      :show-labels="false"
                      :allow-empty="false"
                      :loading="district_loading"
                    >
                    </multiselect>
                  </div>

                  <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <Field
                      class="form-control"
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password_confirmation"
                      placeholder="Enter confirm password"
                      autocomplete="off"
                    />
                    <ErrorMessage
                      class="text-danger"
                      name="password_confirmation"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" :disabled="submit_disabled" class="btn btn-primary">Save</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
if (
  !checkPermissions(["user_show", "user_create", "user_delete", "user_edit"])
) {
  throw createError({
    statusCode: 401,
    statusMessage: "you do not have permission to access this url",
    fatal: true,
  });
}

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import Multiselect from "vue-multiselect";
import Swal from 'sweetalert2'

const schema = yup.object().shape({
  name: yup.string().min(3).required().label("Name"),
  email: yup.string().email().required().label("Email"),
  nid: yup.string().required().label("NID"),
  password: yup
    .string()
    .label("Password")
    .when([], {
      is: () => formValues.value.id === 0,
      then: yup
        .string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
      otherwise: yup.string().when("password", (value) => {
        if (value) {
          return yup
            .string()
            .min(6, "Password is too short - should be 6 chars minimum.");
        } else {
          return yup.string().nullable(true);
        }
      }),
    }),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const api_url = useRuntimeConfig().public["apiBaseUrl"];

let formValues = ref({
  id: 0,
  name: "",
  email: "",
  nid: "",
  designation_id: null,
  division_id: null,
  district_id: null,
  password: "",
  password_confirmation: "",
});

let entities = ref({});
let divisions = ref([]);
let districts = ref([]);
let designations = ref([]);
let selectedDivision = ref(null);
let selectedDistrict = ref(null);
let selectedDesignation = ref(null);
let district_loading = ref(false);

const table_header = [
  { label: "Sl", field: "sl", sortable: false, filterable: false },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Role", field: "role" },
];

const submit_disabled = ref(false);

const onSubmit = async (values, { resetForm }) => {
  if (selectedDesignation.value == null) {
    useToast().warning("Designation Required!");
    return;
  }
  if (selectedDivision.value == null) {
    useToast().warning("Division Required!");
    return;
  }
  if (selectedDistrict.value == null) {
    useToast().warning("District Required!");
    return;
  }

  values.designation_id = selectedDesignation.value.id;
  values.division_id = selectedDivision.value.id;
  values.district_id = selectedDistrict.value.id;

  submit_disabled.value = true;

  try {
    let url = api_url + "users";
    let method = "POST";

    if (formValues.value.id != 0) {
      url = url + "/" + formValues.value.id;
      method = "PUT";
    }
    const res = await $fetch(url, {
      method,
      body: JSON.stringify(values),
    });
    if (res.status === 200) {
      useToast().success(res.message);
      clearForm();
      resetForm();
      getData();
    } else {
      useToast().error(res);
    }
  } catch (error) {
    console.log(error);
  }

  submit_disabled.value = false;
};

const clearForm = () => {
  formValues.value = {
    id: 0,
    name: "",
    email: "",
    nid: "",
    designation_id: null,
    division_id: null,
    district_id: null,
    password: "",
    password_confirmation: "",
  };

  selectedDesignation.value = null;
  selectedDivision.value = null;
  selectedDistrict.value = null;
};

const getData = async (params = { url: null, filter: {} }) => {
  try {
    let url = api_url + "users";
    if (params.hasOwnProperty("url") && params.url != null) {
      url = params.url;
    }

    let filter = {};
    if (params.hasOwnProperty("filter")) {
      filter = params.filter;
    }

    const response = await $fetch(url, {
      params: filter,
    });
    entities.value = response;
  } catch (error) {
    console.log(error);
  }
};

await getData();

const get_all_division = async () => {
  try {
    const url = api_url + "get-all-division";
    const res = await $fetch(url);
    divisions.value = res.data.division;
  } catch (e) {
    console.log(e);
  }
};

await get_all_division();

const getDesignations = async () => {
  try {
    const url = api_url + "designations";
    const res = await $fetch(url);
    designations.value = res?.data;
  } catch (e) {
    console.log(e);
  }
};

await getDesignations();

watch(selectedDivision, (new_value, old_value) => {
  districts.value = [];

  if (new_value != null) {
    get_districts();
  }
});

const get_districts = async () => {
  district_loading.value = true;
  try {
    const url = api_url + "get-district/" + selectedDivision.value.id;
    const res = await $fetch(url);
    districts.value = res.data.district;
  } catch (e) {
    console.log(e);
  }

  district_loading.value = false;
};

const onEdit = (entity) => {
  formValues.value = {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    nid: entity.nid,
    designation_id: entity.designation_id,
    division_id: entity.division_id,
    district_id: entity.district_id,
    password: "",
    password_confirmation: "",
  };

  selectedDesignation.value = entity.designation;
  selectedDivision.value = entity.division;
  selectedDistrict.value = entity.district;

  $("#staticBackdrop").modal("show");
};

const onDelete = async (entity) => {
  try {
    const confirm = await Swal.fire({
      title: 'Warning!',
      text: 'Do you want to delete?',
      icon: 'warning',
      confirmButtonText: 'Ok',
      showCancelButton: true,
    })
    if(!confirm.isConfirmed){
      return;
    }
    const res = await $fetch(api_url + "users/" + entity.id, {
      method: "DELETE",
    });
    if (res.status === 200) {
      useToast().success(res.message);
      getData();
    } else {
      useToast().error(res);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>