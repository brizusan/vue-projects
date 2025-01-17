<script setup>
import { RouterView } from "vue-router"
import Navegacion from "./components/Navegacion.vue"

</script>

<template>
  <header class="py-12 bg-sky-400">
    <h1 class="text-3xl text-center text-white font-bold uppercase tracking-wider">REST Router Clientes | VUE</h1>
  </header>
  <Navegacion />
  <main
    class="max-w-screen-xl w-11/12 lg:w-full mx-auto px-4 sm:px-6 lg:px-8 my-12 "
  >
    <RouterView />
  </main>

</template>
