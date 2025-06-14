<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LINKS } from '@/const/navigation'
import { onMounted, ref } from 'vue'
import { getAllDraftedTasks, getAllFinishedTasks } from '@/controller/task-controller'
import BaseCircleNotification from '@/views/UI/BaseCircleNotification.vue'

const draftedTasks = ref([])
const finishedTasks = ref([])

const fetchDrafts = async () => {
  try {
    draftedTasks.value = await getAllDraftedTasks()
  } catch (error) {
    console.error('Error fetching drafts:', error)
  }
}

const fetchFinishedTasks = async () => {
  try {
    finishedTasks.value = await getAllFinishedTasks()
  } catch (error) {
    console.error('Error fetching the finished tasks', error)
  }
}

onMounted(() => {
  fetchDrafts()
  fetchFinishedTasks()
})
</script>

<template>
  <header class="w-full">
    <nav class="sticky top-0 w-full bg-gradient-to-r from-cyan-800 to-emerald-700 text-amber-50">
      <ul class="flex flex-wrap pl-4">
        <li v-for="link in LINKS" :key="link.id">
          <RouterLink class="flex px-3 py-2 hover:bg-emerald-600 items-center gap-1" :to="link.url"
            >{{ link.nameToPage }}
            <BaseCircleNotification
              v-if="link.nameToPage === 'Completed Task'"
              :counter-display="finishedTasks.length"
            />
            <BaseCircleNotification
              v-else-if="link.nameToPage === 'Drafts'"
              :counter-display="draftedTasks.length"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
