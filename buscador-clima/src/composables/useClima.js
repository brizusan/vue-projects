import { reactive , ref , computed} from "vue";

export const useClima = () => {
  const clima = ref({});
  const busqueda = reactive({
    city: "",
    country: "",
  });
  const spinner = ref(false)

  const getClimaData = async () => {
    clima.value = {};
    try {
      const { city, country } = busqueda;
      spinner.value = true
      const appId = `0eb59c02f8971951e7a2933a0628a918`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
      const res = await fetch(url);
      if (!res.ok) return alerta.value = "Ciudad no encontrada";
      const { main, name } = await res.json();
      clima.value = {
        main,
        name
      };
      resetBusqueda();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.value = false
    }
  };
  
  const resetBusqueda = () => {
    Object.assign(busqueda, {
      city: "",
      country: "",
    })
  }

  const isDataClima = computed(() => Object.keys(clima.value).length > 0)
  


  return {
    busqueda,
    getClimaData,
    isDataClima,
    clima,
    spinner

  }

};
