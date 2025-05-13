<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTaskId } from '@/controller/task-controller'
import BaseContainer from '@/UI/BaseContainer.vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/UI/BaseButton.vue'
import { DANGER, SUCCESS } from '@/const/base-types'

const route = useRoute()
const id = route.params.id as string

const task = ref({
  id: '',
  task: '',
  createdAt: '',
  updatedAt: '',
  bulletList: [],
})
const errorMessage = ref('')

const selectedTasks = ref<Record<number, boolean>>({})

const getTask = async (id: string) => {
  task.value = await getTaskId(id)

  task.value.bulletList.forEach((_, index) => {
    selectedTasks.value[index] = false
  })
}

// const toggleTask = (index: number) => {
//   selectedTasks.value[index] = !selectedTasks.value[index]
// }

const toggleCompletion = (index: number) => {
  selectedTasks.value[index] = !selectedTasks.value[index]
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

onMounted(() => {
  getTask(id)
})
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
      <ul v-if="task.bulletList.length > 0" class="list-disc pl-6 space-y-2 text-gray-700">
        <li v-for="(bullet, index) in task.bulletList" :key="index">
          <div class="flex gap-2 items-start">
            <span :class="{ 'line-through': selectedTasks[index] }" class="min-w-[15%]">
              {{ bullet }}
            </span>
            <span>
              <BaseButton
                class="p-1 rounded cursor-pointer transform active:scale-95"
                :btn-type="selectedTasks[index] ? DANGER : SUCCESS"
                @click="toggleCompletion(index)"
                >{{ selectedTasks[index] ? 'Undone' : 'Done' }}</BaseButton
              >
            </span>
          </div>
        </li>
      </ul>
      <!-- Fallback text if bullet list is empty -->
      <p v-else>No details available</p>

      <BaseButton
        @click="checkIfAllTasksCompleted"
        :btn-type="SUCCESS"
        class="mt-2 p-2 rounded cursor-pointer transform active:scale-95"
        >Finish</BaseButton
      >
      <p v-if="errorMessage" class="text-red-500 mt-2">
        {{ errorMessage }}
      </p>
    </BaseContainer>
  </section>
</template>
