<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo"></div>
      <nav class="header__nav">
        <ul class="header__menu">
          <li v-for="item in menuItems" :key="item">
            <a href="#" class="header__menu-link">{{ item }}</a>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <button class="header__burger" aria-label="Меню"></button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import mockNavJSON from "@/mocks/nav.json";
const menuItems = mockNavJSON;
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/header.scss";
</style>
