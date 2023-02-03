export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge'],
  image: {
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
        }
      }
    }
  }
})
