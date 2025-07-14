<script setup lang="ts">
import { onMounted, onUnmounted, ref, type ComponentPublicInstance } from 'vue'
import { taskStore } from '@/stores/taskStore'
import { RouterLink, useRoute } from 'vue-router'
import { LINKS } from '@/const/navigation'
import { TRANSPARENT } from '@/const/base-types'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/16/solid'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseCircleNotification from '@/views/UI/BaseCircleNotification.vue'
import TheHeaderDropdown from '@/views/components/header/TheHeaderDropdown.vue'

const isMobile = ref(true)
const dropdownIsOpen = ref(false)
const dropdownRef = ref<(ComponentPublicInstance & { rootRef: HTMLElement | null }) | null>(null)

const store = taskStore()
const route = useRoute()

const refreshHeaderTaskCounts = async () => {
  try {
    await store.refreshTasks()
  } catch (error) {
    console.error('Failed to refresh header task counts:', error)
  }
}

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768

  if (!isMobile.value) {
    dropdownIsOpen.value = false
  }
}

const toggleDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const dropdownEl = dropdownRef.value?.rootRef
  if (dropdownIsOpen.value && dropdownEl && !dropdownEl.contains(event.target as Node)) {
    dropdownIsOpen.value = false
  }
}

onMounted(() => {
  refreshHeaderTaskCounts()
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="w-full">
    <nav
      class="sticky top-0 w-full bg-gradient-to-r from-cyan-800 to-emerald-700 text-amber-50"
      role="navigation"
    >
      <ul v-if="!isMobile" class="flex flex-wrap pl-4">
        <li v-for="link in LINKS" :key="link.id">
          <RouterLink
            class="flex px-3 py-2 hover:bg-emerald-600 items-center gap-1 font-medium cursor-pointer transform active:scale-95"
            :to="link.url"
            :aria-current="route.path === link.url ? 'page' : 'undefined'"
            :class="{ 'bg-emerald-500 text-white': route.path === link.url }"
          >
            {{ link.nameToPage }}
            <BaseCircleNotification
              v-if="link.nameToPage === 'Home'"
              :badge-display="store.defaultTasks.length"
              :aria-label="`Count ${store.defaultTasks.length}`"
              :role="'status'"
            />
            <BaseCircleNotification
              v-else-if="link.nameToPage === 'Completed Task'"
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
      <div v-if="isMobile" class="flex justify-end">
        <BaseButton
          :btn-type="TRANSPARENT"
          class="flex p-2 text-white cursor-pointer"
          @click.stop="toggleDropdown"
        >
          <Bars3Icon v-if="!dropdownIsOpen" class="h-6 w-6" aria-hidden="true" />
          <XMarkIcon v-else class="h-6 w-6" aria-hidden="true" />
        </BaseButton>
      </div>
    </nav>
    <div>
      <TheHeaderDropdown
        v-if="isMobile && dropdownIsOpen"
        :links="LINKS"
        class="absolute right-0 top-10 z-10 bg-white"
        ref="dropdownRef"
        @close-dropdown="dropdownIsOpen = false"
      />
    </div>
  </header>
</template>
