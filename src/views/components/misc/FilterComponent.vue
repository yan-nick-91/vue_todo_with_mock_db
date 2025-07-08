<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { SUCCESS } from '@/const/base-types'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { FunnelIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/16/solid'

defineProps({
  containerWidth: {
    type: Number,
    default: 14,
  },
})

const showFilterContainer = ref(false)
const filterContainerRef = ref<HTMLElement | null>(null)

const toggleFilterContainer = () => {
  showFilterContainer.value = !showFilterContainer.value
}

const onClickOutside = (event: MouseEvent) => {
  const element = filterContainerRef.value
  if (element && element instanceof HTMLElement && !element.contains(event.target as Node)) {
    showFilterContainer.value = false
  }
}

const onEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showFilterContainer.value) {
    showFilterContainer.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onEscapeKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.addEventListener('keyup', onEscapeKey)
})
</script>

<template>
  <BaseContainer full-width>
    <BaseContainer class="flex justify-end" full-width>
      <BaseButton
        :btn-type="SUCCESS"
        :native-type="'button'"
        class="rounded cursor-pointer p-2"
        @click.stop="toggleFilterContainer"
        :aria-expanded="showFilterContainer.toString()"
        aria-controls="filter-panel"
        aria-label="Toggle filter panel"
      >
        <FunnelIcon v-if="!showFilterContainer" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </BaseButton>
    </BaseContainer>

    <BaseContainer v-if="showFilterContainer" class="relative flex justify-end" full-width>
      <div
        id="filter-panel"
        role="dialog"
        aria-modal="true"
        class="absolute border p-4 bg-white"
        :style="{ width: `${containerWidth}rem` }"
        ref="filterContainerRef"
      >
        <slot />
      </div>
    </BaseContainer>
  </BaseContainer>
</template>
