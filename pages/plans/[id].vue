<template>
  <div class=" flex flex-col p-8 gap-y-5">
    <h1 class="text-4xl font-bold text-center">{{ plan?.menu.name }} - {{ plan?.menu.kilocalories }} kilocalories</h1>
    <h2 class="text-2xl font-semibold">Breakfast</h2>
    <ul>
      <li v-for="item in plan?.menu.breakfast">
        {{ item }}
      </li>
    </ul>
    <h2 class="text-2xl font-semibold">Lunch</h2>
    <ul>
      <li v-for="item in plan?.menu.lunch">
        {{ item }}
      </li>
    </ul>
    <h2 class="text-2xl font-semibold">Snacks</h2>
    <ul>
      <li v-for="item in plan?.menu.snack">
        {{ item }}
      </li>
    </ul>
    <h2 class="text-2xl font-semibold">Dinner</h2>
    <ul>
      <li v-for="item in plan?.menu.dinner">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IPlan from '~~/interfaces/IPlan';

const plan = ref<IPlan>()
const userStats = ref()
const route = useRoute()
const { data, error } = await useFetch(`/api/plan/${route.params.id}`, {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})
plan.value = data.value?.data

const { data: userData, error: userError } = await useFetch('/api/user/data', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})
userStats.value = userData.value?.data

console.log(plan.value)
console.log(userStats.value)

</script>

<style scoped>

</style>