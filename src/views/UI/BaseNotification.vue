<script lang="ts">
import { SUCCESS, WARNING, DANGER, DEFAULT, type notificationType } from '@/const/base-types'
import type { PropType } from 'vue'

const notificationTypesMap: Record<string, string> = {
  [SUCCESS]: 'text-emerald-600',
  [WARNING]: 'text-yellow-400',
  [DANGER]: 'text-red-500',
  [DEFAULT]: 'text-gray-950',
}
</script>

<script setup lang="ts">
defineProps({
  type: {
    default: DEFAULT,
    type: String as PropType<notificationType>,
  },
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <p :class="notificationTypesMap[type]">{{ message }}</p>
  </div>
</template>
