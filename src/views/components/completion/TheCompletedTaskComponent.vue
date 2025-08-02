<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Task } from '@/interface/TaskItem'
import { DANGER, DEFAULT, SUCCESS, PRIORITIES } from '@/const/base-types'
import { LIST_OF_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseSelection from '@/views/UI/BaseSelection.vue'
import { deleteTask, getAllFinishedTasks } from '@/controller/task-controller'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import TheCompletionList from './TheCompletionList.vue'
import FilterComponent from '../misc/FilterComponent.vue'
import { taskStore } from '@/stores/taskStore'
import { FilterTaskMode } from '@/const/enums/ModeStates'

const store = taskStore()

const selectedFinishedTask = ref<Task[]>([])
const showConfirmDialog = ref(false)

const getFinishedTasks = async () => {
  try {
    store.finishedTasks = await getAllFinishedTasks()
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
    store.finishedTasks = store.finishedTasks.filter((task) => !selectedIds.has(task.id))
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
    <p v-if="store.filterApplied" class="mt-2">
      <strong>Showing by priority:</strong> {{ store.selectedPriority }}
    </p>
    <FilterComponent class="mx-auto">
      <!-- Your filter form here -->
      <section class="flex flex-col">
        <label for="priority">Priority</label>
        <BaseSelection :items="PRIORITIES" class="border" v-model="store.selectedPriority" />
      </section>
      <section class="flex gap-2 mt-2">
        <BaseButton
          :btn-type="SUCCESS"
          class="p-1 rounded cursor-pointer"
          @click="store.filterByPriority(FilterTaskMode.COMPLETED)"
          >Filter</BaseButton
        >
        <BaseButton
          :btn-type="DEFAULT"
          class="p-1 rounded cursor-pointer"
          @click="store.clearAllFiltering(FilterTaskMode.COMPLETED)"
          >Clear</BaseButton
        >
      </section>
    </FilterComponent>

    <TheCompletionList
      class="mt-2 mb-2"
      :finished-tasks="store.completedTasks"
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
