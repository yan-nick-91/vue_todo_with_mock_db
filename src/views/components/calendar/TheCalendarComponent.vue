<script setup lang="ts">
import { SUCCESS } from '@/const/base-types'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/16/solid'

defineProps({
  createdDate: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section>
    <BaseContainer class="mt-2 flex justify-between mx-auto" is-bordered>
      <BaseButton class="cursor-pointer p-1 transform active:scale-95" :btn-type="SUCCESS">
        <ChevronLeftIcon class="h-6 w-6 text-amber-50" />
      </BaseButton>
      <div class="flex-1 text-center my-auto">
        <BaseContainer class="inline-block">Date</BaseContainer>
      </div>
      <BaseButton class="cursor-pointer p-1 transform active:scale-95" :btn-type="SUCCESS">
        <ChevronRightIcon class="h-6 w-6 text-amber-50" />
      </BaseButton>
    </BaseContainer>
  </section>
</template>
