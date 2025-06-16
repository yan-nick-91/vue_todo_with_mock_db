<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { DANGER, SUCCESS, TRANSPARENT } from '@/const/base-types'
import { invalidInput } from '@/errors/task-error-handler'
import { generateBulletItemId } from '@/util/value-generator'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'
import type { BulletItem } from '@/interface/BulletItem'
import { BULLET_ITEM_LIST_IN_TASK_IS_EMPTY } from '@/const/task'

defineProps({
  bulletList: {
    type: Array as PropType<BulletItem[]>,
  },
})

const emit = defineEmits(['addBulletItem', 'removeBulletItem'])

const itemForBulletListInput = ref('')
const bulletInputError = ref('')

const addItemToBulletList = () => {
  if (!itemForBulletListInput.value.trim()) {
    bulletInputError.value = invalidInput('Input field to add a bullet should not be empty').message
    return
  }

  emit('addBulletItem', {
    id: generateBulletItemId(),
    bulletItem: itemForBulletListInput.value.trim(),
    itemIsFinished: false,
  })
  itemForBulletListInput.value = ''
  bulletInputError.value = ''
}

const removeBulletItem = (id: string) => emit('removeBulletItem', id)
</script>

<template>
  <BaseContainer class="w-[100%] my-2">
    <BaseContainer
      data-id="bulletList"
      class="w-[100%] mb-2 min-h-[10%] max-h-[10%] bg-gray-100"
      is-bordered
    >
      <div v-if="bulletList!.length > BULLET_ITEM_LIST_IN_TASK_IS_EMPTY">
        <ul>
          <li v-for="item in bulletList" :key="item.id" class="flex items-center gap-2 py-1 px-2">
            <span class="flex-grow">
              {{ item.bulletItem }}
            </span>
            <span>
              <BaseButton
                :btn-type="TRANSPARENT"
                class="cursor-pointer text-red-500 hover:text-red-600 transform active:scale-95"
                type="button"
                @click="removeBulletItem(item.id)"
                ><XMarkIcon class="h-7 w-7 mt-2"
              /></BaseButton>
            </span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="p-2 text-gray-500">Nothing added yet.</p>
      </div>
    </BaseContainer>
    <div>
      <input
        :class="`border p-1 mb-2 w-[100%] ${bulletInputError ? 'border-red-500 bg-red-200' : ''}`"
        type="text"
        id="bulletItemInput"
        placeholder="Add Item to list (Optional)..."
        v-model="itemForBulletListInput"
        @input="bulletInputError = ''"
      />
    </div>
    <div class="mb-1 min-h-[1.5rem]">
      <BaseMessageDisplay v-if="bulletInputError" :type="DANGER" :message="bulletInputError" />
    </div>
    <BaseButton
      :btn-type="SUCCESS"
      class="cursor-pointer p-2 rounded transform active:scale-95"
      @click="addItemToBulletList"
      type="button"
      >Add item</BaseButton
    >
  </BaseContainer>
</template>
