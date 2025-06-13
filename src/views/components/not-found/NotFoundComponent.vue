<script setup lang="ts">
import BaseNotification from '@/views/UI/BaseNotification.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { RouterLink } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/16/solid'
</script>

<template>
  <BaseContainer class="mx-auto my-5 p-4">
    <h1 class="text-lg font-medium">404: Page not found</h1>
    <BaseNotification
      :message="'The requested page does not exist'"
      :type="'default'"
      aria-label="Page not found notification"
      class="font-medium"
    />
    <RouterLink to="/" aria-label="Navigate back to home page" class="inline-block mt-6"
      ><div
        class="flex items-center gap-2 py-1 rounded-md text-blue-900 hover:text-blue-500 hover:underline transition transform active:scale-95 text-lg"
      >
        <ArrowLeftIcon class="h-5 w-5 text-current" />
        <span class="font-medium">Navigate back to home</span>
      </div></RouterLink
    >
  </BaseContainer>
</template>
