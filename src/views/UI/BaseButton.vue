<script lang="ts">
import { SUCCESS, INFO, DANGER, TRANSPARENT, DEFAULT, type buttonType } from '@/const/base-types'
import type { PropType } from 'vue'

const buttonTypesMap: Record<string, string> = {
  [SUCCESS]: 'bg-emerald-700 text-amber-50 hover:bg-emerald-800',
  [INFO]: 'bg-teal-600 text-amber-50 hover:bg-teal-500',
  [DANGER]: 'bg-red-500 text-amber-50 hover:bg-red-600',
  [DEFAULT]: 'bg-gray-300 text-black hover:bg-gray-400',
  [TRANSPARENT]: 'bg-transparent text-black',
}
</script>

<script setup lang="ts">
defineProps({
  btnType: {
    default: DEFAULT,
    type: String as PropType<buttonType>,
  },
})
</script>

<template>
  <button :class="buttonTypesMap[btnType]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>
