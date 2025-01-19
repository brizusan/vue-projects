<script setup>
defineProps(['msg','tipo'])
</script>
<template>
  <div
    :class="[tipo === 'error' ? 'bg-red-600' : 'bg-green-600']"
    class="text-center p-2 rounded-md mb-3"
  >
    <p class="text-center font-semibold text-white">{{msg}}</p>
  </div>
</template>