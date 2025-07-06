<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { taskStore } from '@/stores/taskStore'
import type { Task } from '@/interface/Task'
import type { BulletItem } from '@/interface/BulletItem'
import { DANGER, PRIORITIES } from '@/const/base-types'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import BaseSelection from '@/views/UI/BaseSelection.vue'
import { addTask, updateTask } from '@/controller/task-controller'
import { invalidInput } from '@/errors/task-error-handler'
import { generateCurrentDate, generateTaskId } from '@/util/value-generator'
import BulletListManager from '@/views/components/task/form/BulletListManager.vue'
import DateInputSection from './DateInputSection.vue'
import { FormMode } from '@/const/enums/ModeStates'
import FormButtonSection from './FormButtonSection.vue'

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

const store = taskStore()

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

  const start = new Date(startDateInput.value)
  const end = new Date(endDateInput.value)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  if (!startDateInput.value || isNaN(start.getTime()) || start < today) {
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

// const isFormComplete = () => {
//   return (
//     taskInput.value.trim() !== '' &&
//     startDateInput.value !== '' &&
//     endDateInput.value !== '' &&
//     isDateValid()
//   )
// }

const modeStatus = computed<FormMode>(() => {
  if (props.mode === 'edit') return FormMode.EDIT
  if (shouldSaveAsDraft.value) return FormMode.DRAFT
  return FormMode.CREATE
})

const generatePayload = () => {
  // const isDraft = shouldSaveAsDraft.value || modeStatus.value === FormMode.DRAFT

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
    isDrafted: shouldSaveAsDraft.value || modeStatus.value === FormMode.DRAFT,
    bulletList: bulletList.value,
  }
}

const submitHandler = async () => {
  clearErrors()

  const isSavingAsDraft = shouldSaveAsDraft.value
  let hasError = false

  if (!taskInput.value.trim()) {
    taskInputError.value = invalidInput('Input field for task should not be empty.').message
    hasError = true
  }

  if (!isSavingAsDraft && !isDateValid()) hasError = true

  if (hasError) {
    shouldSaveAsDraft.value = false
    return
  }

  const payload = generatePayload()

  await addOrUpdateTaskFetchHandler(payload.id, payload)
}

const addOrUpdateTaskFetchHandler = async (id: string, payload: unknown) => {
  try {
    if (props.mode === 'edit' || props.mode === 'draft') {
      await updateTask(id, payload)
    } else {
      await addTask(payload)
    }

    await store.refreshTasks()
    emit('handleSubmit', payload)
    closeModalFormTask()
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
    <h2 class="text-[1.5rem]">
      <span v-if="props.mode === 'create'">Task Form</span>
      <span v-if="props.mode === 'edit'">Update Task</span>
      <span v-if="props.mode === 'draft'">Task Form <strong>(Drafted)</strong></span>
    </h2>
    <hr />
    <form @submit.prevent="submitHandler" class="mt-5">
      <BaseContainer class="w-full mb-2">
        <div>
          <label for="taskInput" class="block font-semibold mb-1">Task Description</label>
          <input
            id="taskInput"
            class="border p-1 w-full"
            :class="{ 'border-red-500 bg-red-200': taskInputError }"
            type="text"
            placeholder="Enter a task..."
            v-model="taskInput"
            @input="taskInputError = ''"
            aria-required="true"
            :aria-invalid="taskInputError ? 'true' : 'false'"
            aria-describedby="taskInputError"
          />
        </div>
        <div class="mb-2 min-h-[1.5rem]">
          <BaseMessageDisplay
            v-if="taskInputError"
            :id="'taskInputError'"
            :type="DANGER"
            :message="taskInputError"
            role="alert"
          />
        </div>
      </BaseContainer>
      <hr />
      <BaseContainer class="w-full mb-2">
        <h3 class="sr-only" id="prioritySection">Select priority</h3>
        <BaseSelection
          v-model="selectedPriority"
          :items="PRIORITIES"
          is-bordered
          aria-labelledby="prioritySection"
        />
      </BaseContainer>
      <hr />
      <BulletListManager
        :bullet-list="bulletList"
        @add-bullet-item="addBulletItem"
        @remove-bullet-item="removeBulletItem"
        aria-label="Bullet list manager"
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
      <section class="flex gap-2 mt-8" aria-label="Form action buttons">
        <h3 class="sr-only">Button section</h3>
        <FormButtonSection
          :mode="mode"
          @save:draft="saveAsDraft"
          @close:modal="closeModalFormTask"
        />
      </section>
    </form>
  </section>
</template>
