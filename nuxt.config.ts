export default defineNuxtConfig({
  ssr: true,
  modules: ["@pinia/nuxt"],

  devtools: {
    enabled: true,
  },

  css: ["@/assets/styles/main.scss"],

  typescript: {
    strict: true,
    typeCheck: false, // Отключаем на время, включим позже
    shim: false,
  },

  pinia: {
    storesDirs: ["./stores/**", "./app/stores/**"],
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/styles/_variables.scss" as *; @use "@/assets/styles/_mixins.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      title: "Nuxt Tapir Store",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Интернет-магазин Тапир на Nuxt 4" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  future: {
    compatibilityVersion: 4,
  },
});
