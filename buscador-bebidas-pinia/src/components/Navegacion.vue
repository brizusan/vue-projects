<template>
  <div class="flex justify-between items-center">
    <img class="w-32 h-32" src="/img/logo.svg" alt="imagen logo referencia">
    <nav class="flex gap-4">
      <RouterLink :to="{name: 'home'}">Inicio</RouterLink>
      <RouterLink :to="{name: 'favorites'}">Favoritos</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

a{
  @apply text-white px-4 py-2 rounded-lg text-base font-semibold  ;
}
.router-link-active {
  @apply bg-slate-800 px-4 rounded-lg text-white transition-all;
}
</style>