<template>
  <div class="error-page">
    <div class="error-page__container">
      <div class="error__code">404</div>

      <h1 class="error__title">Страница не найдена</h1>

      <p class="error__message">
        Возможно, она была удалена, или вы перешли по неверной ссылке
      </p>

      <div class="error__actions">
        <NuxtLink to="/" class="error__button error__button--primary">
          На главную
        </NuxtLink>

        <button @click="goBack" class="error__button error__button--secondary">
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};

useHead({
  title: "404 - Страница не найдена",
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/error.scss";
</style>
