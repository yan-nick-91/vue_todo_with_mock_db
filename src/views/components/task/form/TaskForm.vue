<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import type { Task } from '@/interface/Task'
import type { BulletItem } from '@/interface/BulletItem'
import { DANGER, SUCCESS, PRIORITIES } from '@/const/base-types'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import BaseSelection from '@/views/UI/BaseSelection.vue'
import { addTask, updateTask } from '@/controller/task-controller'
import { invalidInput } from '@/errors/task-error-handler'
import { generateCurrentDate, generateTaskId } from '@/util/value-generator'
import BulletListManager from '@/views/components/task/form/BulletListManager.vue'
import DateInputSection from './DateInputSection.vue'

const props = defineProps({
  modalIsOpen: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<'create' | 'draft' | 'edit'>,
    required: true,
  },
  taskToEdit: {
    type: Object as PropType<Task>,
  },
  draftedTask: {
    type: Object as PropType<Task | null>,
  },
})

const emit = defineEmits(['close', 'handleSubmit'])

const taskInput = ref('')
const startDateInput = ref('')
const endDateInput = ref('')

const bulletList = ref<BulletItem[]>([])
const selectedPriority = ref<(typeof PRIORITIES)[number]>(PRIORITIES[0])
const shouldSaveAsDraft = ref(false)

const taskInputError = ref('')
const startDateInputError = ref('')
const endDateInputError = ref('')

watch(
  [() => props.taskToEdit, () => props.draftedTask],
  ([newTask, newDraftedTask]) => {
    if (props.mode === 'edit' && newTask) {
      taskInput.value = newTask.task
      selectedPriority.value = newTask.priority as (typeof PRIORITIES)[number]
      bulletList.value = JSON.parse(JSON.stringify(newTask.bulletList))
      startDateInput.value = newTask.startDate
      endDateInput.value = newTask.endDate
    } else if (props.mode === 'draft' && newDraftedTask) {
      taskInput.value = newDraftedTask.task
      selectedPriority.value = newDraftedTask.priority as (typeof PRIORITIES)[number]
      bulletList.value = JSON.parse(JSON.stringify(newDraftedTask.bulletList))
      startDateInput.value = newDraftedTask.startDate
      endDateInput.value = newDraftedTask.endDate
    }
  },
  { immediate: true },
)

const validateDates = (): boolean => {
  startDateInputError.value = ''
  endDateInputError.value = ''

  if (!startDateInput.value || new Date(startDateInput.value).getTime() <= Date.now()) {
    startDateInputError.value = 'Start date cannot be in the past or empty'
    return false
  }

  if (!endDateInput.value || new Date(endDateInput.value) < new Date(startDateInput.value)) {
    endDateInputError.value = 'End date must be after start date and not empty'
    return false
  }
  return true
}

const clearErrors = () => {
  taskInputError.value = ''
  startDateInputError.value = ''
  endDateInputError.value = ''
}

const submitHandler = async () => {
  clearErrors()

  const isDraft = shouldSaveAsDraft.value
  let hasError = false

  if (!taskInput.value.trim()) {
    taskInputError.value = invalidInput(
      isDraft
        ? 'Task cannot be saved as draft when the task input field is empty'
        : 'Input field for task should not be empty',
    ).message
    hasError = true
  }

  if (!isDraft) {
    const now = new Date()
    const start = new Date(startDateInput.value)
    const end = new Date(endDateInput.value)

    if (!startDateInput.value || start <= now) {
      startDateInputError.value = 'Start date cannot be in the past or empty'
      hasError = true
    }

    if (!endDateInput.value || end < start) {
      endDateInputError.value = 'End date must be after start date and not empty'
      hasError = true
    }

    if (hasError) {
      shouldSaveAsDraft.value = false
      return
    }
  }

  if (!shouldSaveAsDraft.value) {
    if (!validateDates()) return
  } else {
    startDateInputError.value = ''
    endDateInputError.value = ''
  }

  const payload = generatePayload()

  try {
    if (props.mode === 'edit') {
      await updateTask(payload.id, payload)
    } else {
      await addTask(payload)
    }

    emit('handleSubmit', payload)
    closeModalFormTask()
    window.location.reload()
  } catch (err) {
    console.error('Failed to add task:', err)
  } finally {
    shouldSaveAsDraft.value = false
  }
}

