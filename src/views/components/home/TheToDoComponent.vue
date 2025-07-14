<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { taskStore } from '@/stores/taskStore'
import type { Task } from '@/interface/Task'
import { AMOUNT_OF_SELECTED_TASK_IS_ZERO } from '@/const/task'
import { DANGER, SUCCESS, DEFAULT, PRIORITIES } from '@/const/base-types'
import { deleteTask, getTasks } from '@/controller/task-controller'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseSelection from '@/views/UI/BaseSelection.vue'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import FilterComponent from '../misc/FilterComponent.vue'
import TheToDoList from '../home/TheToDoList.vue'
import TaskForm from '../task/form/TaskForm.vue'

const store = taskStore()

const createTaskModalIsOpen = ref(false)
const tasks = ref<Task[]>([])
const filteredTasks = ref<Task[]>([])
const selectedTaskItem = ref<Task[]>([])
const showConfirmDialog = ref(false)
const selectedPriority = ref<(typeof PRIORITIES)[number] | ''>('')

const fetchTasks = async () => {
  try {
    const data: Task[] = await getTasks()
    tasks.value = data
    filteredTasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const openCreateTaskModal = () => {
  createTaskModalIsOpen.value = true
}

const closeCreateTaskModal = () => {
  createTaskModalIsOpen.value = false
}

const onTaskCreated = (newTask: never) => {
  tasks.value.push(newTask)
}

const taskItemSelected = (task: Task) => {
  const exists = selectedTaskItem.value.find((t) => t.id === task.id)
  if (exists) {
    selectedTaskItem.value = selectedTaskItem.value.filter((t) => t.id !== task.id)
  } else {
    selectedTaskItem.value.push(task)
  }
}

const removeSelectedTasks = () => {
  showConfirmDialog.value = true
}

const confirmRemoval = async () => {
  try {
    selectedTaskItem.value.map(async (task) => await deleteTask(task.id))

    const selectedIds = new Set(selectedTaskItem.value.map((task) => task.id))
    tasks.value = tasks.value.filter((task) => !selectedIds.has(task.id))
    selectedTaskItem.value = []
    showConfirmDialog.value = false
    store.refreshTasks() // Refresh the task list in the store
  } catch (error) {
    console.error('Error deleting tasks:', error)
  }
}

const cancelRemoval = () => {
  showConfirmDialog.value = false
}

const filterByPriority = () => {
  if (!selectedPriority.value) {
    return tasks.value
  } else {
    filteredTasks.value = tasks.value.filter((task) => task.priority === selectedPriority.value)
  }
}

const clearAllFiltering = () => {
  selectedPriority.value = ''
  filteredTasks.value = tasks.value
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && createTaskModalIsOpen.value) {
    closeCreateTaskModal()
  }
}

const setupEscapeListener = () => {
  addEventListener('keydown', handleEscape)
}

const cleanupEscapeListener = () => {
  removeEventListener('keydown', handleEscape)
}

onMounted(() => {
  fetchTasks()
  setupEscapeListener()
})

onBeforeUnmount(() => {
  cleanupEscapeListener()
})
</script>

<template>
  <BaseContainer class="mx-auto my-2 p-4 mt-15" aria-labelledby="todo-list-title" is-bordered>
    <h1 id="todo-list-title">To Do's</h1>
    <p v-if="selectedPriority !== '' && filteredTasks.length < tasks.length" class="mt-2">
      <strong>Showing by priority:</strong> {{ selectedPriority }}
    </p>
    <FilterComponent class="mx-auto">
      <!-- Your filter form here -->
      <section class="flex flex-col">
        <label for="priority">Priority</label>
        <BaseSelection :items="PRIORITIES" class="border" v-model="selectedPriority" />
      </section>
      <section class="flex gap-2 mt-2">
        <BaseButton :btn-type="SUCCESS" class="p-1 rounded cursor-pointer" @click="filterByPriority"
          >Filter</BaseButton
        >
        <BaseButton
          :btn-type="DEFAULT"
          class="p-1 rounded cursor-pointer"
          @click="clearAllFiltering"
          >Clear</BaseButton
        >
      </section>
    </FilterComponent>
    <TheToDoList
      class="mt-2 mb-2"
      :tasks="filteredTasks"
      aria-labelledby="todo-list-title"
      @selected="taskItemSelected"
    />
    <section class="flex gap-2">
      <BaseButton
        v-if="selectedTaskItem.length === AMOUNT_OF_SELECTED_TASK_IS_ZERO"
        :btn-type="SUCCESS"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="openCreateTaskModal"
        aria-label="Create new task"
      >
        Create task
      </BaseButton>
      <BaseButton
        v-if="selectedTaskItem.length > AMOUNT_OF_SELECTED_TASK_IS_ZERO"
        :btn-type="DANGER"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="removeSelectedTasks"
        aria-label="Remove selected tasks"
        >Remove selected items</BaseButton
      >
    </section>
  </BaseContainer>
  <div
    v-if="createTaskModalIsOpen"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
    @click="closeCreateTaskModal"
  >
    <div @click.stop class="w-[80%] max-h-[100vh] overflow-y-auto bg-white shadow-md">
      <TaskForm
        :mode="'create'"
        :modal-is-open="createTaskModalIsOpen"
        @close="closeCreateTaskModal"
        @handle-submit="onTaskCreated"
        class="w-full"
      />
    </div>
  </div>

  <!-- Confirmation Dialog -->
  <ConfirmDeletionDialog
    :show-confirm-dialog="showConfirmDialog"
    @confirm="confirmRemoval"
    @cancel="cancelRemoval"
  />
</template>
