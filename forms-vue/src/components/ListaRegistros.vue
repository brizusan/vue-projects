<script setup>
import { formatDate } from "../utils"

defineProps(['datosRegistrados'])
const emit = defineEmits(['delete-registro', 'update-register'])

</script>
<template>
  <section>
    <h2>
      <span class="text-indigo-400 text-xl font-bold">Seguimiento de Registro de Datos</span>
    </h2>

    <p v-if="datosRegistrados.length === 0" class="mt-8 text-center text-xl font-bold text-red-400">No tenemos aun datos
      registrados</p>

    <div v-else class="my-8 grid grid-cols-1 gap-2">
      <div v-for="registro in datosRegistrados" class="bg-white rounded-md shadow-md p-4">
        <p class="text-right text-lg font-semibold text-blue-600 tracking-wide">cita registrada : {{
          formatDate(registro.fecha) }}</p>
        <p class="text-gray-800 font-semibold">Nombre : <span>{{ registro.nombre }}</span></p>
        <p class="text-gray-800 font-semibold">Correo : <span>{{ registro.email }}</span></p>
        <p class="text-gray-800 font-semibold">asunto : <span>{{ registro.asunto }}</span></p>

        <div class="flex justify-center mt-4 gap-8">
          <button @click="emit('delete-registro', registro.id)"
            class="w-120 bg-red-500  hover:bg-red-400 text-white px-4 rounded-md py-1">Eliminar</button>
          <button @click="emit('update-register', registro.id)"
            class="w-120 bg-blue-500 hover:bg-blue-400 text-white px-4 rounded-md py-1">Editar</button>
        </div>
      </div>
    </div>
  </section>
</template>