<template>
  <div class="layout">
    <LayoutAppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "layout__body",
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }

  &__body {
    margin: 0;
  }
}
</style>
