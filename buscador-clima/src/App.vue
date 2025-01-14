<script setup>
import { ref } from "vue";
import Alerta from "./components/Alerta.vue";
import Spinner from "./components/Spinner.vue";
import ClimaResult from "./components/ClimaResult.vue";
import { useClima } from "./composables/useClima";
import { useCountries } from "./composables/useCountries";

const { clima , busqueda, getClimaData  , isDataClima , spinner } = useClima()
const { countries } = useCountries()

const alerta = ref("");
const onSubmit = () => {
  if (Object.values(busqueda).includes("")) {
    alerta.value = "Todos los campos son obligatorios";
    return;
  }

  alerta.value = "";
  setTimeout(() => {
    getClimaData();
  }, 1000);

};

</script>

<template>
  <h1 class="title">Buscador Clima</h1>
  <main class="container">
    <section>
      <form @submit.prevent="onSubmit" class="formulario">
        <div class="formulario__campo">
          <label for="city"> Ciudad: </label>
          <input v-model="busqueda.city" type="text" name="city" id="city" placeholder="Lima , Buenos Aires , ..." />
        </div>
        <div class="formulario__campo">
          <label for="country"> Pais: </label>
          <select name="country" v-model="busqueda.country" id="country" class="formulario__campo-s">
            <option value=""> --- Seleccione un pais --- </option>
            <option v-for="country in countries" :key="country.codigo" :value="country.codigo">
              {{ country.nombre }}
            </option>
          </select>
        </div>
        <Alerta v-if="alerta">
          <span>{{ alerta }}</span>
        </Alerta>
        <div>
          <input type="submit" value="Buscar" class="formulario__cta" />
        </div>
      </form>

      <Spinner v-if="spinner" />
    </section>

    <ClimaResult v-if="isDataClima" :clima="clima" />

  </main>
</template>

<style>
body {
  background-image: url("/clima.jpg");
  backdrop-filter: blur(2px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.container {
  min-height: 100vh;
  width: calc(100% - 4rem);
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.title {
  font-size: 2.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  padding-top: 2rem;
}

.formulario {
  width: 100%;
  max-width: 35rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.formulario__campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.formulario__campo label {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}

.formulario__campo input {
  padding: 0.3rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  text-align: center;
}

.formulario__campo-s {
  padding: 0.3rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  text-align: center;
}

.formulario__cta {
  padding: 0.5rem 2.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #df9755;
  color: #fff;
  transition: all 0.2s ease;
  font-size: 1.25rem;
  width: 100%;
}

.formulario__cta:hover {
  cursor: pointer;
  background-color: #e7d283;
  letter-spacing: 2px;
}



@media screen and (min-width: 960px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding-top: 4rem;
  }
}
</style>
