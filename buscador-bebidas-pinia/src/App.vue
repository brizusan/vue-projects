<script setup>
import {  RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
import Notificacion from './components/ui/Notificacion.vue'
</script>

<template>
  <Header />
  <main class="max-w-7xl mx-auto w-11/12 lg:w-5/6 xl:w-full mt-10">
    <RouterView />
  </main>
  <Modal />
  <Notificacion />
</template>
