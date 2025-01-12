<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { formatCurrency } from "../utils";


const props = defineProps({
  presupuesto: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Number,
    required: true,
  },
  totalGastos: {
    type: Number,
    required: true,
  },
});

defineEmits(["reset-app"]);
</script>
<template>
  <div class="dos-columnas">
    <circle-progress class="grafico" :percent="(totalGastos / presupuesto) * 100" :show-percent="true" />

    <div class="contenedor-admin">
      <button @click="$emit('reset-app')" type="button" class="reset-app">
        Resetear App
      </button>

      <div>
        <h2>
          Presupuesto :
          <span class="currency">{{ formatCurrency(presupuesto) }}</span>
        </h2>
        <h2>
          Gastado :
          <span class="currency">{{ formatCurrency(totalGastos) }}</span>
        </h2>
        <h2>
          Disponible :
          <span class="currency"> {{ formatCurrency(disponible) }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dos-columnas {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
}

.grafico {
  width: 40%;
}

.grafico img {
  width: 100%;
  object-fit: cover;
}

.contenedor-admin {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.contenedor-admin h2 {
  color: var(--azul);
}

.reset-app {
  background-color: #ff1a02;
  color: var(--blanco);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: none;

  transition: background-color 0.3s ease;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #fd6a02;
}

.currency {
  color: var(--gris);
}

.grafico{
  position: relative;
  font-size: 2.5rem;
  color: var(--gris-oscuro);
  font-weight: 700;
}

.grafico::after{
  content: "%";
  position: absolute;
  top: 50%;
  right: 28%;
  transform: translateY(-50%);
}




</style>
