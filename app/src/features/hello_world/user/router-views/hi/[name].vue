<script setup lang="ts">
  import { useUserStore } from '@FEATURES/hello_world/user/stores/user'

  const props = defineProps<{ name: string }>()
  const router = useRouter()
  const user = useUserStore()
  const { t } = useI18n()

  watchEffect(() => {
    user.setNewName(props.name)
  })
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>
      {{ t('Hi, {name} !', { name: props.name }) }}
    </p>

    <p class="text-sm opacity-50">
      <em>{{ t('Dynamic route demo') }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <div class="text-sm mt-4">
        <span class="opacity-75">{{ t('Also known as') }}:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>

    <div>
      <button class="btn m-3 text-sm mt-6" @click="router.back()">
        {{ t('Back') }}
      </button>
    </div>
  </div>
</template>
