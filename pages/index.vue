<template>
  <div>
    <section class="h-screen p-8 flex lg:justify-around items-center">
      <div class="flex flex-col gap-y-10 self-start">
        <p class="font-bold text-3xl lg:text-5xl max-w-[30ch] lg:max-w-[25ch]">Achieve Your Health Goals with
          AI-Generated
          Personalized Nutrition</p>
        <p class="text-xl lg:text-2xl max-w-[50ch]">Our AI-powered personalized nutrition plan is the solution you need
          to
          achieve your health goals. Using
          cutting-edge NLP and NLG technology, our tool generates a customized plan tailored to your unique needs and
          dietary
          restrictions. <nuxt-link class="hover:underline" to="/signup">Sign up now</nuxt-link> and take control of your
          health.</p>
        <nuxt-link
          class="p-2 px-6 w-fit text-2xl bg-gray-50 text-green-400 dark:text-slate-800 rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors"
          to="/signup">Start my plan now!</nuxt-link>
      </div>
      <nuxt-img fit="contain" sizes="lg:500px" format="webp" src="/landing-image.png"
        class="hidden lg:block self-end" />
    </section>
    <section class="bg-white dark:bg-green-800 text-gray-700 dark:text-gray-200 py-8 h-screen">
      <div class="flex p-5 justify-around flex-wrap gap-y-8">
        <div class="flex flex-col gap-y-5">
          <p class="text-5xl font-bold">How it works</p>
          <p class="text-2xl max-w-prose">Our AI-powered personalized nutrition plan is the solution you need to achieve
            your health
            goals. Using cutting-edge NLP and NLG technology, our tool generates a customized plan tailored to your
            unique
            needs and dietary restrictions. <nuxt-link class="hover:underline" to="/signup">Sign up now</nuxt-link> and
            take control of your health.</p>
        </div>
        <div class="flex flex-col gap-y-5">
          <p class="text-5xl font-bold max-w-[20ch]">AI-Powered Nutrition</p>
          <p class="text-2xl max-w-prose">Are you tired of generic meal plans that don't work for you? Do you want to
            take control of your health and wellness, but don't know where to start? Our AI-powered nutrition app is
            here to help! Our app offers a personalized approach to nutrition, analyzing your body data and creating a
            plan tailored just for you. Say goodbye to one-size-fits-all meal plans and hello to a customized experience
            that fits your unique needs. With our app, you'll be able to reach your health and wellness goals in no
            time! So what are you waiting for? <nuxt-link class="hover:underline" to="/signup">Sign up now</nuxt-link>
            and start your journey to a healthier you!</p>
        </div>
      </div>
      <nuxt-img fit="contain" sizes="lg:350px" format="webp" src="/image.png"
        class="hidden lg:block self-end mx-auto" />
    </section>
    <section class="h-screen p-8 flex flex-col gap-y-5">
      <h2 class="text-5xl text-center font-bold max-w-[20ch] mx-auto lg:max-w-[25ch] self-start">How to get started</h2>
      <div class="flex flex-wrap justify-center">
        <ul class="flex flex-col flex-wrap justify-center 2xl:flex-row gap-8 text-2xl">
          <li class=" max-w-[50ch]">
            <p>
              Step 1: Registration
            </p>
            <p>
              Get started on your personal nutrition journey with just a few clicks. Sign up now and gain access to all
              the features and benefits of our app. No prior experience needed, simply enter your basic information to
              get started.
            </p>
          </li>
          <li class=" max-w-[50ch]">
            <p>
              Step 2: Enter Body Data
            </p>
            <p>
              To create a customized nutrition plan just for you, we need to know a little more about your body. Don't
              worry, it's easy! Just enter your height, weight, age, and other relevant information to help us create a
              plan that works best for you.
            </p>
          </li>
          <li class=" max-w-[50ch]">
            <p>
              Step 3: Get Plan
            </p>
            <p>
              And that's it! Our AI-powered system will analyze your body data and create a personalized nutrition plan
              just for you. Say goodbye to generic meal plans and hello to a tailored experience. Get ready to feel the
              difference and reach your health and wellness goals.
            </p>
          </li>
        </ul>
      </div>
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