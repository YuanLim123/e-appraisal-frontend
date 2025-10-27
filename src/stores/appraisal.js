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
    approvers_temp: [],
  });

  function resetForm() {
    form.appraisee = "";
    form.appraiser = "";
    form.approvers = [];

    form.appraisee_id = "";
    form.appraiser_id = "";
    form.approvers_temp= [];

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

  function setAppraisee(user) {
    form.appraisee = user;
  }

  function removeAppraisee() {
    form.appraisee = "";
  }

  function setAppraiser(user) {
    form.appraiser = user;
  }

  function removeAppraiser() {
    form.appraiser = "";
  }

  function addApprover(user) {
    form.approvers_temp.push(user);
  }

  function removeApprover(user) {
    form.approvers_temp = form.approvers_temp.filter((approver) => approver.id !== user.id);
  }

  function addAppraisal() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    // extract only ids to submit
    form.appraisee_id = form.appraisee ? form.appraisee.id : "";
    form.appraiser_id = form.appraiser ? form.appraiser.id : "";
    form.approvers = form.approvers_temp.map((approver, idx) => {
      return {
        user_id: approver.id,
        sequence: idx + 1,
      };
    });

    window.axios
      .post("hr/appraisals", form)
      .then((response) => {
        alert(response.data.message);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          const errorData = error.response.data;

          if (errorData.errors) {
            errors.value = errorData.errors;
          } else {
            errors.value = errorData.message;
          }

          console.log(errors.value);
        }
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
    setAppraisee,
    setAppraiser,
    removeAppraisee,
    removeAppraiser,
    addApprover,
    removeApprover,
    addAppraisal,
  };
});
