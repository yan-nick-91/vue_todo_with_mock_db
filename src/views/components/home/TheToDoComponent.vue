<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { taskStore } from '@/stores/taskStore'
import type { Task } from '@/interface/Task'
import { AMOUNT_OF_SELECTED_TASK_IS_ZERO } from '@/const/task'
import { DANGER, SUCCESS } from '@/const/base-types'
import { deleteTask, getTasks } from '@/controller/task-controller'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import FilterComponent from '../misc/FilterComponent.vue'
import TheToDoList from '../home/TheToDoList.vue'
import TaskForm from '../task/form/TaskForm.vue'

const store = taskStore()

const createTaskModalIsOpen = ref(false)
const tasks = ref<Task[]>([])
const selectedTaskItem = ref<Task[]>([])
const showConfirmDialog = ref(false)

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
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

onMounted(fetchTasks)
</script>

<template>
  <section aria-labelledby="todo-list-title" class="mt-15">
    <div class="relative bottom-15">
      <FilterComponent class="fixed mt-5 ml-[10%] mx-auto" :container-width="20" />
    </div>
    <hr />

    <BaseContainer class="mx-auto my-2 p-4" is-bordered>
      <h1 id="todo-list-title">To Do's</h1>
      <hr />
      <TheToDoList
        class="mt-2 mb-2"
        :tasks="tasks"
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
      <div @click.stop>
        <TaskForm
          :mode="'create'"
          :modal-is-open="createTaskModalIsOpen"
          @close="closeCreateTaskModal"
          @handle-submit="onTaskCreated"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md"
        />
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmDeletionDialog
      :show-confirm-dialog="showConfirmDialog"
      @confirm="confirmRemoval"
      @cancel="cancelRemoval"
    />
  </section>
</template>
