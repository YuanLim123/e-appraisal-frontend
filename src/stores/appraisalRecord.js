import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useAppraisalRecord = defineStore("appraisalRecord", () => {
  const errors = reactive({});
  const loading = ref(false);
  const departments = ref([]);
  const form = reactive({
    purpose: "",

  });

  function resetForm() {


    errors.value = {};
  }

  function getDepartments() {
    return window.axios.get("hr/departments").then((response) => {
      departments.value = response.data.data;
      return response.data;
    });
  }

  function getAppraisalRecord() {
    
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
