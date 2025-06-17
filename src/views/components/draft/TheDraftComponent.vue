<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Task } from '@/interface/Task'
import { DANGER } from '@/const/base-types'
import { LIST_OF_DRAFTED_TASKS_IS_EMPTY } from '@/const/task'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { deleteTask, getAllDraftedTasks } from '@/controller/task-controller'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import TheTaskRow from '../task/TheTaskRow.vue'
import TheDraftTaskModal from './TheDraftTaskModal.vue'

const draftedTasks = ref<Task[]>([])
const selectedDraftTask = ref<Task[]>([])
const selectedTaskForModal = ref<Task | null>(null)
const modalIsOpen = ref(false)
const showConfirmDialog = ref(false)

const fetchDraftedTasks = async () => {
  try {
    draftedTasks.value = await getAllDraftedTasks()
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
    selectedDraftTask.value.map(async (task) => await deleteTask(task.id))

    const selectedIds = new Set(selectedDraftTask.value.map((task) => task.id))
    draftedTasks.value = draftedTasks.value.filter((task) => !selectedIds.has(task.id))
    selectedDraftTask.value = []
    showConfirmDialog.value = false
    window.location.href = '/drafts'
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
  <BaseContainer class="mx-auto my-5 p-4" is-bordered>
    <h1>Draft</h1>
    <hr />

    <section class="mt-2 mb-2" v-if="draftedTasks.length > LIST_OF_DRAFTED_TASKS_IS_EMPTY">
      <ul>
        <TheTaskRow
          v-for="task in draftedTasks"
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
