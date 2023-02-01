<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
html.dark {
  color-scheme: dark;
}

body {
  @apply bg-green-400 text-gray-100 dark:bg-slate-800 dark:text-gray-200 text-lg;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
}
</style>