<template>
  <div class="grid grid-cols-1 place-items-center gap-y-10">
    <div class="grid grid-cols-1 p-5 gap-y-8 place-items-center bg-gray-700 rounded-lg">
      <h1 class="text-5xl font-bold">Sign up</h1>
      <p class="max-w-[40ch] text-center  font-extrabold sm:text-2xl md:text-3xl lg:text-4xl sm:tracking-tight ">
        Join the revolution in personalized nutrition today! Our AI-powered app creates a customized plan just for you,
        tailored to your unique body data and health goals. Sign up now and take the first step towards a healthier you
      </p>
      <form class="flex flex-col gap-y-3">
        <auth-button @login="login" provider="google" />
        <auth-button @login="login" provider="github" />
      </form>
      <p class="text-red-500 text-xl">
        Already have an account? <nuxt-link to="/login">Log in</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['guest'],
})

const client = useSupabaseAuthClient()
const user = useSupabaseUser()
const router = useRouter()

const login = async (provider: 'github' | 'google') => {
  const { error } = await client.auth.signInWithOAuth({ provider })
  if (error) return alert(error.message)
  router.push('/home')
}
</script>

<style scoped>

</style>