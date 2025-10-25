import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useAppraisal = defineStore("appraisal", () => {
  const errors = reactive({});
  const loading = ref(false);
  const appraisals = ref([]);

  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
  }

  function getAppraisals(page = 1) {
    loading.value = true;

    window.axios
      .get("hr/appraisals", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        appraisals.value = response.data;
        console.log(appraisals.value);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  return {
    form,
    errors,
    loading,
    appraisals,
    resetForm,
    getAppraisals,
  };
});
