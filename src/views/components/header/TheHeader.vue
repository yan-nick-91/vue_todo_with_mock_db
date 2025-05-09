<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LINKS } from '@/const/navigation'
</script>

<template>
  <header class="w-full">
    <nav class="sticky top-0 w-full bg-gradient-to-r from-cyan-800 to-emerald-700 text-amber-50">
      <ul class="flex flex-wrap pl-4">
        <li v-for="link in LINKS" :key="link.id">
          <RouterLink class="block px-3 py-2 hover:bg-emerald-600" :to="link.url">{{
            link.nameToPage
          }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
