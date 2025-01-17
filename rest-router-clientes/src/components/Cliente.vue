<script setup>
import { computed } from "vue"
import {RouterLink} from "vue-router"
import { InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  client: Object
})

const emit = defineEmits(["delete-client" , "update-state"])


const isActive = computed(() => props.client.state === 1 ? "Activo" : "Inactivo")


</script>
<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ props.client.name }}</p>
      <p class="text-gray-500">{{ props.client.lastname }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ props.client.company }}</p>
      <p class="text-gray-600">{{ props.client.position }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button 
        @click="$emit('update-state', props.client.id, props.client.state === 1 ? 0 : 1)"
        :class="[isActive === 'Activo' ? 'activo' : 'inactivo']">
        {{ isActive }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
      <div class="flex gap-5 items-center">
        <RouterLink
          :to="{name: 'edit-client', params:{id: props.client.id} }"
        >
          <InfoCircleOutlined class="text-3xl text-sky-500 hover:text-sky-700 transition-colors" />
        </RouterLink>
        <button
          @click="$emit('delete-client', props.client.id)"
          >
          <CloseCircleOutlined class="text-3xl text-red-500 hover:text-red-700 transition-colors" />
        </button>

      </div>
    </td>
  </tr>
</template>

<style scoped>
.activo {
  @apply text-green-500 bg-green-200 px-4 py-1 rounded-full text-center w-[100px]
   hover:bg-green-300 hover:text-green-600
}

.inactivo {
  @apply text-red-500 bg-red-200 px-4 py-1 rounded-full text-center w-[100px]
  hover:bg-red-300 hover:text-red-600
}
</style>