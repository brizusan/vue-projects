<script setup>
import { ref, onMounted, computed } from "vue"
import Titulo from '../components/Titulo.vue'
import Cliente from '../components/Cliente.vue'
import { getClients , deleteClient , updateClienteState } from "../services"

defineProps({
  title: String
})

const clients = ref([])

onMounted(() => {
  obtenerClientes()
})

const obtenerClientes = async () => {
  try {
    const data = await getClients()
    clients.value = data
  } catch (error) {
    console.log(error)
  }
}

const isEmpty = computed(() => clients.value.length === 0)


const updateState = (id, state) => {
  const client = clients.value.find(client => client.id === id)
  updateClienteState(id, state)
  client.state = state
}

const eliminarCliente = id => {
  deleteClient(id)
  alert("El cliente se ha eliminado con exito")
  setTimeout(() => {
    clients.value = clients.value.filter(client => client.id !== id)
  }, 1200);
}


</script>
<template>
  <Titulo>
    {{ title }}
  </Titulo>

  <h3 v-if="isEmpty" class="text-3xl font-bold text-blue-900 text-center my-10">No tenemos clientes registrados</h3>
  
  <section v-else class="my-14">
    <div class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <Cliente 
                v-for="client in clients"
                :key="client.id"
                :client="client"
                @delete-client="eliminarCliente"
                @update-state="updateState"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>