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
      <ui-button :disabled="sendingForm" behaviour="button" type="submit" color="primary">{{ sendingFormText }}
        <paper-airplane-icon class="w-5 h-5" v-if="!sendingForm" />
        <ui-spinner v-else />
      </ui-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { IUserStats } from '~~/interfaces/IUserStats';
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';

definePageMeta({
  middleware: ['auth'],
})

const userStats = ref<IUserStats>()
const router = useRouter()
const age = ref()
const weight = ref()
const data2 = ref()
const height = ref()
const activityFactor = ref('-1')
const gender = ref('-1')
const sendingForm = ref(false)
const sendingFormText = computed(() => sendingForm.value ? 'Creating eating plan...' : 'Submit')

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
  sendingForm.value = true
  const userStats: IUserStats = {
    age: age.value,
    height: height.value,
    weight: weight.value,
    activity_factor: String(activityFactor.value),
    gender: gender.value,
    imc: (weight.value / ((height.value / 100) ** 2)).toFixed(2),
    energy_requirement: String(energyRequirement.value),
  }
  // I know I should use Promises.all and do error handling but I barely finished this project <3 
  const { data, error } = await useFetch('/api/user/data', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
    body: userStats
  })
  console.log(data.value)

  /* const { data: data2, error: error2 } = await useFetch('/api/cohere', {
    method: 'POST',
    body: { energyRequirement: energyRequirement.value }
  })

  console.log(data2.value) */


  const COHERE_API_KEY = '4vQrZ6kHFoNh3Ufv2qxMrFSAhgGFuKL7NmsgOpd2'
  const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'
  const dataa = {
    model: 'xlarge',
    prompt: `Write an eating plan of 1780 kilocalories in JSON format:\n{\n\"name\": \"Nourish and Fuel\",\n\"kilocalories\": 1780,\n\"breakfast\": [\"1 cup of oatmeal with 1/2 cup of berries and 1 tsp of honey\", \"1 cup of Greek yogurt with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"lunch\": [\"2 cups of mixed greens with 1 cup of grilled chicken, 1/4 cup of crumbled feta cheese, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\"],\n\"snack\": [\"1 cup of unsweetened almond milk with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"dinner\": [\"1 cup of brown rice with 1 cup of grilled chicken, 1/4 cup of steamed broccoli, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\", \"1 apple\"]\n}\n--\nWrite an eating plan of ${energyRequirement.value - 500} kilocalories in JSON format:`,
    max_tokens: 350,
    temperature: 2,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  }

  const response = await fetch('https://api.cohere.ai/generate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER 4vQrZ6kHFoNh3Ufv2qxMrFSAhgGFuKL7NmsgOpd2`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06',
    },
    body: JSON.stringify(dataa),
  })
    .then((res) => res.json())


  data2.value = JSON.parse(response.generations[0].text.split('--')[0])


  const { data: data3, error: error3 } = await useFetch('/api/plan', {
    method: 'POST',
    body: { menu: data2.value, user_id: data.value?.data?.user_id, stat_id: data.value?.data?.id }
  })

  console.log(data3.value)
  console.log(error3.value)

  router.push(`/plans/${data3.value?.data?.id}`)

}
</script>