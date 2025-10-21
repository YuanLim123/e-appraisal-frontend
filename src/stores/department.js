import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useDepartment = defineStore("department", () => {
  const errors = reactive({});
  const loading = ref(false);
  const departments = ref([]);
  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
  }

  function getDepartments() {
    return window.axios.get("hr/departments").then((response) => {
      departments.value = response.data.data;
      return response.data;
    });
  }

  return {
    form,
    errors,
    loading,
    departments,
    resetForm,
    getDepartments,
  };
});
