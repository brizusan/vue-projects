<script setup>
import { computed , reactive , ref } from 'vue'
import {useRoute } from "vue-router"
import Navegacion from './Navegacion.vue'
import Alerta from "./ui/Alerta.vue"
import {useBebidasStore as useBebidas} from "../stores/bebidas"

const route = useRoute()
const store = useBebidas()

const isFavorites = computed(() => route.name === 'favorites')

const alerta = ref({})
const data = reactive({
  ingredient: '',
  category: ''
})

const onSubmit = async() => {

  if(Object.values(data).includes('')) {
    return alerta.value = {
      msg: 'Todos los campos son obligatorios',
      tipo: 'error'
    }
  }

  await store.getBebidas(data.ingredient, data.category)
  resetData()
  alerta.value = {}
}

const resetData = () => {
  data.ingredient = ''
  data.category = ''
}


</script>
<template>
  <header 
    :class="!isFavorites && 'fondo'"
    class="bg-gradient-to-b from-slate-600 to-gray-900">
    <div class="mx-auto container px-6 py-12">
      <Navegacion />
      <form
        v-if="!isFavorites"
        @submit.prevent="onSubmit"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-20 p-6 rounded-lg shadow space-y-2">
        
        <Alerta v-if="alerta.msg" :msg="alerta.msg" :tipo="alerta.tipo" />
        <div class="space-y-2">
          <label for="ingredient" class="text-slate-800 uppercase font-bold ">Busqueda por ingrediente</label>
          <input id="ingredient" type="text" class="w-full p-3 text-sm bg-white rounded-lg border border-gray-200"
            placeholder="Search for a ingredient..." v-model="data.ingredient" />
        </div>
        <div class="space-y-2">
          <label for="categories" class="text-slate-800 uppercase font-bold ">Categorias</label>
          <select name="categories" id="categories" v-model="data.category"
            class="block w-full p-3 text-sm bg-white rounded-lg border border-gray-200 text-center font-semibold">
            <option value=""> --- Seleccione una categoría --- </option>
            <option v-for="categoria in store.categorias" :value="categoria.strCategory">{{categoria.strCategory}}</option>
          </select>
        </div>

        <div class="flex justify-center pt-3">
          <input
            class="py-2 px-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:cursor-pointer hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800" 
            type="submit" value="Buscar Receta">
        </div>
      </form>
    </div>
  </header>
</template>
<style scoped>
.fondo {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
}

.fondo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
}
</style>
