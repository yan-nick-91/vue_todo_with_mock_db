<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllDraftedTasks } from '@/controller/task-controller'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import TheDraftList from '@/views/components/draft/TheDraftList.vue'
import TheDraftTaskModal from './TheDraftTaskModal.vue'
import type { Task } from '@/interface/Task'

const draftedTasks = ref<Task[]>([])
const selectedDraftTask = ref<Task[]>([])
const modalIsOpen = ref(false)

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

const openModal = () => {
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

onMounted(fetchDraftedTasks)
</script>

<template>
  <BaseContainer class="mx-auto my-5 p-4" is-bordered>
    <h1>Draft</h1>
    <hr />
    <TheDraftList
      class="mt-2 mb-2"
      :drafted-tasks="draftedTasks"
      @selected="draftedTaskSelected"
      @click="openModal"
    />
  </BaseContainer>
  <TheDraftTaskModal :modal-is-open="modalIsOpen" @close:draft="closeModal" />
</template>
