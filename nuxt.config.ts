export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@nuxtjs/supabase'],
  runtimeConfig: {
    COHERE_KEY: ''
  }
})
