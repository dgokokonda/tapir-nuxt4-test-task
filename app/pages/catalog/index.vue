<template>
  <div>
    <main class="catalog-page">
      <div class="catalog-page__container">
        <h1 class="catalog-page__title">КАТАЛОГ</h1>

        <div v-if="products?.length" class="catalog-page__grid">
          <UiProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-if="loading" class="catalog-page__loader">Загрузка...</div>
        <div v-else-if="error" class="catalog-page__error">
          <p>{{ error }}</p>
          <button @click="retry" class="catalog-page__retry">Повторить</button>
        </div>
        <button
          v-else-if="hasMore"
          @click="loadMore"
          class="catalog-page__button"
        >
          Показать еще
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore();
const { products, loading, error, hasMore } = storeToRefs(productStore);
const { loadMore, retry } = productStore;

if (import.meta.server) {
  await productStore.fetchFirstPageSSR();
} else {
  // На клиенте используем callOnce для предотвращения повторных запросов
  await callOnce("fetch-products", productStore.fetchFirstPageSSR);
}

useHead({
  title: "Каталог | Тестовое задание",
});

definePageMeta({
  layout: "default",
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/catalog.scss";
</style>
