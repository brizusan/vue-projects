import {ref , onMounted } from "vue";

export const useCripto = () => {
  const criptos = ref([]);
  onMounted(() => {
    getCriptosCurrencies();
  });

  const getCriptosCurrencies = async () => {
    const res = await fetch(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    );
    const { Data } = await res.json();
    criptos.value = Data;
  };

  return {
    criptos,
  }
};
