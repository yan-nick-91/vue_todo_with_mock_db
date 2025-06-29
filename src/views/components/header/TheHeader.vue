<script setup lang="ts">
import { onMounted } from 'vue'
import { taskStore } from '@/stores/taskStore'
import { RouterLink, useRoute } from 'vue-router'
import { LINKS } from '@/const/navigation'
import BaseCircleNotification from '@/views/UI/BaseCircleNotification.vue'

const store = taskStore()

const refreshHeaderTaskCounts = async () => {
  try {
    await store.refreshTasks()
  } catch (error) {
    console.error('Failed to refresh header task counts:', error)
  }
}

onMounted(() => {
  refreshHeaderTaskCounts()
})

const route = useRoute()
</script>

<template>
  <header class="w-full">
    <nav
      class="sticky top-0 w-full bg-gradient-to-r from-cyan-800 to-emerald-700 text-amber-50"
      role="navigation"
    >
      <ul class="flex flex-wrap pl-4">
        <li v-for="link in LINKS" :key="link.id">
          <RouterLink
            class="flex px-3 py-2 hover:bg-emerald-600 items-center gap-1 font-medium"
            :to="link.url"
            :aria-current="route.path === link.url ? 'page' : 'undefined'"
          >
            {{ link.nameToPage }}
            <BaseCircleNotification
              v-if="link.nameToPage === 'Completed Task'"
              :badge-display="store.finishedTasks.length"
              :aria-label="`Count ${store.finishedTasks.length}`"
              :role="'status'"
            />
            <BaseCircleNotification
              v-else-if="link.nameToPage === 'Drafts'"
              :badge-display="store.draftedTasks.length"
              :aria-label="`Count ${store.draftedTasks.length}`"
              :role="'status'"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
