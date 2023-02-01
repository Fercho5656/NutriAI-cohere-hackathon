<template>
  <header class="p-5 font-medium text-xl">
    <nav class="flex gap-x-8">
      <nuxt-link to="/">
        <nuxt-img src="/logo.png" width="75" />
      </nuxt-link>
      <ul class="flex justify-around items-center gap-x-5 w-full">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="ml-auto flex items-center gap-x-8">
          <button @click="toggleDark()">
            <sun-icon class="w-8" v-if="isDark" />
            <moon-icon class="w-8" v-else />
          </button>
          <nuxt-link to="/login">Login</nuxt-link>
          <nuxt-link class="p-2 px-6 bg-gray-50 text-green-400 dark:text-slate-800 rounded-full font-semibold"
            to="/signup">Sign Up</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped>

</style>