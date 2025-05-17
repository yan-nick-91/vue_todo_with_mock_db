<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import UpdateModal from './UpdateTaskModal.vue'
import { deleteTask, getTaskId, updateTask } from '@/controller/task-controller'
import BaseContainer from '@/UI/BaseContainer.vue'
import BaseButton from '@/UI/BaseButton.vue'
import { DANGER, SUCCESS, INFO } from '@/const/base-types'
import type { Task } from '@/interface/task'
import DeleteTaskModal from './DeleteTaskModal.vue'
import UpdateTaskModal from './UpdateTaskModal.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const task = ref<Task>({
  id: '',
  task: '',
  createdAt: '',
  updatedAt: '',
  isFinished: false,
  bulletList: [],
})
const errorMessage = ref('')
const deleteBtnSelected = ref(false)
const selectedTasks = ref<Record<number, boolean>>({})
const updateBtnIsSelected = ref(false)

const getTask = async (id: string) => {
  const result = await getTaskId(id)

  task.value = {
    ...result,
    bulletList: result.bulletList || [],
  }

  task.value.bulletList.forEach((_, index) => {
    selectedTasks.value[index] = false
  })
}

const toggleCompletion = async (index: number) => {
  const updatedBulletList = [...task.value.bulletList]

  updatedBulletList[index] = {
    ...updatedBulletList[index],
    itemIsFinished: !updatedBulletList[index].itemIsFinished,
  }

  try {
    await updateTask(id, {
      ...task.value,
      bulletList: updatedBulletList,
    })

    task.value.bulletList = updatedBulletList // reflect change in UI
  } catch (error) {
    console.error('Error updating task:', error)
    errorMessage.value = 'Failed to update task status.'
  }
}

const checkIfAllTasksCompleted = () => {
  const allDone = task.value.bulletList.every((_, index) => selectedTasks.value[index])
  if (!allDone) {
    errorMessage.value = 'Please complete all tasks before finishing.'
  } else {
    errorMessage.value = ''
    // Proceed with whatever should happen when all tasks are done.
    console.log('All tasks are completed! 🎉')
  }
}

const confirmDeletion = async () => {
  try {
    await deleteTask(task.value.id)
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Something went wrong during task deletion process', error)
  }
}

onMounted(() => {
  getTask(id)
})

const openUpdateModal = () => {
  if (deleteBtnSelected.value) {
    deleteBtnSelected.value = false
  }

  if (!updateBtnIsSelected.value && !deleteBtnSelected.value) {
    updateBtnIsSelected.value = true
  }
}

const closeUpdateModal = () => {
  if (updateBtnIsSelected.value) {
    updateBtnIsSelected.value = false
  }
}

const openDeleteModal = () => {
  if (updateBtnIsSelected.value) {
    updateBtnIsSelected.value = false
  }

  if (!updateBtnIsSelected.value && !deleteBtnSelected.value) {
    deleteBtnSelected.value = true
  }
}

const closeDeleteModal = () => {
  if (deleteBtnSelected.value) {
    deleteBtnSelected.value = false
  }
}
</script>

<template>
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h2 class="text-2xl font-bold mb-4">Task: {{ task.task }}</h2>
      <em><strong>Created at:</strong> {{ task.createdAt }}</em>
      <em v-if="task.updatedAt"><strong>Updated at:</strong> {{ task.updatedAt }}</em>

      <!-- Task Details Section -->
      <p class="my-4">
        <strong>Task Details:</strong>
      </p>

      <!-- Bullet List -->
      <div class="mb-2">
        <ul v-if="task.bulletList.length > 0" class="list-disc pl-6 space-y-2 text-gray-700">
          <li v-for="(bullet, index) in task.bulletList" :key="index">
            <div class="flex gap-2 items-start">
              <span :class="{ 'line-through': bullet.itemIsFinished }" class="min-w-[15%]">
                {{ bullet.bulletItem }}
              </span>
              <span>
                <BaseButton
                  class="p-1 rounded cursor-pointer transform active:scale-95"
                  :btn-type="bullet.itemIsFinished ? DANGER : SUCCESS"
                  @click="toggleCompletion(index)"
                  >{{ bullet.itemIsFinished ? 'Undone' : 'Done' }}</BaseButton
                >
              </span>
            </div>
          </li>
        </ul>
        <!-- Fallback text if bullet list is empty -->
        <p v-else>No details available</p>
      </div>

      <hr />
      <div class="flex gap-2 mt-2">
        <BaseButton
          :btn-type="INFO"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="openUpdateModal"
        >
          Update
        </BaseButton>
        <BaseButton
          :btn-type="DANGER"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="openDeleteModal"
        >
          Delete
        </BaseButton>
        <BaseButton
          @click="checkIfAllTasksCompleted"
          :btn-type="SUCCESS"
          class="p-2 rounded cursor-pointer transform active:scale-95"
          >Finish</BaseButton
        >
      </div>
      <p v-if="errorMessage" class="text-red-500 mt-2">
        {{ errorMessage }}
      </p>
    </BaseContainer>
  </section>
  <!-- delete -->
  <DeleteTaskModal
    v-if="deleteBtnSelected"
    class="mx-auto"
    :delete-btn-selected="deleteBtnSelected"
    :task-label="task.task"
    @delete="confirmDeletion"
    @cancel="closeDeleteModal"
  />
  <!-- update -->
  <UpdateTaskModal
    v-if="updateBtnIsSelected"
    class="mx-auto"
    :update-btn-is-selected="updateBtnIsSelected"
    @close="closeUpdateModal"
  />
</template>
