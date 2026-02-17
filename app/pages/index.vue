<template>
  <div>
    <main>
      <section class="home">
        <div class="home__container">
          <h1 class="home__title">ТЕСТОВОЕ ЗАДАНИЕ</h1>
          <NuxtLink to="/catalog" class="home__button"> В каталог </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Главная | Тестовое задание",
});

definePageMeta({
  layout: "default",
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/home.scss";
</style>
