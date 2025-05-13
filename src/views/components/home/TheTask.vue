<script setup lang="ts">
import { DANGER, INFO, SUCCESS } from '@/const/base-types'
import type { Task } from '@/interface/task'
import BaseButton from '@/UI/BaseButton.vue'
import { ref } from 'vue'
import type { PropType } from 'vue'

const updateModalIsOpen = ref(false)

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})

const emit = defineEmits(['remove', 'update'])

const removeTask = () => {
  emit('remove', props.task.id)
}

const updateTask = () => {
  updateModalIsOpen.value = true
  // Logic to update the task
  emit('update', props.task)
}
</script>

<template>
  <li>
    <div class="flex gap-2 mb-2">
      <div class="flex justify-between w-[80%] p-2 border">
        <span class="">
          {{ props.task.task }}
        </span>
        <span><strong>Created at:</strong> {{ props.task.createdAt }}</span>
      </div>
      <BaseButton
        :btn-type="INFO"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="updateTask"
      >
        Update
      </BaseButton>
      <BaseButton
        :btn-type="DANGER"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="removeTask"
      >
        Delete
      </BaseButton>
      <BaseButton :btn-type="SUCCESS" class="cursor-pointer p-2 rounded transform active:scale-95">
        Finish
      </BaseButton>
    </div>
  </li>
</template>
