<script setup>
import { useFavoritosStore } from '@/stores/favoritos';
import Titulo from '../components/ui/Titulo.vue'
import Receta from '../components/Receta.vue'


defineProps(['title'])

const favoritos = useFavoritosStore()


</script>
<template>
  <Titulo>
    {{ title }}
  </Titulo>

  <section v-if="!favoritos.isEmpty" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-12">
    <Receta v-for="bebida in favoritos.favoritos" :key="bebida.idDrink" :bebida="bebida" />
  </section>

  <h3 v-else class="text-center text-3xl py-10 text-gray-700 tracking-widest">No tenemos bebidas favorita aun</h3>

</template>