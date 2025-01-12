<script setup>
import {computed} from "vue"

const props = defineProps({
  alerta: {
    type: Object,
    required: true
  }
})

const isError = computed(() => props.alerta.tipo === 'error')

</script>
<template>
 <div 
  :class="[isError ? 'bg-red-400' : 'bg-green-400']"
  class="text-center text-white font-semibold rounded-sm py-1"
  >
    {{ props.alerta.mensaje }}
 </div>
</template>