<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/views/components/header/TheHeader.vue'
import LoadingComponent from './views/components/misc/LoadingComponent.vue'
import { taskStore } from './stores/taskStore'

const isLoading = ref(false)
const router = useRouter()
const store = taskStore()
const errorMessage = ref('')

router.beforeEach(async (to, from, next) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await store.refreshTasks()
    next()
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Unknown error'
    next(false)
  }
})

router.afterEach(() => {
  isLoading.value = false
})
</script>

<template>
  <transition
    name="fade"
    mode="out-in"
    class="fixed inset-0 items-center justify-center bg-white z-[999]"
  >
    <div v-if="isLoading" role="status" class="flex flex-col items-center">
      <LoadingComponent />
    </div>

    <div v-else-if="errorMessage" class="flex flex-col items-center text-red-700 text-lg">
      {{ errorMessage }}
    </div>
    <div v-else>
      <TheHeader />
      <main>
        <RouterView />
      </main>
    </div>
  </transition>
</template>
