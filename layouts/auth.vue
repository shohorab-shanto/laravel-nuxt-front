<script setup lang="js">
  const preloader = ref(true);
  onMounted(() => {
    setTimeout(() => {
      preloader.value = false;
    }, 1000);
  });
</script>

<template>
  <common-preloader :preloader="preloader"></common-preloader>

  <slot />

</template>

<style scoped></style>
