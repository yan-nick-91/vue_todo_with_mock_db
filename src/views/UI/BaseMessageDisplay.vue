<script lang="ts">
import { SUCCESS, WARNING, DANGER, DEFAULT, type notificationType } from '@/const/base-types'
import type { PropType } from 'vue'

const displayTypesMap: Record<string, string> = {
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
  role: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div>
    <p :class="displayTypesMap[type]" :role="role">{{ message }}</p>
  </div>
</template>
