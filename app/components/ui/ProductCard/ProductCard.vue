<template>
  <a href="#" class="product-card">
    <div class="product-card__image-wrapper">
      <img
        :src="product.image"
        :alt="product.name"
        :class="['product-card__image', imageClass]"
        loading="lazy"
        @load="preloadImage(product.image)"
      />
    </div>
    <div class="product-card__price">
      <div class="product-card__total-price">
        {{ formatPrice(product.price) }}
      </div>
      <div class="product-card__installment">
        {{ formatPrice(installmentPrice) }} x 2
      </div>
    </div>

    <div class="product-card__title" :title="product.name">
      {{ product.name }}
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
import { formatPrice } from "~/utils/formatPrice";

const props = defineProps<{
  product: Product;
}>();

const { imageClass, preloadImage } = useImageOrientation(props.product);

const installmentPrice = computed(() => Math.ceil(props.product.price / 2));
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/product-card.scss";
</style>
