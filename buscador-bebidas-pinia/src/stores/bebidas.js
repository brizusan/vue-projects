import { ref, onMounted ,computed} from "vue";
import { defineStore } from "pinia";
export const useBebidasStore = defineStore("bebidas", () => {
  // State
  const categorias = ref([]);
  const bebidas = ref([]);

  onMounted(() => {
    getCategorias();
  });


  // Getters
  const isEmpty = computed(() => {
    return bebidas.value.length === 0;
  })
  // Actions
  async function getCategorias() {
    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
    const data = await res.json();
    categorias.value = data.drinks;
  }

  async function getBebidas(ingredient , category) {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`
    );
    const data = await res.json();
    bebidas.value = data.drinks;
  }



  return { categorias  , bebidas , getBebidas , isEmpty };
});
