import { ref, reactive, computed , watch , onMounted } from "vue";
import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);
  const showNotificacion = reactive({
    show: false,
    message: "",
    tipo: "",
  });

  watch(favoritos, () => {
    addFavoritStorage();
  },{deep:true});

  onMounted(() => {
    const favoriteStore = localStorage.getItem("favoritos");
    if (favoriteStore) {
      favoritos.value = JSON.parse(favoriteStore);
    }
  });

  const addFavoritStorage = () => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  const addFavorite = (receta) => {
    const { idDrink: id } = receta;
    if (isAddFavorite(id)) {
      removeFavorite(id);
      showNotificacion.show = true;
      showNotificacion.message = "Eliminado de favoritos";
      showNotificacion.tipo = "error";
      setTimeout(() => {
        resetNotificacion();
      }, 2000);
      return;
    }
    favoritos.value.push(receta);
    showNotificacion.show = true;
    showNotificacion.message = "Agregado a favoritos";
    showNotificacion.tipo = "success";

    setTimeout(() => {
      resetNotificacion();
    }, 2000);
  };

  const removeFavorite = (id) => {
    favoritos.value = favoritos.value.filter(
      (favorite) => favorite.idDrink !== id
    );
  };

  const isAddFavorite = (id) => {
    return favoritos.value.some((favorite) => favorite.idDrink === id);
  };

  const isEmpty = computed(() => {
    return favoritos.value.length === 0;
  });

  // Notificacion
  const show = () => {
    showNotificacion.show = true;
  };

  const close = () => {
    showNotificacion.show = false;
  };

  const resetNotificacion = () => {
    showNotificacion.show = false;
    showNotificacion.message = "";
    showNotificacion.tipo = "";
  };

  return {
    favoritos,
    addFavorite,
    isAddFavorite,
    isEmpty,
    showNotificacion,
    show,
    close,
  };
});
