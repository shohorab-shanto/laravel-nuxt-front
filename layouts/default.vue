<script setup>
  const preloader = ref(true);
  onMounted(() => {
    setTimeout(() => {
      preloader.value = false;
    }, 1000);
    $('[data-widget="treeview"]').Treeview('init');
  });
</script>
<template>
    <body class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
          <!-- Preloader -->
          <common-preloader :preloader="preloader"></common-preloader>
          <!-- Navbar -->
          <common-navbar></common-navbar>
          <!-- /.navbar -->
          <!-- Main Sidebar Container -->
          <common-sidebar></common-sidebar>
          <!-- Content Wrapper. Contains page content -->
          <slot/>
          <!-- /.content-wrapper -->
          <common-footer></common-footer>
          <!-- Control Sidebar -->
          <aside class="control-sidebar control-sidebar-dark">
              <!-- Control sidebar content goes here -->
          </aside>
          <!-- /.control-sidebar -->
      </div>
    </body>
</template>

<style scoped>

</style>