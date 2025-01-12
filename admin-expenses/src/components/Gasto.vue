<script setup>
import { formatCurrency, formatDate } from "../utils"

import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}


const props = defineProps({
  gasto: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['delete-gasto', 'edit-gasto'])



</script>
<template>
  <div class="card-gasto">
    <div class="card-img">
      <img :src="diccionarioIconos[gasto.categoria]" alt="imagen de categoria" />
    </div>
    <div class="contenido">
      <p class="contenido-categoria">{{ gasto.categoria }}</p>
      <p @click="emits('edit-gasto')" class="contenido-nombre">{{ gasto.nombre }}</p>
      <p class="contenido-fecha">fecha: <span class="fecha">{{ formatDate(gasto.fecha) }}</span></p>
    </div>
    <p class="precio">{{ formatCurrency(gasto.cantidad) }}</p>

    <button @click="emits('delete-gasto')" class="btn-eliminar">
      x
    </button>
  </div>
</template>
<style scoped>
.card-gasto {
  background-color: var(--blanco);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: "imagen contenido precio";
  align-items: center;
  gap: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.card-img {
  grid-area: imagen;
  max-width: 15rem;
}

.card-img img {
  width: 80%;
  object-fit: contain;
}

.contenido-categoria {
  font-weight: 900;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: var(--gris);
  letter-spacing: 2px;
}

.contenido-nombre {
  font-size: 2.2rem;
  text-transform: capitalize;
  color: var(--gris-oscuro);
  font-weight: 700;

}

.contenido-nombre:hover {
  color: var(--azul);
  cursor: pointer;
}

.contenido-fecha {
  font-weight: 900;
  font-size: 1.7rem;
  text-transform: uppercase;
  color: var(--gris-oscuro);
  letter-spacing: 2px;
}

.contenido-fecha .fecha {
  font-weight: 700;
  color: var(--gris);
  font-size: 1.7rem;
}

.precio {
  font-weight: 900;
  font-size: 2.2rem;
  text-align: right;
  color: var(--azul);
}

.btn-eliminar {
  color: #000;
  border: none;
  font-weight: 900;
  font-size: 3rem;
  cursor: pointer;
  background-color: transparent;
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transition: color .2s ease-in;
}

.btn-eliminar:hover {
  color: red;
}
</style>