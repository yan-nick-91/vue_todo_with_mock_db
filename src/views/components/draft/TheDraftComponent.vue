<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Task } from '@/interface/Task'
import { DANGER } from '@/const/base-types'
import { LIST_OF_DRAFTED_TASKS_IS_EMPTY } from '@/const/task'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { deleteTask } from '@/controller/task-controller'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import TheTaskRow from '../task/TheTaskRow.vue'
import TheDraftTaskModal from './TheDraftTaskModal.vue'
import { taskStore } from '@/stores/taskStore'

const store = taskStore()

const selectedDraftTask = ref<Task[]>([])
const selectedTaskForModal = ref<Task>()
const modalIsOpen = ref(false)
const showConfirmDialog = ref(false)

const fetchDraftedTasks = async () => {
  try {
    await store.refreshTasks()
  } catch (error) {
    console.error('Error fetching drafted tasks:', error)
  }
}

const draftedTaskSelected = (task: Task) => {
  const exists = selectedDraftTask.value.find((t) => t.id === task.id)
  if (exists) {
    selectedDraftTask.value = selectedDraftTask.value.filter((t) => t.id !== task.id)
  } else {
    selectedDraftTask.value.push(task)
  }
}

const openModal = (task: Task) => {
  selectedTaskForModal.value = task
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

const removeSelectedCompletion = () => {
  showConfirmDialog.value = true
}

const confirmRemoval = async () => {
  try {
    await Promise.all(selectedDraftTask.value.map((task) => deleteTask(task.id)))

    selectedDraftTask.value = []
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
  fetchDraftedTasks()
})
</script>

<template>
  <BaseContainer class="mx-auto my-5 p-4 mt-15" is-bordered>
    <h1>Draft</h1>
    <hr />

    <section class="mt-2 mb-2" v-if="store.draftedTasks.length > LIST_OF_DRAFTED_TASKS_IS_EMPTY">
      <ul>
        <TheTaskRow
          v-for="task in store.draftedTasks"
          :key="task.id"
          :task="task"
          :mode="'draft'"
          @selected="draftedTaskSelected"
          @click="openModal(task)"
        />
      </ul>
    </section>
    <section class="mt-2 mb-2" v-else>
      <BaseMessageDisplay :message="'Nothing found.'" />
    </section>

    <BaseButton
      v-show="selectedDraftTask.length > LIST_OF_DRAFTED_TASKS_IS_EMPTY"
      :btn-type="DANGER"
      class="cursor-pointer p-2 rounded transform active:scale-95"
      @click="removeSelectedCompletion"
    >
      Remove selected items
    </BaseButton>
  </BaseContainer>
  <TheDraftTaskModal
    :modal-is-open="modalIsOpen"
    :drafted-task="selectedTaskForModal"
    @close:draft="closeModal"
  />
  <ConfirmDeletionDialog
    :show-confirm-dialog="showConfirmDialog"
    @confirm="confirmRemoval"
    @cancel="cancelRemoval"
  />
</template>
