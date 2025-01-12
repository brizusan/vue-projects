<script setup>

</script>
<template>
  <div class="alerta">
    <slot></slot>
  </div>
</template>

<style scoped>
.alerta{
  background-color: var(--blanco);
  font-size: 2rem;
  border-radius: 0.25rem;
  color: white;
  text-align: center;
  font-weight: 900;
  padding: 1rem;
  margin-bottom: 1rem;
  color:#cc0000;
  border-left: 6px solid red;
}
</style>