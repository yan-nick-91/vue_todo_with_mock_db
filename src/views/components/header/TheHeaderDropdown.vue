<script setup lang="ts">
import type { NavItem } from '@/interface/NavItems'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseCircleNotification from '@/views/UI/BaseCircleNotification.vue'
import { type PropType, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { taskStore } from '@/stores/taskStore'

defineProps({
  links: {
    type: Array as PropType<NavItem[]>,
    required: true,
  },
})

const emit = defineEmits(['closeDropdown'])

const rootRef = ref<HTMLElement | null>(null)

defineExpose({ rootRef })

const store = taskStore()

const handleLinkClick = () => {
  emit('closeDropdown')
}
</script>

<template>
  <BaseContainer is-bordered>
    <div ref="rootRef">
      <ul>
        <li v-for="link in links" :key="link.id">
          <RouterLink
            class="flex px-3 py-2 hover:bg-emerald-600 items-center gap-1 font-medium cursor-pointer transform active:scale-95"
            :to="link.url"
            :aria-current="$route.path === link.url ? 'page' : 'undefined'"
            :class="{ 'bg-emerald-500 text-white': $route.path === link.url }"
            @click="handleLinkClick"
          >
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
            {{ link.nameToPage }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </BaseContainer>
</template>
