<script setup>
import { ref, reactive} from "vue";
import CriptoResult from "./components/CriptoResult.vue";
import Alerta from "./components/Alerta.vue";
import Spinner from "./components/Spinner.vue";
import { useCripto } from "./composables/useCripto"
import { usePrice } from "./composables/usePrice"
import { monedas } from "./data";

const currencies = ref(monedas);
const { criptos } = useCripto()
const { data,
  getCryptoCompareData,
  resultData,
  isDataResult, spinner } = usePrice()

const alerta = reactive({
  tipo: "",
  text: "",
})


const getDataSelected = (e) => {
  data[e.target.name] = e.target.value;
}

const onSubmit = () => {

  if (Object.values(data).includes("")) {
    alerta.text = "Todos los campos son obligatorios";
    alerta.tipo = "error";
    return;
  }
  alerta.text = "consultando..";
  alerta.tipo = "exito";

  getCryptoCompareData();

  setTimeout(() => {
    alerta.text = "";
    alerta.tipo = "";
    data.moneda = "";
    data.cripto = "";

  }, 500);
}


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">
      <form @submit.prevent="onSubmit" class="formulario">
        <Alerta v-if="alerta.tipo">
          <small>{{ alerta.text }}</small>
        </Alerta>
        <div class="campo">
          <label for="moneda">Moneda : </label>
          <select name="moneda" id="moneda" :value="data.moneda" @change="getDataSelected($event)">
            <option value=""> --- Seleccione --- </option>
            <option v-for="moneda in currencies" :key="moneda.codigo" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">CriptoMoneda : </label>
          <select name="cripto" id="cripto" v-model="data.cripto">
            <option value=""> --- Seleccione --- </option>
            <option v-for="cripto in criptos" :key="cripto.id" :value="cripto.CoinInfo.Name">
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>

      <Spinner v-if="spinner" />

      <CriptoResult v-if="isDataResult" :resultData="resultData" />
    </div>
  </div>
</template>

<style scoped>
select {
  width: 100%;
  text-align: center;
}
</style>
