import { ref } from "vue"
import { defineStore} from "pinia"
export const useRecetaStore = defineStore("receta", () => {

  // State
  const receta = ref({});
  // Getters

  // Actions
  async function getReceta(id) {
    receta.value = {};
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    receta.value = data.drinks[0];
  }


  return { receta, getReceta };
});