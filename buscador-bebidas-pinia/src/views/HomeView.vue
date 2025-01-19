<script setup>
import Receta from "@/components/Receta.vue"
import Titulo from "../components/ui/Titulo.vue"
import { useBebidasStore as useBebidas } from "../stores/bebidas"

defineProps(['title'])
const store = useBebidas()

</script>

<template>
  <Titulo>
    {{ !store.isEmpty ? 'Lista de Bebidas' : title }}
  </Titulo>

  <section v-if="!store.isEmpty" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-12">
    <Receta v-for="bebida in store.bebidas" :key="bebida.idDrink" :bebida="bebida" />
  </section>

  <h3 v-else class="text-center text-3xl py-10 text-gray-700 tracking-widest">No tenemos una lista de bebidas</h3>

</template>
