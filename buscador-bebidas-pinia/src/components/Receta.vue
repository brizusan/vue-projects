<script setup>
import { useModalStore } from '@/stores/modal';
import { useRecetaStore } from '@/stores/recetas';

const props = defineProps({
  bebida: {
    type: Object,
    required: true
  }
})

const recetas = useRecetaStore()
const storeModal = useModalStore()

const mostrarReceta = () => {
  recetas.getReceta(props.bebida.idDrink)
  setTimeout(() => {
    storeModal.openModal()
  },300)
}


</script>
<template>
  <div class="border rounded-lg shadow bg-white space-y-3 pb-3">
    <div class="overflow-hidden rounded-t-lg">
      <img class="w-full  hover:scale-105 hover:rotate-2 transition-all" :src="bebida.strDrinkThumb"
        :alt="'bebida ' + bebida.idDrink">
    </div>
    <div>
      <h2 class="text-2xl font-semibold my-2 text-center truncate">{{ bebida.strDrink }}</h2>
      <div class="flex justify-center p-3">
        <button @click="mostrarReceta"
          class="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md">
          Ver Receta
        </button>
      </div>
    </div>
  </div>
</template>