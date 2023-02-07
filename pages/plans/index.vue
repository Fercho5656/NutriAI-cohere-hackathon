<template>
  <div class="flex flex-col gap-y-5 p-9">
    <div class="flex justify-evenly items-center">
      <h1 class="text-4xl font-bold text-center">My Plans</h1>
      <ui-button color="primary">Create New Plan <plus-icon class="w-6 h-6" /></ui-button>
    </div>
    <div class="flex flex-col gap-y-5 p-3 transition-colors text-gray-50 dark:bg-green-700 dark:hover:bg-green-900 bg-slate-700 hover:bg-slate-800
    rounded-md
    ">
      <nuxt-link :to="String(plan.id)" v-for="plan in plans" :key="plan.id" class="flex flex-col gap-y-5">
        <h2 class="text-2xl font-bold">{{ plan.menu?.name }}</h2>
        <p class="text-xl">{{ new Date(plan?.created_at!).toDateString() }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'
import IPlan from '~~/interfaces/IPlan';
import { getAllPlans } from '~~/services/plan';

const plans = ref<IPlan[]>([])
const { data, error } = await useFetch('/api/plan', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

if (data.value?.data?.length! > 0) {
  plans.value = data.value!.data
  console.log(plans.value)
}
/* const { data, error } = await getAllPlans()
if (data.length > 0) {
  plans.value = data
  console.log(data)
} */
</script>

<style scoped>

</style>