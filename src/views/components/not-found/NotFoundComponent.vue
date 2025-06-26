<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { ArrowLeftIcon } from '@heroicons/vue/16/solid'
</script>

<template>
  <BaseContainer class="mx-auto my-5 p-4" role="region" aria-labelledby="not-found-title">
    <h1 class="text-lg font-medium" id="not-found-title">Page not found (404 error)</h1>
    <BaseMessageDisplay
      :message="'The title you are looking for does not exist.'"
      :type="'default'"
      aria-describedby="not-found-title"
      class="font-medium"
    />
    <RouterLink to="/" aria-label="Return to home title" class="inline-block mt-6"
      ><div
        class="flex items-center gap-2 py-1 rounded-md text-blue-900 hover:text-blue-500 hover:underline transition transform active:scale-95 text-lg"
      >
        <ArrowLeftIcon class="h-5 w-5 text-current" aria-hidden="true" />
        <span class="font-medium">Navigate back to home</span>
      </div></RouterLink
    >
  </BaseContainer>
</template>
