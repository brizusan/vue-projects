import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const modal = ref(false);
  
  const openModal = () => {
    modal.value = true;
  };

  const closeModal = () => {
    modal.value = false;
  };

  const isOpen = computed(() => modal.value);
  return { modal, openModal, closeModal, isOpen };
});
