<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { LINKS } from '@/const/navigation'
import { getAllDraftedTasks, getAllFinishedTasks } from '@/controller/task-controller'
import BaseCircleNotification from '@/views/UI/BaseCircleNotification.vue'

const draftedTasks = ref([])
const finishedTasks = ref([])

const refreshHeaderTaskCounts = async () => {
  try {
    draftedTasks.value = await getAllDraftedTasks()
    finishedTasks.value = await getAllFinishedTasks()
  } catch (error) {
    console.error('Failed to refresh header task counts:', error)
  }
}

onMounted(() => {
  refreshHeaderTaskCounts()
})
</script>

<template>
  <header class="w-full">
    <nav
      class="sticky top-0 w-full bg-gradient-to-r from-cyan-800 to-emerald-700 text-amber-50"
      role="navigation"
    >
      <ul class="flex flex-wrap pl-4" role="list">
        <li v-for="link in LINKS" :key="link.id" role="listitem">
          <RouterLink
            class="flex px-3 py-2 hover:bg-emerald-600 items-center gap-1 font-medium"
            :to="link.url"
            role="link"
          >
            {{ link.nameToPage }}
            <BaseCircleNotification
              v-if="link.nameToPage === 'Completed Task'"
              :badge-display="finishedTasks.length"
              :aria-label="`Count ${finishedTasks.length}`"
              :role="'status'"
            />
            <BaseCircleNotification
              v-else-if="link.nameToPage === 'Drafts'"
              :badge-display="draftedTasks.length"
              :aria-label="`Count ${draftedTasks.length}`"
              :role="'status'"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
