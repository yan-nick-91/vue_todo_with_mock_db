<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Task } from '@/interface/task'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { DANGER, SUCCESS } from '@/const/base-types'
import { deleteTask, getTasks, updateTask } from '@/controller/task-controller'
import TheToDoList from '../home/TheToDoList.vue'
import ConfirmDeletionDialog from '../misc/ConfirmDeletionDialog.vue'
import TaskForm from '../misc/TaskForm.vue'

const createTaskModalIsOpen = ref(false)
const createModalIsOpen = ref(false)
const tasks = ref<Task[]>([])
const selectedTask = ref<Task | null>(null)
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

const saveUpdatedTask = async () => {
  console.log('Selected Task:', selectedTask.value)
  if (selectedTask.value) {
    try {
      await updateTask(selectedTask.value.id, selectedTask.value)
      tasks.value = tasks.value.map((task) =>
        task.id === selectedTask.value!.id ? selectedTask.value! : task,
      )
      createModalIsOpen.value = false
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }
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
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h1>To Do's</h1>
      <hr />
      <TheToDoList class="mt-2 mb-2" :tasks="tasks" @selected="taskItemSelected" />
      <div class="flex gap-2">
        <BaseButton
          v-show="selectedTaskItem.length > 0"
          :btn-type="DANGER"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="removeSelectedTasks"
          >Remove selected items</BaseButton
        >
        <BaseButton
          v-show="selectedTaskItem.length === 0"
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="openCreateTaskModal"
        >
          Create task
        </BaseButton>
      </div>
    </BaseContainer>
    <TaskForm
      :mode="'create'"
      :modal-is-open="createTaskModalIsOpen"
      @close="closeCreateTaskModal"
      @handle-submit="onTaskCreated"
    />

    <div v-if="createModalIsOpen" class="border w-[80%] mx-auto p-4">
      <input type="text" v-model="selectedTask!.task" class="border p-1 w-[100%]" />
      <div class="flex gap-2 mt-2">
        <BaseButton
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="saveUpdatedTask"
        >
          Save
        </BaseButton>
        <BaseButton
          :btn-type="DANGER"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="createModalIsOpen = false"
        >
          Cancel
        </BaseButton>
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
