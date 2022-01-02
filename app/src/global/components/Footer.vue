<script setup lang="ts">
  import { isDark, toggleDark } from '@GLOBAL/functions/reactified'

  const { t, availableLocales, locale } = useI18n()

  const toggleLocales = () => {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  }
</script>

<template>
  <footer class="bg-gray-700 dark:bg-gray-200 py-4 text-gray-100 dark:text-gray-700">
    <nav class="text-xl">
      <router-link class="icon-btn mx-2" to="/" :title="t('HelloWorld_Home')">
        <carbon-campsite />
      </router-link>

      <button class="icon-btn mx-2 !outline-none" :title="t('HelloWorld_Toggle dark mode')" @click="toggleDark()">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </button>

      <a class="icon-btn mx-2" :title="t('HelloWorld_Change languages')" @click="toggleLocales">
        <carbon-language />
      </a>

      <router-link class="icon-btn mx-2" to="/about" :title="t('HelloWorld_About')">
        <carbon-dicom-overlay />
      </router-link>

      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
        <carbon-logo-github />
      </a>
    </nav>
    <div class="mt-5 mx-auto text-center opacity-50 text-sm"> [Footer] </div>
  </footer>
</template>
