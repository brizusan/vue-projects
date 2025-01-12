<script setup>
import {  reactive } from "vue"
import { categorias } from "../data/categorias"

const props = defineProps({
  nombre: String,
  cantidad: Number,
  categoria: String,
  disponible: Number,
  isEdit: Boolean
})
const alerta = reactive({
  tipo: '',
  msg: ''
})


const emit = defineEmits(['cerrar-modal', 'añadir-gasto', 'update:nombre', 'update:cantidad', 'update:categoria'])

const oldCantidad = props.cantidad


const generarGasto = () => {

  //validacion de campos vacios
  if (Object.values(props).includes('')) {
    alerta.tipo = 'error'
    alerta.msg = 'Todos los campos son obligatorios'
    return
  }

  if (isNaN(props.cantidad)) {
    alerta.tipo = 'error'
    alerta.msg = 'Cantidad no es un numero'
    return
  }

  if (props.cantidad <= 0) {
    alerta.tipo = 'error'
    alerta.msg = 'Cantidad tiene que ser mayor a 0'
    return
  }

  //validar gasto de lo disponible
  if(props.isEdit) {
    if (props.cantidad > (props.disponible + oldCantidad)) {
      alerta.tipo = 'error'
      alerta.msg = 'Presupuesto excedido'
      return
    }
  }else{
    if (props.disponible < props.cantidad) {
      alerta.tipo = 'error'
      alerta.msg = 'Presupuesto excedido'
      return
    }
  }

  if(props.isEdit) {
    alerta.tipo = 'success'
    alerta.msg = 'Gasto actualizado correctamente'
  }else{
    alerta.tipo = 'success'
    alerta.msg = 'Gasto creado correctamente'
  }

  setTimeout(() => {
    emit('añadir-gasto', { ...props })
    emit('cerrar-modal')
    alerta.msg = ''
    alerta.tipo = ''
  }, 1500);
}

</script>
<template>
  <div class="modal">
    <form @submit.prevent="generarGasto" class="formulario-nuevo-gasto">
      <legend class="titulo">{{isEdit ? 'Editar Gasto' : 'Nuevo Gasto'}}</legend>

      <div v-if="alerta.msg" :class="[alerta.tipo === 'error' ? 'alerta-gasto' : 'alerta-gasto-m']">
        {{ alerta.msg }}
      </div>

      <div class="campo">
        <label for="gasto">Nombre Gasto</label>
        <input :value="props.nombre" @input="$emit('update:nombre', $event.target.value)" type="text" id="gasto"
          placeholder="comida mascotas...">
      </div>
      <div class="campo">
        <label for="monto">Monto de Gasto</label>
        <input :value="props.cantidad" @input="$emit('update:cantidad', +$event.target.value)" type="number" id="monto"
          placeholder="500...">
      </div>
      <div class="campo">
        <label for="tipo">Categoria</label>
        <select :value="props.categoria" @input="$emit('update:categoria', $event.target.value)"
          class="select-categoria" name="tipo" id="tipo">
          <option value=""> --- Seleccione --- </option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div style="width: 80% ; margin: 0 auto; padding-top: 1rem;">
        <input class="cta-agregar" type="submit" :value="isEdit ? 'Actualizar Gasto' : 'Agregar Gasto'">
      </div>
    </form>

    <button @click="$emit('cerrar-modal')" class="cerrar-modal">
      <img src="../assets/img/cerrar.svg" alt="button cerrar modal">
    </button>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.cerrar-modal {
  position: fixed;
  top: 3rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  transition: background-color .1s ease-in;
  background-color: #00000000;
  border: none;
  transition: transform .2s ease-in;
}

.cerrar-modal:hover {
  transform: scale(1.1);
}

.formulario-nuevo-gasto {
  background-color: var(--blanco);
  padding: 3rem;
  border-radius: 1rem;
  ;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 65rem;
  margin-inline: auto;
  margin-top: 20rem;
  width: calc(100% - 6rem);
}

.titulo {
  font-size: 3rem;
  text-align: center;
  font-weight: 900;
  color: var(--azul);
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.campo label {
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--gris-oscuro);
}

input[type="text"],
input[type="number"] {
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--gris-claro);
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: var(--gris-oscuro);
}

.select-categoria {
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--gris-claro);
  font-weight: 700;
  font-size: 1.5rem;
}


.cta-agregar {
  background-color: var(--azul);
  color: var(--blanco);
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color .2s ease-in;
  width: 100%;
}

.cta-agregar:hover {
  background-color: #FD6A02;
}

.alerta-gasto {
  text-align: center;
  color: red;
  font-weight: 700;
}

.alerta-gasto-m {
  text-align: center;
  color: green;
  font-weight: 700;
}
</style>