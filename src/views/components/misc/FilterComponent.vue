<script setup lang="ts">
import { ref } from 'vue'
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

const toggleFilterContainer = () => {
  showFilterContainer.value = !showFilterContainer.value
}
</script>

<template>
  <BaseContainer>
    <BaseContainer class="flex justify-end" full-width>
      <BaseButton
        :btn-type="SUCCESS"
        :native-type="'button'"
        class="rounded cursor-pointer p-2"
        @click="toggleFilterContainer"
      >
        <FunnelIcon v-if="!showFilterContainer" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </BaseButton>
    </BaseContainer>

    <BaseContainer v-if="showFilterContainer" class="flex justify-end mt-2" full-width>
      <div class="border p-4 bg-amber-50" :style="{ width: `${containerWidth}rem` }">test</div>
    </BaseContainer>
  </BaseContainer>
</template>
