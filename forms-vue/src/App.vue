<script setup>
import { reactive, ref, onMounted, watch, computed } from 'vue';
import Formulario from "./components/Formulario.vue"
import ListaRegistros from "./components/ListaRegistros.vue"

const datosRegistrados = ref([])

const registro = reactive({
  id: null,
  nombre: '',
  email: '',
  fecha: '',
  asunto: ''
});

watch(datosRegistrados, () => {
  registerStorage()
}, {
  deep: true,
})


onMounted(() => {
  const data = localStorage.getItem('datosRegistrados')
  if (data) {
    datosRegistrados.value = JSON.parse(data)
  }
})

const registerStorage = () => localStorage.setItem('datosRegistrados', JSON.stringify(datosRegistrados.value))


const guardarRegistro = () => {

  const { id } = registro
  if (isRegister(id)) {
    console.log('actualizar registro')
    const index = datosRegistrados.value.findIndex(registro => registro.id === id)
    datosRegistrados.value[index] = { ...registro }

  } else {
    const newRegistro = { ...registro, id: crypto.randomUUID() }
    datosRegistrados.value.push(newRegistro)
  }
  resetRegistro()
}

const deleteRegistro = (id) => {
  datosRegistrados.value = datosRegistrados.value.filter(registro => registro.id !== id)
  alert(' Eliminando Registro')
}

const updateRegister = id => {
  const data = datosRegistrados.value.find(registro => registro.id === id)
  Object.assign(registro, data)
}

const resetRegistro = () => {
  Object.assign(registro, {
    id: null,
    nombre: '',
    email: '',
    fecha: '',
    asunto: ''
  })
}

const isRegister = id => datosRegistrados.value.find(registro => registro.id === id)

const isEdit = computed(() => registro.id !== null)

</script>

<template>
  <h1 class="text-3xl lg:text-5xl font-bold underline text-center py-10">Registo de Datos - <span
      class="text-indigo-300">Vue</span></h1>

  <main class="container mx-auto w-5/6 lg:w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 py-12">
    <section>
      <h2>
        <span class="text-indigo-400 text-xl font-bold">Formulario de Registro de Datos</span>
      </h2>

      <Formulario v-model:nombre="registro.nombre" v-model:email="registro.email" v-model:fecha="registro.fecha"
        v-model:asunto="registro.asunto" @guardarRegistro="guardarRegistro" :isEdit="isEdit" />
    </section>

    <ListaRegistros :datosRegistrados="datosRegistrados" @delete-registro="deleteRegistro"
      @update-register="updateRegister" />
  </main>
</template>
