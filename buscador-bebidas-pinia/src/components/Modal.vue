<script setup>
import { computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useModalStore } from "../stores/modal"
import { useRecetaStore } from '@/stores/recetas';
import { useFavoritosStore } from '@/stores/favoritos';

const store = useModalStore()
const recetaStore = useRecetaStore()
const favoritoStore = useFavoritosStore()

const ingredientesByMedidas = () => {
  const ingredientes = []
  for (let i = 1; i < 16; i++) {
    if (recetaStore.receta[`strIngredient${i}`]) {
      ingredientes.push({
        medida: recetaStore.receta[`strMeasure${i}`],
        ingrediente: recetaStore.receta[`strIngredient${i}`]
      })
    }
  }
  return ingredientes
}


const addToogleFavorites = () => {
  const { idDrink, strDrinkThumb, strDrink } = recetaStore.receta
  const newFavorito = {
    idDrink,
    strDrinkThumb,
    strDrink
  }
  favoritoStore.addFavorite(newFavorito)
  store.closeModal()
}

const existFavorite = computed(() => favoritoStore.isAddFavorite(recetaStore.receta.idDrink))


</script>
<template>
  <TransitionRoot appear :show="store.isOpen" as="template">
    <Dialog as="div" @close="store.closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-2xl text-center font-medium leading-6 text-gray-900">
                {{ recetaStore.receta.strDrink }}
              </DialogTitle>
              <div class="my-4">
                <img class="rounded-md" :src="recetaStore.receta.strDrinkThumb"
                  :alt="'imagen de receta' + recetaStore.receta.idDrink">
              </div>

              <div class="my-4 space-y-3">
                <div class="flex justify-between">
                  <DialogTitle as="h4" class="text-xl font-medium leading-6 text-gray-900">
                    Instrucciones
                  </DialogTitle>
                  <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{{
                    recetaStore.receta.strCategory }}</span>
                </div>
                <p class="text-sm text-gray-500">
                  {{ recetaStore.receta.strInstructions }}
                </p>
              </div>

              <div class="my-4 space-y-3">
                <DialogTitle as="h4" class="text-lg font-medium leading-6 text-gray-900">
                  Ingredientes y Medidas
                </DialogTitle>
                <div
                  v-html="ingredientesByMedidas().map((ingrediente) => `${ingrediente.medida} - ${ingrediente.ingrediente}`).join(' , ')">
                </div>
              </div>

              <div class="mt-4 flex justify-center gap-5">
                <button type="button"
                  :class="existFavorite ? 'text-orange-600 hover:bg-orange-200 bg-orange-100 focus-visible:ring-orange-500' : 'text-blue-900 hover:bg-blue-200 bg-blue-100 focus-visible:ring-blue-500'"
                  class="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                  @click="addToogleFavorites">
                  {{ existFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
                </button>
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="store.closeModal">
                  cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>