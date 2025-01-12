<script setup>
import { computed } from "vue";
import Gasto from "./Gasto.vue";

const props = defineProps({
  gastos: {
    type: Array,
    required: true,
  },
  filtro: {
    type: String,
    required: true,
  },
  totalGastos: {
    type: Number,
    required: true
  }
});



const emits = defineEmits(["delete-gasto", "edit-gasto" ,'update:filtro' ]);

const isEmpty = computed(() => props.gastos.length === 0);

</script>

<template>
  <main class="seccion-gastos">
    
    <div
      v-if="totalGastos > 0" 
      class="filtros">
        <label for="filtro">Filtrar</label>
        <select 
          :value="props.filtro"
          @change="$emit('update:filtro', $event.target.value)"
          class="select-filtro" name="filtro" id="filtro">
          <option value="">Todos</option>
          <option value="ahorro">Ahorro</option>
          <option value="comida">Comida</option>
          <option value="casa">Casa</option>
          <option value="gastos">Gastos varios</option>
          <option value="ocio">Ocio</option>
          <option value="salud">Salud</option>
          <option value="suscripciones">Suscripciones</option>
        </select>
      </div>
    <h2 v-if="isEmpty" class="title-m">No tenemos gastos registrados</h2>
    <div v-else class="contenedor">
      <h2 class="title">Listado de Gastos</h2>


      <section class="listado-gastos">
        <Gasto
          v-for="gasto in gastos"
          :key="gasto.id"
          :gasto="gasto"
          @delete-gasto="emits('delete-gasto', gasto.id)"
          @edit-gasto="emits('edit-gasto', gasto.id)"
        />
      </section>
    </div>
  </main>
</template>
<style scoped>
.seccion-gastos {
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.title {
  color: var(--gris-oscuro);
  font-size: 4rem;
}

.title-m {
  color: var(--gris-oscuro);
  font-size: 3rem;
  text-align: center;
}

.filtros {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 60rem;
  margin-inline: auto;
  width: calc(100% - 4rem);
}

.filtros label {
  color: var(--gris-oscuro);
  font-size: 2rem;
  font-weight: 700;
}

.select-filtro {
  flex: 1;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right center;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
}

.listado-gastos {
  margin-top: 2.5rem;
  display: grid;
  gap: 1.25rem;
}
</style>
