<script setup>
import { computed } from "vue";
import { RouterLink  , useRoute} from "vue-router";

const route = useRoute()
const isEdit = computed(() => route.name === "edit-client")


</script>
<template>
  <nav class="max-w-screen-xl w-11/12 lg:w-full  mx-auto my-10 flex gap-8 justify-end">
    <RouterLink
      class="link" 
      to="/">Registros</RouterLink>
    <RouterLink 
      v-if="!isEdit"
      class="link"
      to="/new-register">Nuevo Registro</RouterLink>
  </nav>
</template>

<style >
.link{
  @apply text-gray-500 hover:text-gray-700 font-semibold text-lg transition-colors 
}

.router-link-active{
  @apply text-sky-500 underline underline-offset-4
}
</style>