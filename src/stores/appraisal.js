import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useAppraisal = defineStore("appraisal", () => {
  const errors = reactive({});
  const loading = ref(false);
  const appraisals = ref([]);
  const appraisal = ref();

  const form = reactive({
    appraisee: "",
    appraiser: "",
    approvers: [],

    appraisee_id: "",
    appraiser_id: "",
    approver_ids: [],

  });

  function resetForm() {
    form.appraisee = "";
    form.appraiser = "";  
    form.approvers = [];

    form.appraisee_id = "";
    form.appraiser_id = "";
    form.approver_ids = [];

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

  function getAppraisal(appraisal_id) {
    loading.value = true;
    window.axios
      .get(`hr/appraisals/${appraisal_id}`)
      .then((response) => {
        appraisal.value = response.data.data;
        console.log(appraisal.value);
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
    appraisal,
    resetForm,
    getAppraisals,
    getAppraisal,
  };
});
