import { ref } from "vue";
import { defineStore } from "pinia";

export const usePosition = defineStore("position", () => {
  const positions = ref([]);

  function getPositions() {
    return window.axios.get("hr/positions").then((response) => {
      positions.value = response.data.data;
      return response.data;
    });
  }

  return {
    positions,
    getPositions,
  };
});
