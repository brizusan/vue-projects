<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { db as data } from "./data"
import Guitar from './components/Guitar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// const state = reactive({
//   guitars: []
// })

const guitarras = ref([])
const carrito = ref([])
const guitar = ref({})


watch(carrito, () => {
  guardarStorage()
}, {
  deep: true
})


onMounted(() => {
  guitarras.value = data
  guitar.value = data[4]
  // state.guitars = data
  const carritoStorage = localStorage.getItem('carrito')
  if (carritoStorage) {
    carrito.value = JSON.parse(carritoStorage)
  }
})


const guardarStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

const agregarCarrito = (guitarra) => {

  if (isAdded(guitarra.id)) {
    alert('Articulo ya se encuentra en el carrito')
  } else {
    guitarra.cantidad = 1
    carrito.value.push(guitarra)
  }
}

const limpiarCarrito = () => {
  carrito.value = []
}

const removerItem = (id) => {
  carrito.value = carrito.value.filter(item => item.id !== id)
}

const isAdded = (id) => carrito.value.some(item => item.id === id)

const increaseItem = (id) => {
  const item = carrito.value.find(item => item.id === id)
  if (item.cantidad >= 5) return alert('No puedes agregar mas de 5 articulos')
  item.cantidad++
}

const decreaseItem = (id) => {

  const item = carrito.value.find(item => item.id === id)
  if (item.cantidad <= 1) {
    alert('Removiendo articulo del carrito')
    removerItem(id)
  }
  item.cantidad--
}


</script>

<template>

  <Header :carrito="carrito" :guitar="guitar" @limpiar-carrito="limpiarCarrito" @agregar-carrito="agregarCarrito"
    @remover-item="removerItem" @increase-item="increaseItem" @decrease-item="decreaseItem" />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitar v-for="guitarra in guitarras" :key="guitarra.id" :guitarra="guitarra" @agregar-carrito="agregarCarrito" />
    </div>
  </main>

  <Footer />

</template>
