import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useRole = defineStore("role", () => {
  const errors = reactive({});
  const loading = ref(false);
  const roles = ref([]);
  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
  }

  function getRoles() {
    return window.axios.get("hr/roles").then((response) => {
      console.log(response.data);
      roles.value = response.data.data;
      return response.data;
    });
  }

  return {
    form,
    errors,
    loading,
    roles,
    resetForm,
    getRoles,
  };
});
