<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Task } from '@/interface/Task'
import { DANGER } from '@/const/base-types'
import { LIST_OF_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { deleteTask, getAllFinishedTasks } from '@/controller/task-controller'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import TheCompletionList from './TheCompletionList.vue'
import { taskStore } from '@/stores/taskStore'

const store = taskStore()

const finishedTasks = ref<Task[]>([])
const selectedFinishedTask = ref<Task[]>([])
const showConfirmDialog = ref(false)

const getFinishedTasks = async () => {
  try {
    finishedTasks.value = await getAllFinishedTasks()
  } catch (error) {
    console.error('Error fetching finished tasks:', error)
  }
}

const completedTaskItemSelected = (task: Task) => {
  const exists = selectedFinishedTask.value.find((t) => t.id === task.id)

  if (exists) {
    selectedFinishedTask.value = selectedFinishedTask.value.filter((t) => t.id !== task.id)
  } else {
    selectedFinishedTask.value.push(task)
  }
}

const removeSelectedCompletion = () => {
  showConfirmDialog.value = true
}

const confirmRemoval = async () => {
  try {
    selectedFinishedTask.value.map(async (task) => await deleteTask(task.id))

    const selectedIds = new Set(selectedFinishedTask.value.map((task) => task.id))
    finishedTasks.value = finishedTasks.value.filter((task) => !selectedIds.has(task.id))
    selectedFinishedTask.value = []
    showConfirmDialog.value = false
    store.refreshTasks() // Refresh the task list in the store
  } catch (error) {
    console.error('Error deleting tasks:', error)
  }
}

const cancelRemoval = () => {
  showConfirmDialog.value = false
}

onMounted(() => {
  getFinishedTasks()
})
</script>

<template>
  <BaseContainer class="mx-auto my-5 p-4 mt-15" is-bordered>
    <h1>Completed tasks</h1>
    <hr />
    <TheCompletionList
      class="mt-2 mb-2"
      :finished-tasks="finishedTasks"
      @selected="completedTaskItemSelected"
    />
    <BaseButton
      v-show="selectedFinishedTask.length > LIST_OF_COMPLETED_TASKS_IS_EMPTY"
      :btn-type="DANGER"
      class="cursor-pointer p-2 rounded transform active:scale-95"
      @click="removeSelectedCompletion"
    >
      Remove selected items
    </BaseButton>
  </BaseContainer>

  <!-- Confirmation Dialog -->
  <ConfirmDeletionDialog
    :show-confirm-dialog="showConfirmDialog"
    @confirm="confirmRemoval"
    @cancel="cancelRemoval"
  />
</template>
