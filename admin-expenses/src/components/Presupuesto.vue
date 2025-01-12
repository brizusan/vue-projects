<script setup>
import { ref, reactive } from "vue"
import Alerta from "./Alerta.vue"

const presupuesto = ref(0)
const alerta = reactive({
  mostrar: false,
  msg: '',
})

const emitter = defineEmits(['definir-presupuesto'])

const definirPresupuesto = () => {
  if (presupuesto.value <= 0) {
    alerta.msg = "El presupuesto debe ser mayor a 0"
    alerta.mostrar = true
    
    setTimeout(() => {
      alerta.mostrar = false
      alerta.msg = ''
    }, 2000)
    return
  }
  
  if (isNaN(presupuesto.value)) {
    alerta.msg = "El presupuesto debe ser un numero"
    alerta.mostrar = true
    
    setTimeout(() => {
      alerta.mostrar = false
      alerta.msg = ''
    }, 2000)

    return
  }
  
  emitter('definir-presupuesto', presupuesto.value)

}


</script>
<template>
  <form @submit.prevent="definirPresupuesto" class="formulario">
    <Alerta v-if="alerta.mostrar">
      <small>{{ alerta.msg }}</small>
    </Alerta>
    <div class="campo">
      <label for="presupuesto">Definir presupuesto</label>
      <input v-model="presupuesto" type="number" id="presupuesto" placeholder="Añade tu presupuesto" />
    </div>

    <input type="submit" value="Definir presupuesto inicial">
  </form>
</template>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.campo label {
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--azul);
}

input[type="number"] {
  border: 1px solid var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem 4rem;
  outline: none;
  font-size: 1.75rem;
  background-color: var(--gris-claro);
  text-align: center;
}

input[type="number"]:focus {
  border: 2px solid var(--azul);
}


input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  font-weight: 900;
  text-transform: uppercase;
  outline: none;
  border: none;

  transition: all 0.3s ease-in-out;
}

input[type="submit"]:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>