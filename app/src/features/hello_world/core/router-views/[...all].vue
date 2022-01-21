<route lang="yaml">
meta:
  public: true # cf. auth/navigationGuards.ts
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
