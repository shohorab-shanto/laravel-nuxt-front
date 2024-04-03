<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Roles</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <NuxtLink to="/">Home</NuxtLink>
              </li>
              <li class="breadcrumb-item active">Roles</li>
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
                <h3 class="card-title">Role List</h3>
                <button
                  style="float: right"
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                  @click="openModal"
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
      v-if="showModal"
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
          <!-- modal start -->
          <form @submit.prevent="onSubmit">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form action="">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Enter name"
                        v-model="formData.name"
                      />
                    </div>

                    <div class="form-group">
                      <label for="description">Description</label>
                      <input
                        type="description"
                        class="form-control"
                        id="description"
                        placeholder="Enter description"
                        v-model="formData.description"
                      />
                    </div>
                  </form>
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
          </form>
          <!-- modal end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const formData = reactive({
  name: "",
  description: "",
});

const resetFormData = () => {
  formData.name = "";
  formData.description = "";
};

// if (!checkPermissions(['user_show', 'user_create', 'user_delete', 'user_edit'])) {
//   throw createError({
//     statusCode: 401,
//     statusMessage: "you do not have permission to access this url",
//     fatal: true,
//   });
// }
const table_header = [
  { label: "Sl", field: "sl", sortable: false },
  { label: "Title", field: "name" },
  { label: "Description", field: "description" },
];

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  $("#staticBackdrop").modal("hide");
  resetFormData();
  showModal.value = false;
};

const onSubmit = async () => {
  try {
    const response = await $fetch(config.public.apiBaseUrl + "roles", {
      method: "POST",
      body: formData,
    });
    getData();
    closeModal();
  } catch (error) {
    console.log("🚀 ~ file: index.vue:186 ~ onSubmit ~ error:", error);
  }
};

// get data
let data = ref([]);
const getData = async () => {
  const response = await $fetch(config.public.apiBaseUrl + "roles", {
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
      config.public.apiBaseUrl + "roles/" + entity?.id,
      {
        method: "DELETE",
      }
    );
    console.log("🚀 ~ file: index.vue:215 ~ onDelete ~ response:", response);
    getData();
  } catch (error) {
    console.log("🚀 ~ file: index.vue:217 ~ onDelete ~ error:", error);
  }
};
</script>

<style scoped></style>
