<template>
  <div>
    <section class="h-[75vh] p-8">
      <div class="flex flex-col gap-y-6">
        <p class="font-bold text-3xl lg:text-5xl max-w-[30ch] lg:max-w-[25ch]">Achieve Your Health Goals with
          AI-Generated
          Personalized Nutrition</p>
        <p class="text-xl lg:text-2xl max-w-[50ch]">Our AI-powered personalized nutrition plan is the solution you need
          to
          achieve your health goals. Using
          cutting-edge NLP and NLG technology, our tool generates a customized plan tailored to your unique needs and
          dietary
          restrictions. Sign up now and take control of your health.</p>
        <nuxt-link class="p-2 px-6 w-fit bg-gray-50 text-green-400 dark:text-slate-800 rounded-full font-semibold"
          to="/signup">Start my plan now!</nuxt-link>
      </div>
    </section>
    <section class="bg-white p-8">
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'NutriAI',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Home page'
    }
  ]
})
</script>

<style scoped>

</style>