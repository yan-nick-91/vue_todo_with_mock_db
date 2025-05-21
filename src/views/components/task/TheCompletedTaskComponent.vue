<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { deleteTask, getAllFinishedTasks } from '@/controller/task-controller'
import type { Task } from '@/interface/task'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import TheCompletionList from './TheCompletionList.vue'
import BaseButton from '@/views/UI/BaseButton.vue'
import { DANGER } from '@/const/base-types'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'

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
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h1>Completed tasks</h1>
      <hr />
      <TheCompletionList
        class="mt-2 mb-2"
        :finished-tasks="finishedTasks"
        @selected="completedTaskItemSelected"
      />
      <BaseButton
        v-show="selectedFinishedTask.length > 0"
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
  </section>
</template>
