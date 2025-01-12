<script setup>
import { reactive } from "vue"
import Alerta from "./Alerta.vue"

const props = defineProps({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  asunto: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  isEdit: {
    type: Boolean
  }

})

const emit = defineEmits(['guardarRegistro', 'update:nombre', 'update:email', 'update:asunto', 'update:fecha'])

const alerta = reactive({
  tipo: '',
  mensaje: ''
})

const registrarDatos = () => {

  if (Object.values(props).includes('')) {
    alerta.tipo = 'error'
    alerta.mensaje = 'Todos los campos son obligatorios'
    return
  }
  alerta.tipo = 'success'
  alerta.mensaje = 'Registro exitoso'

  setTimeout(() => {
    alerta.tipo = ''
    alerta.mensaje = ''

    emit('guardarRegistro')
  }, 1500);

}


</script>

<template>
  <form @submit.prevent="registrarDatos"
    class="space-y-4 mt-8 bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 max-w-[600px]">

    <Alerta v-if="alerta.mensaje" :alerta="alerta" />

    <div class="flex flex-col gap-1 ">
      <label class=" text-xl font-semibold" for="name">Nombre:</label>
      <input :value="nombre" @input="$emit('update:nombre', $event.target.value)"
        class="border  py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        type="text" id="name" placeholder="Ingrese su nombre">
    </div>
    <div class="flex flex-col gap-1 ">
      <label class=" text-xl font-semibold" for="email">Email:</label>
      <input :value="email" @input="$emit('update:email', $event.target.value)"
        class="border  py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        type="email" id="email" placeholder="Ingrese su correo electronico">
    </div>

    <div class="flex flex-col gap-1 ">
      <label class=" text-xl font-semibold" for="fecha">Fecha:</label>
      <input :value="fecha" @input="$emit('update:fecha', $event.target.value)"
        class="border  py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        type="date" id="fecha">
    </div>

    <div class="flex flex-col gap-1 ">
      <label class=" text-xl font-semibold" for="asunto">Asunto:</label>
      <textarea rows="3" @input="$emit('update:asunto', $event.target.value)" :value="asunto"
        class="border resize-none  py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        type="" id="asunto" placeholder="Asunto o tema de registro" />
    </div>
    <div class="w-2/3 mx-auto">
      <input
        :class="[isEdit ? 'bg-orange-500 hover:bg-orange-400 focus:ring-orange-600' : 'hover:bg-indigo-700 bg-indigo-600 focus:ring-indigo-400']"
        class="border  py-2 px-5  cursor-pointer  text-white w-full rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
        type="submit" :value="[isEdit ? 'Actualizar Registro' : 'Registrar Datos']">
    </div>
  </form>
</template>