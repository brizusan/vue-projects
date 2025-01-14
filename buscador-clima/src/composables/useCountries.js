import { ref ,onMounted } from "vue"
import {paises} from "../data"
export const useCountries = () => {

  const countries = ref([]);

  onMounted(() => {
    countries.value = paises
  })

  return{
    countries
  }

}