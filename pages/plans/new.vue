<template>
  <div class="p-8 flex flex-col gap-y-8 justify-center items-center">
    <h1 class="text-4xl font-bold text-center">Create a new eating plan</h1>
    <p class="text-2xl text-center" v-if="userStats">Verify your data</p>
    <p class="text-2xl text-center" v-else>Seems like you haven't entered your data yet. Please enter your data first.
    </p>
    <form @submit.prevent="onSubmit"
      class="flex flex-col rounded-md w-fit max-w-xl gap-y-8 p-5 transition-colors text-gray-50 dark:bg-green-700 bg-slate-700">
      <ui-input v-model="age" type="number" label="Age (years)" placeholder="24" />
      <ui-input v-model="weight" type="number" label="Weight (kg)" placeholder="50" />
      <ui-input v-model="height" type="number" label="Height (cm)" placeholder="170" />
      <ui-select v-model="gender" label="Gender">
        <option value="-1" disabled selected>Choose an option</option>
        <option value="0">Male</option>
        <option value="1">Female</option>
      </ui-select>
      <ui-select v-model="activityFactor" label="Activity Factor">
        <option value="-1" disabled selected>Choose an option</option>
        <option value="1.2">Sedentary</option>
        <option value="1.375">Lightly active</option>
        <option value="1.55">Moderately active</option>
        <option value="1.725">Very active</option>
        <option value="1.9">Extremely active</option>
      </ui-select>
      <p class="text-2xl text-center" v-if="energyRequirement">Energy Requirement: {{ energyRequirement ?? 0 }} KCal</p>
      <ui-button behaviour="button" type="submit" color="primary">Submit <paper-airplane-icon
          class="w-5 h-5" /></ui-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { IUserStats } from '~~/interfaces/IUserStats';
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';

const userStats = ref<IUserStats>()
const age = ref()
const weight = ref()
const height = ref()
const activityFactor = ref('-1')
const gender = ref('-1')

/**
  For men: BMR = 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age)
  For women: BMR = 655.1 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age)
 */
const energyRequirement = computed(() => {
  let calc = 0
  calc = (655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value)) * parseFloat(activityFactor.value)
  if (gender.value === '0') {
    // male
    calc = (66.5 + (13.75 * weight.value) + (5.003 * height.value) - (6.75 * age.value)) * parseFloat(activityFactor.value)
  }
  return isNaN(calc) ? 0 : parseInt(calc.toFixed(0))
  // Magic numbers ( ͡° ͜ʖ ͡°)
})

const { data, error } = await useFetch('/api/user/data', {
  method: 'GET',
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

userStats.value = data.value?.data
if (userStats.value) {
  age.value = userStats.value.age
  weight.value = userStats.value.weight
  height.value = userStats.value.height
  gender.value = userStats.value.gender
  activityFactor.value = userStats.value.activity_factor
}

const onSubmit = async () => {
  const userStats: IUserStats = {
    age: age.value,
    height: height.value,
    weight: weight.value,
    activity_factor: String(activityFactor.value),
    gender: gender.value,
    imc: (weight.value / ((height.value / 100) ** 2)).toFixed(2),
    energy_requirement: String(energyRequirement.value),
  }
  const { data, error } = await useFetch('/api/user/data', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
    body: userStats
  })
}
</script>