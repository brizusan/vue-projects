<script setup>
const props = defineProps({
  resultData: Object,
})
</script>
<template>
  <div class="contenedor-resultado">
    <h2> Cotizacion </h2>

    <div class="resultado">
      <img :src="`https://cryptocompare.com/${resultData.IMAGEURL}`" alt="imagen de referencia cripto">
      <div>
        <p>Precio de la moneda : <span>{{ resultData.PRICE }}</span></p>
        <p>Precio minimo del dia: <span>{{ resultData.LOWDAY }}</span></p>
        <p>Precio mayor del dia : <span>{{ resultData.HIGHDAY }}</span></p>
        <p>Cambio en 24 horas: <span>{{ resultData.CHANGEPCT24HOUR }}</span></p>
        <p>Last Update : <span>{{ resultData.LASTUPDATE }}</span></p>
      </div>
    </div>
  </div>
</template>