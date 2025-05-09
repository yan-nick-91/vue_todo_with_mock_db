<script setup lang="ts">
import { ref } from 'vue'
import TheCreateTask from '../components/home/TheCreateTask.vue'
import TheToDoList from '../components/home/TheToDoList.vue'
import BaseContainer from '@/UI/BaseContainer.vue'

const createTaskModalIsOpen = ref(false)
const tasks = ref([])

const openCreateTaskModal = () => {
  createTaskModalIsOpen.value = true
}

const closeCreateTaskModal = () => {
  createTaskModalIsOpen.value = false
}

const onTaskCreated = async (newTask: never) => {
  tasks.value.push(newTask)

  closeCreateTaskModal()
}
</script>

<template>
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h1>To Do's</h1>
      <hr />
      <TheToDoList class="mt-2 mb-2" />
      <button
        class="bg-emerald-700 cursor-pointer p-2 text-amber-50 rounded"
        @click="openCreateTaskModal"
      >
        Create task
      </button>
    </BaseContainer>
    <TheCreateTask
      :modal-is-open="createTaskModalIsOpen"
      @close="closeCreateTaskModal"
      @handelSubmit="onTaskCreated"
    />
  </section>
</template>
