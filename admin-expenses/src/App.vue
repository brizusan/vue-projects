<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import ControlGastos from "./components/ControlGastos.vue";
import Modal from "./components/Modal.vue";

const modal = ref(false);
const presupuesto = ref(0);
const filtro = ref("");
const disponible = ref(0);
const gastos = ref([]);

const gasto = reactive({
  id: null,
  nombre: "",
  cantidad: 0,
  categoria: "",
  fecha: "",
});

watch(presupuesto, () => {
  guardarStorage();
});

watch(
  gastos,
  () => {
    const totalDisponible = presupuesto.value - totalGastos.value;
    disponible.value = totalDisponible;
    guardarStorage();
  },
  { deep: true }
);

const totalGastos = computed(() =>
  gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0)
);

onMounted(() => {
  const presupuestoStorage = JSON.parse(localStorage.getItem("presupuesto"));
  const disponibleStorage = JSON.parse(localStorage.getItem("disponible"));
  const gastosStorage = JSON.parse(localStorage.getItem("gastos"));
  if (presupuestoStorage) {
    presupuesto.value = presupuestoStorage;
    disponible.value = disponibleStorage;
    gastos.value = gastosStorage;
  }
});

const guardarStorage = () => {
  localStorage.setItem("presupuesto", JSON.stringify(presupuesto.value));
  localStorage.setItem("disponible", JSON.stringify(disponible.value));
  localStorage.setItem("gastos", JSON.stringify(gastos.value));
};

const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
};

const crearGasto = () => {
  modal.value = true;
};

const añadirGasto = (data) => {

  if(gasto.id){ 
   const index = gastos.value.findIndex(item => item.id === gasto.id)
   gastos.value[index] = {...data , id: gasto.id , fecha:gasto.fecha}
  }else{
    const newGasto = { ...data, id: crypto.randomUUID(), fecha: Date.now() };
    gastos.value.push(newGasto);
  }
  resetFormularioGasto();
};

const cerrarModal = () => {
  modal.value = false;
  resetFormularioGasto();
};

const resetFormularioGasto = () => {
  Object.assign(gasto, {
    id: null,
    nombre: "",
    cantidad: 0,
    categoria: "",
    fecha: Date.now(),
  });
};

const resetApp = () => {
  const confirma = confirm("Deseas resetear la app?");
  if (!confirma) return;
  presupuesto.value = 0;
  disponible.value = 0;
  gastos.value = [];
};

const editGasto = (id) => {
  const gastoEditar = gastos.value.find((gasto) => gasto.id === id);
  Object.assign(gasto, gastoEditar);
  modal.value = true;
};

const deleteGasto = (id) => {
  const newGastos = gastos.value.filter((gasto) => gasto.id !== id);
  gastos.value = newGastos;
};


const gastosFiltrados = computed(() => {
  if (filtro.value) {
    return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
  }
  return gastos.value;
});

const isEdit = computed(() => gasto.id !== null);
</script>

<template>
  <header>
    <h1>Control de Gastos | <span>Vue</span></h1>
    <div class="contenedor contenedor-header sombra">
      <Presupuesto
        v-if="presupuesto === 0"
        @definir-presupuesto="definirPresupuesto"
      />

      <ControlPresupuesto
        v-else
        :presupuesto="presupuesto"
        :disponible="disponible"
        :totalGastos="totalGastos"
        @reset-app="resetApp"
      />
    </div>
  </header>



  <ControlGastos
    v-if="presupuesto !== 0"
    :gastos="gastosFiltrados"
    :totalGastos="totalGastos"
    v-model:filtro="filtro"
    @delete-gasto="deleteGasto"
    @edit-gasto="editGasto"
    

  />

  <button
    v-if="presupuesto !== 0"
    @click="crearGasto"
    type="button"
    class="nuevo-gasto"
  >
    <img src="./assets/img/nuevo-gasto.svg" alt="button nuevo gasto" />
  </button>

  <Modal
    v-if="modal"
    @cerrar-modal="cerrarModal"
    v-model:nombre="gasto.nombre"
    v-model:cantidad="gasto.cantidad"
    v-model:categoria="gasto.categoria"
    @añadir-gasto="añadirGasto"
    :isEdit="isEdit"
    :disponible="disponible"
  />
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #ffffff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2rem;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  transform: translateY(5rem);
  background-color: var(--blanco);
  padding: 3.5rem;
  max-width: 65rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
}

.nuevo-gasto {
  position: fixed;
  bottom: 4rem;
  right: 2.5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--azul);
  color: var(--blanco);
  font-size: 3rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.1s ease-in;
}

.nuevo-gasto:hover {
  background-color: #fd6a02;
}
</style>
