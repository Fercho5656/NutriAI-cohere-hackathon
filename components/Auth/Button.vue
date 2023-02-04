<template>
  <button class="flex items-center gap-x-3 p-4 rounded-lg 
    bg-slate-800 hover:bg-slate-600 text-white font-bold font-sans text-lg 
    dark:bg-green-600 dark:hover:bg-green-700" @click="emits('login', props.provider)">Sign up with
    <icon class="text-white" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  provider: 'github' | 'google'
}

const props = defineProps<Props>()
const emits = defineEmits(['login'])
const icon = defineAsyncComponent(() => import(`~/components/Icons/${props.provider}.vue`))
</script> 

<style scoped>

</style>