const generatePayload = () => {
  const wasAlreadyCreated = !!props.taskToEdit
  const isDraft = shouldSaveAsDraft.value && !wasAlreadyCreated

  return {
    id: props.taskToEdit?.id ?? generateTaskId(),
    task: taskInput.value.trim(),
    createdAt: props.taskToEdit?.createdAt ?? generateCurrentDate(),
    updatedAt: props.mode === 'edit' ? generateCurrentDate() : '',
    priority: selectedPriority.value,
    startDate: props.mode === 'edit' ? props.taskToEdit?.startDate : startDateInput.value,
    endDate: props.mode === 'edit' ? props.taskToEdit?.endDate : endDateInput.value,
    isFinished: props.taskToEdit?.isFinished ?? false,
    isDrafted: isDraft,
    bulletList: bulletList.value,
  }
}

const saveAsDraft = (event: Event) => {
  event.preventDefault()
  shouldSaveAsDraft.value = true
  submitHandler()
}

const closeModalFormTask = () => {
  taskInput.value = ''
  bulletList.value = []
  taskInputError.value = ''
  emit('close')
}

const addBulletItem = (item: BulletItem) => {
  bulletList.value.push(item)
}

const removeBulletItem = (id: string) => {
  bulletList.value = bulletList.value.filter((item) => item.id !== id)
}
</script>

<template>
  <section
    v-if="modalIsOpen"
    :data-id="props.mode === 'create' ? 'createFormModal' : 'editFormModal'"
    class="border w-[80%] mx-auto p-4"
  >
    <h2>Task Form <strong v-if="props.mode === 'draft'">Drafted</strong></h2>
    <form @submit.prevent="submitHandler">
      <BaseContainer class="w-[100%] mb-2">
        <div>
          <input
            :class="`border p-1 w-[100%]
          ${taskInputError ? 'border-red-500 bg-red-200' : ''}`"
            id="taskInput"
            type="text"
            placeholder="Enter a task..."
            v-model="taskInput"
            @input="taskInputError = ''"
          />
        </div>
        <div class="mb-2 min-h-[1.5rem]">
          <BaseMessageDisplay v-if="taskInputError" :type="DANGER" :message="taskInputError" />
        </div>
      </BaseContainer>
      <hr />
      <BaseContainer class="w-[100%] mb-2">
        <div>
          <BaseSelection v-model="selectedPriority" :items="PRIORITIES" is-bordered />
        </div>
      </BaseContainer>
      <hr />
      <BulletListManager
        :bullet-list="bulletList"
        @add-bullet-item="addBulletItem"
        @remove-bullet-item="removeBulletItem"
      />

      <hr />
      <BaseContainer>
        <DateInputSection
          :date-id="'startData'"
          v-model="startDateInput"
          :date-input-error-message="startDateInputError"
          :label="'Start date'"
        />

        <DateInputSection
          :date-id="'endData'"
          v-model="endDateInput"
          :date-input-error-message="endDateInputError"
          :label="'End date'"
        />
      </BaseContainer>
      <hr />
      <div class="flex gap-2 mt-8">
        <BaseButton
          v-if="props.mode === 'create' || props.mode === 'edit' || props.mode === 'draft'"
          type="submit"
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
        >
          {{ props.mode === 'create' ? 'Add Task' : 'Save' }}
        </BaseButton>
        <BaseButton
          v-if="props.mode === 'create'"
          type="submit"
          :btn-type="'info'"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="saveAsDraft"
        >
          Save as Draft
        </BaseButton>
        <BaseButton
          class="cursor-pointer rounded p-2 transform active:scale-95"
          :btn-type="DANGER"
          @click="closeModalFormTask"
        >
          Cancel
        </BaseButton>
      </div>
    </form>
  </section>
</template>
