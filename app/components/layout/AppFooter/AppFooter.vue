<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__grid">
        <div
          v-for="section in footerSections"
          :key="section.title"
          class="footer__col"
        >
          <h4 class="footer__col-title">{{ section.title }}</h4>
          <ul class="footer__list">
            <li v-for="link in section.links" :key="link">
              <a href="#" class="footer__link">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import mockFooterJSON from "@/mocks/footer.json";
const footerSections = mockFooterJSON;
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/footer.scss";
</style>
