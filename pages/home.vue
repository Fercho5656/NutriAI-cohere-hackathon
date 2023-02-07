<template>
  <nuxt-link to="/plans/new" class="btn btn-primary">
    Create a new plan
  </nuxt-link>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<style scoped>

</style>