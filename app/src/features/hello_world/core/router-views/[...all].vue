<route lang="yaml">
meta:
  layout: 404Layout
</route>

<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('Not found') }}
  </div>
</template>
