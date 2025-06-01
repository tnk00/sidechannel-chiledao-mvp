// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'netlify', // O 'netlify-edge' si quieres usar Edge Functions
  },

  app: {
    head: {
      title: 'sidechannel',
      titleTemplate: 'sidechannel - %s',
      htmlAttrs: { lang: 'en', 'data-theme': 'dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'language', content: 'en' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: "description", content: 'AI supports task evaluation and helps you reward tasks fairly and consistently.' },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", sizes: "any", href: "/favicon.ico" }
      ],
    },
  },

  css: ["~/assets/scss/styles.scss"],

  // Make our sass variables available globally
  // https://nuxt.com/docs/getting-started/assets#global-styles-imports
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
        `
        }
      }
    }
  },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    // Estas variables SOLO estarán disponibles en el servidor
    geminiApiKey: process.env.GEMINI_API_KEY,
    // Las variables bajo 'public' estarán disponibles en el cliente,
    // pero NO DEBES poner tu clave API aquí.
    // public: {
    //   // Puedes poner aquí cosas que sean seguras de exponer en el cliente,
    //   // como la URL base de tu propia API de Nuxt.
    //   apiBase: '/api'
    // }
  }

})