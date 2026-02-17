<template>
  <a href="#" class="product-card">
    <div class="product-card__image">
      <img :src="product.image" :alt="product.name" />
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

const installmentPrice = computed(() => Math.ceil(props.product.price / 2));
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/product-card.scss";
</style>
