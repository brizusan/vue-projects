<template>
  <div class="alerta">
    <slot></slot>
  </div>
</template>
<style scoped>
.alerta {
  color: white;
  background-color: red;
  border-radius: 0.25rem;
  padding: 0.25rem;
  text-align: center;
}
</style>