import { ref , reactive , computed } from "vue";
export const usePrice = () => {
  const resultData = ref({});
  const spinner = ref(false);
  const data = reactive({
    moneda: "",
    cripto: "",
  });

  const getCryptoCompareData = async () => {
    resultData.value = {};
    try {
      spinner.value = true;
      const { moneda, cripto } = data;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const res = await fetch(url);
      const result = await res.json();
      resultData.value = result.DISPLAY[cripto][moneda];
    } catch (error) {
      console.log(error);
    } finally {
      spinner.value = false;
    }
  };

  const isDataResult = computed(() => Object.keys(resultData.value).length > 0);


  return {
    data,
    getCryptoCompareData,
    resultData,
    isDataResult  ,
    spinner

  }
};
