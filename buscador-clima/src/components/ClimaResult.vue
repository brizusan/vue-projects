<script setup>
import {formatWheaterCelsius} from "../utils"

const props = defineProps({
  clima:{
    type:Object,
    required:true
  }
})


</script>
<template>
  <section >
      <div class="clima__card">
        <h4 class="clima__title">
          Clima de Ciudad: <span class="clima__city">{{ clima.name }}</span>
        </h4>
        <h2 class="clima__temp">{{ formatWheaterCelsius(clima.main.temp) }} °C</h2>
        <div class="clima__range">
          <p class="clima__max">Max: {{ formatWheaterCelsius(clima.main.temp_max) }}°C</p>
          <p class="clima__min">Min: {{ formatWheaterCelsius(clima.main.temp_min) }}°C</p>
        </div>
      </div>
    </section>
</template>
<style scoped>

.clima__card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.clima__title {
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
}
.clima__temp {
  font-size: 4.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  margin: 0;
}

.clima__range {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 2rem;
  color: white;
}

.clima__max,
.clima__min {
  font-weight: 400;
  letter-spacing: 2px;
}

</style>