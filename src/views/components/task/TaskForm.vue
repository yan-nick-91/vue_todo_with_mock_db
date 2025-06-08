<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import type { Task } from '@/interface/Task'
import type { BulletItem } from '@/interface/BulletItem'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseNotification from '@/views/UI/BaseNotification.vue'
import BaseSelection from '@/views/UI/BaseSelection.vue'
import { addTask, updateTask } from '@/controller/task-controller'
import { DANGER, SUCCESS, TRANSPARENT, PRIORITIES } from '@/const/base-types'
import { invalidInput } from '@/errors/task-error-handler'
import { generateBulletItemId, generateCurrentDate, generateTaskId } from '@/util/value-generator'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  modalIsOpen: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<'create' | 'edit'>,
    required: true,
  },
  taskToEdit: {
    type: Object as PropType<Task>,
  },
})

const emit = defineEmits(['close', 'handleSubmit'])

const taskInput = ref('')
const itemForBulletListInput = ref('')
const bulletList = ref<BulletItem[]>([])
const taskInputError = ref('')
const bulletInputError = ref('')
const selectedPriority = ref<(typeof PRIORITIES)[number]>(PRIORITIES[0])

watch(
  () => props.taskToEdit,
  (newTask) => {
    if (props.mode === 'edit' && newTask) {
      taskInput.value = newTask.task
      selectedPriority.value = newTask.priority as (typeof PRIORITIES)[number]
      bulletList.value = JSON.parse(JSON.stringify(newTask.bulletList))
    }
  },
  { immediate: true },
)

const submitHandler = async () => {
  if (taskInput.value.trim() === '') {
    taskInputError.value = invalidInput('Input field for task should not be empty').message
    return
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
  } catch (err) {
    console.error('Failed to add task:', err)
  }
}

const generatePayload = () => {
  return {
    id: props.taskToEdit?.id ?? generateTaskId(),
    task: taskInput.value.trim(),
    createdAt: props.taskToEdit?.createdAt ?? generateCurrentDate(),
    updatedAt: props.mode === 'edit' ? generateCurrentDate() : '',
    priority: selectedPriority.value,
    isFinished: props.taskToEdit?.isFinished ?? false,
    bulletList: bulletList.value,
  }
}

const addItemToBulletList = () => {
  if (itemForBulletListInput.value.trim() === '') {
    bulletInputError.value = invalidInput('Input field to add a bullet should not be empty').message
    return
  }

  bulletList.value.push({
    id: generateBulletItemId(),
    bulletItem: itemForBulletListInput.value.trim(),
    itemIsFinished: false,
  })

  itemForBulletListInput.value = ''
}

const closeModalFormTask = () => {
  taskInput.value = ''
  bulletList.value = []
  taskInputError.value = ''
  bulletInputError.value = ''
  emit('close')
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
          <BaseNotification v-if="taskInputError" :type="DANGER" :message="taskInputError" />
        </div>
      </BaseContainer>
      <hr />
      <BaseContainer class="w-[100%] mb-2">
        <div>
          <BaseSelection v-model="selectedPriority" :items="PRIORITIES" is-bordered />
        </div>
      </BaseContainer>
      <hr />
      <BaseContainer class="w-[100%] my-2">
        <BaseContainer
          data-id="bulletList"
          class="w-[100%] mb-2 min-h-[10%] max-h-[10%] bg-gray-100"
          is-bordered
        >
          <div v-if="bulletList.length > 0">
            <ul>
              <li
                v-for="item in bulletList"
                :key="item.id"
                class="flex items-center gap-2 py-1 px-2"
              >
                <span class="flex-grow">
                  {{ item.bulletItem }}
                </span>
                <span>
                  <BaseButton
                    :btn-type="TRANSPARENT"
                    class="cursor-pointer text-red-500 hover:text-red-600 transform active:scale-95"
                    type="button"
                    @click="removeBulletItem(item.id)"
                    ><XMarkIcon class="h-7 w-7 mt-2"
                  /></BaseButton>
                </span>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="p-2 text-gray-500">Nothing added yet.</p>
          </div>
        </BaseContainer>
        <div>
          <input
            :class="`border p-1 mb-2 w-[100%] ${bulletInputError ? 'border-red-500 bg-red-200' : ''}`"
            type="text"
            id="bulletItemInput"
            placeholder="Add Item to list (Optional)..."
            v-model="itemForBulletListInput"
            @input="bulletInputError = ''"
          />
        </div>
        <div class="mb-1 min-h-[1.5rem]">
          <BaseNotification v-if="bulletInputError" :type="DANGER" :message="bulletInputError" />
        </div>
        <BaseButton
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="addItemToBulletList"
          type="button"
          >Add item</BaseButton
        >
      </BaseContainer>
      <hr />
      <div class="flex gap-2 mt-8">
        <BaseButton
          type="submit"
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
        >
          {{ props.mode === 'create' ? 'Add Task' : 'Save' }}
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
