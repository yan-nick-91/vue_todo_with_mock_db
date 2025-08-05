<script setup lang="ts">
import { SUCCESS, INFO, DANGER } from '@/const/base-types'
import { FormMode } from '@/const/enums/ModeStates'
import BaseButton from '@/views/UI/BaseButton.vue'
import type { PropType } from 'vue'

const props = defineProps({
  mode: {
    type: String as PropType<FormMode>,
  },
})

const emit = defineEmits(['save:draft', 'close:modal'])
</script>

<template>
  <section class="flex gap-2 mt-8">
    <section>
      <h4 class="sr-only">
        {{ props.mode === FormMode.CREATE || props.mode === FormMode.DRAFT ? 'Add Task' : 'Save' }}
      </h4>
      <BaseButton
        v-if="
          props.mode === FormMode.CREATE ||
          props.mode === FormMode.EDIT ||
          props.mode === FormMode.DRAFT
        "
        type="submit"
        :btn-type="SUCCESS"
        class="cursor-pointer p-2 rounded transform active:scale-95"
      >
        {{ props.mode === FormMode.CREATE || props.mode === FormMode.DRAFT ? 'Add Task' : 'Save' }}
      </BaseButton>
    </section>
    <section>
      <h4 class="sr-only">Save as draft</h4>
      <BaseButton
        v-if="props.mode === FormMode.CREATE || props.mode === FormMode.DRAFT"
        type="submit"
        :btn-type="INFO"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="emit('save:draft', $event)"
      >
        Save as Draft
      </BaseButton>
    </section>
    <section>
      <h4 class="sr-only">Cancel</h4>
      <BaseButton
        class="cursor-pointer rounded p-2 transform active:scale-95"
        :btn-type="DANGER"
        @click="emit('close:modal')"
      >
        Cancel
      </BaseButton>
    </section>
  </section>
</template>
