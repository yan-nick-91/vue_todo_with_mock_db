<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
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
import { FormMode } from '@/const/enums/ModeStates'

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
    type: Object as PropType<Task>,
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

const prefillForm = (task?: Task) => {
  if (!task) return
  taskInput.value = task.task
  selectedPriority.value = task.priority as (typeof PRIORITIES)[number]
  bulletList.value = JSON.parse(JSON.stringify(task.bulletList))
  startDateInput.value = task.startDate
  endDateInput.value = task.endDate
}

watch(
  [() => props.taskToEdit, () => props.draftedTask],
  ([newTask, newDraftedTask]) => {
    if (props.mode === 'edit') prefillForm(newTask)
    else if (props.mode === 'draft') prefillForm(newDraftedTask)
  },
  { immediate: true },
)

const clearErrors = () => {
  taskInputError.value = ''
  startDateInputError.value = ''
  endDateInputError.value = ''
}

const isDateValid = (): boolean => {
  startDateInputError.value = ''
  endDateInputError.value = ''
  let hasNoError = true

  if (!startDateInput.value || new Date(startDateInput.value).getTime() <= Date.now()) {
    startDateInputError.value =
      'Start date cannot be in the past or empty before adding a new task. Either save it as draft of complete this field.'
    hasNoError = false
  }

  if (
    !endDateInput.value ||
    new Date(endDateInput.value).getTime() < new Date(startDateInput.value).getTime()
  ) {
    endDateInputError.value =
      'End date must be after start date and not empty. Either save as draft or complete this field.'
    hasNoError = false
  }
  return hasNoError
}

const isFormComplete = () => {
  return (
    taskInput.value.trim() !== '' &&
    startDateInput.value !== '' &&
    endDateInput.value !== '' &&
    isDateValid()
  )
}

const modeStatus = computed<FormMode>(() => {
  if (props.mode === 'edit') return FormMode.EDIT
  if (shouldSaveAsDraft.value) return FormMode.DRAFT
  return FormMode.CREATE
})

const generatePayload = () => {
  const isDraft =
    props.mode === 'draft' && !shouldSaveAsDraft.value && isFormComplete()
      ? false
      : modeStatus.value === FormMode.DRAFT

  const id = props.taskToEdit?.id || props.draftedTask?.id || generateTaskId()

  return {
    id,
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

const submitHandler = async () => {
  clearErrors()

  const isDraft = modeStatus.value === FormMode.DRAFT
  let hasError = false

  if (!taskInput.value.trim()) {
    taskInputError.value = invalidInput(
      isDraft
        ? 'Task cannot be saved as draft when the task input field is empty.'
        : 'Input field for task should not be empty.',
    ).message
    hasError = true
  }

  if (!isDraft && !isDateValid()) hasError = true

  if (hasError) {
    shouldSaveAsDraft.value = false
    return
  }

  const payload = generatePayload()

  try {
    if (props.mode === 'edit' || props.mode === 'draft') {
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

const saveAsDraft = (event: Event) => {
  event.preventDefault()
  shouldSaveAsDraft.value = true
  submitHandler()
}

const closeModalFormTask = () => {
  taskInput.value = ''
  bulletList.value = []
  taskInputError.value = ''
  shouldSaveAsDraft.value = false
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
      <section class="flex gap-2 mt-8">
        <BaseButton
          v-if="props.mode === 'create' || props.mode === 'edit' || props.mode === 'draft'"
          type="submit"
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
        >
          {{ props.mode === 'create' || props.mode === 'draft' ? 'Add Task' : 'Save' }}
        </BaseButton>
        <BaseButton
          v-if="props.mode === 'create' || props.mode === 'draft'"
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
      </section>
    </form>
  </section>
</template>
