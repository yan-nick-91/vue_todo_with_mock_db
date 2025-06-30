<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { taskStore } from '@/stores/taskStore'
import type { Task } from '@/interface/Task'
import { BULLET_ITEM_LIST_IN_TASK_IS_EMPTY } from '@/const/task'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { deleteTask, getTaskId, updateTask } from '@/controller/task-controller'
import { DANGER, SUCCESS, INFO } from '@/const/base-types'
import DeleteTaskModal from './DeleteTaskModal.vue'
import UpdateTaskModal from './UpdateTaskModal.vue'

const store = taskStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const task = ref<Task>({
  id: '',
  task: '',
  createdAt: '',
  updatedAt: '',
  priority: '',
  startDate: '',
  endDate: '',
  isFinished: false,
  isDrafted: false,
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
    updateBtnIsSelected.value = false
  } catch (error) {
    console.error('Error updating task:', error)
    errorMessage.value = 'Failed to update task status.'
  }
}

const taskIsCompleted = async () => {
  const allDone = task.value.bulletList.every((bullet) => bullet.itemIsFinished)

  if (!task.value.isFinished) {
    setTaskAsFinished(allDone)
  } else {
    setTaskUnfinished()
  }
}

const setTaskAsFinished = async (allDone: boolean) => {
  if (allDone) {
    try {
      errorMessage.value = ''
      await updateTask(id, {
        ...task.value,
        isFinished: true,
      })
      store.refreshTasks()
      router.push('/')
      // window.location.href = '/'
    } catch (error) {
      console.error('Error finishing task:', error)
      errorMessage.value = 'Failed to finish task.'
    }
  } else {
    errorMessage.value = 'Please complete all tasks before finishing.'
  }
}

const setTaskUnfinished = async () => {
  try {
    await updateTask(id, {
      ...task.value,
      isFinished: false,
    })
    store.refreshTasks()
    router.push('/')
    // window.location.href = '/'
  } catch (error) {
    console.error('Error resetting task:', error)
    errorMessage.value = 'Failed to reset task.'
  }
}

const confirmDeletion = async () => {
  try {
    await deleteTask(task.value.id)
    window.location.href = '/'
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

const onTaskUpdated = (updatedTask: Task) => {
  task.value = { ...updatedTask }
  updateBtnIsSelected.value = false
}
</script>

<template>
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h2 class="text-2xl font-bold mb-4">
        Task: {{ task.task }} {{ task.isFinished ? '(Finished)' : '' }}
      </h2>
      <em><strong>Created at:</strong> {{ task.createdAt }}</em>
      <br />
      <em v-if="task.updatedAt"><strong>Updated at:</strong> {{ task.updatedAt }}</em>

      <p class="my-4">
        <strong>Task Details:</strong>
      </p>

      <p class="my-4"><strong>Priority:</strong> {{ task.priority }}</p>

      <!-- Bullet List -->
      <div class="mb-2">
        <ul
          role="list"
          v-if="task.bulletList.length > BULLET_ITEM_LIST_IN_TASK_IS_EMPTY"
          class="list-disc pl-6 space-y-2 text-gray-700"
        >
          <li v-for="(bullet, index) in task.bulletList" :key="index">
            <div class="flex gap-2 items-start">
              <span :class="{ 'line-through': bullet.itemIsFinished }" class="min-w-[15%]">
                {{ bullet.bulletItem }}
              </span>
              <span>
                <BaseButton
                  v-show="!task.isFinished"
                  class="p-1 rounded cursor-pointer transform active:scale-95"
                  :btn-type="bullet.itemIsFinished ? DANGER : SUCCESS"
                  @click="toggleCompletion(index)"
                  >{{ bullet.itemIsFinished ? 'Undone' : 'Done' }}</BaseButton
                >
              </span>
            </div>
          </li>
        </ul>
        <BaseMessageDisplay v-else :message="'No details available'" />
      </div>

      <hr />
      <div class="flex gap-2 mt-2">
        <BaseButton
          v-show="!task.isFinished"
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
          @click="taskIsCompleted"
          :btn-type="SUCCESS"
          class="p-2 rounded cursor-pointer transform active:scale-95"
          >{{ task.isFinished ? 'Mark as Unfinished' : 'Finish Task' }}</BaseButton
        >
      </div>
      <p v-if="errorMessage" class="text-red-500 mt-2">
        {{ errorMessage }}
      </p>
    </BaseContainer>
  </section>
  <DeleteTaskModal
    v-if="deleteBtnSelected"
    class="mx-auto"
    :delete-btn-selected="deleteBtnSelected"
    :task-label="task.task"
    @delete="confirmDeletion"
    @cancel="closeDeleteModal"
  />
  <UpdateTaskModal
    v-if="updateBtnIsSelected"
    class="mx-auto"
    :modal-is-open="updateBtnIsSelected"
    :update-btn-is-selected="updateBtnIsSelected"
    :task-to-edit="task"
    @close="closeUpdateModal"
    @updated="onTaskUpdated"
  />
</template>
