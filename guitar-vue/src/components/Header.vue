<script setup>
import { computed } from 'vue';

const props = defineProps({
  carrito: {
    type: Array,
    required: true
  },
  guitar: {
    type: Object,
  }
})

defineEmits(['limpiar-carrito', 'agregar-carrito', 'remover-item', 'increase-item', 'decrease-item'])

const total = computed(() => {
  return props.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
})

</script>
<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div class="row justify-content-center justify-content-md-between">
        <div class="col-8 col-md-3">
          <a href="index.html">
            <img class="img-fluid" src="/img/logo.svg" alt="imagen logo">
          </a>
        </div>
        <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
          <div class="carrito">
            <img class="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

            <div id="carrito" class="bg-white p-3">
              <p v-if="carrito.length === 0" class="text-center m-0 ">El carrito esta vacio</p>
              <div v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-for="item in carrito" :key="item.id">
                    <tr>
                      <td>
                        <img class="img-fluid" :src="`/img/${item.imagen}.jpg`" alt="imagen guitarra">
                      </td>
                      <td>{{ item.nombre }}</td>
                      <td class="fw-bold">
                        ${{ item.precio }}
                      </td>
                      <td class="flex align-items-start gap-4">
                        <button @click="$emit('decrease-item', item.id)" type="button" class="btn btn-dark"
                          :class="{ 'disabled': item.cantidad <= 1 }">
                          -
                        </button>
                        {{ item.cantidad }}
                        <button @click="$emit('increase-item', item.id)" type="button" class="btn btn-dark">
                          +
                        </button>
                      </td>
                      <td>
                        <button @click="$emit('remover-item', item.id)" class="btn btn-danger" type="button">
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="text-end">Total pagar: <span class="fw-bold">{{total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</span></p>
                <button @click="$emit('limpiar-carrito')" type="button" class="btn btn-dark w-100 mt-3 p-2">Vaciar
                  Carrito</button>

              </div>
            </div>
          </div>
        </nav>
      </div><!--.row-->

      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">{{ guitar?.nombre }}</h1>
          <p class="mt-5 fs-5 text-white">{{ guitar?.descripcion }} </p>
          <p class="text-primary fs-1 fw-black">${{ guitar.precio }}</p>
          <button @click="$emit('agregar-carrito', guitar)" type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5">Agregar al Carrito</button>
        </div>
      </div>
    </div>

    <img class="header-guitarra" src="/img/header_guitarra.png" alt="imagen header">
  </header>
</template>
