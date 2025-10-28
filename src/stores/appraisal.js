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
    approvers_temp: [],

    appraisee_id: "",
    appraiser_id: "",
    approvers: [],
  });

  function resetForm() {
    form.appraisee = "";
    form.appraiser = "";
    form.approvers_temp = [];

    form.appraisee_id = "";
    form.appraiser_id = "";
    form.approvers = [];

    errors.value = {};
  }

  function resetError() {
    errors.value = {};
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

  async function getAppraisals(page = 1) {
    loading.value = true;

    try {
      const response = await window.axios.get("hr/appraisals", {
        params: {
          page: page,
        },
      });
      appraisals.value = response.data;
    } catch (error) {
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
    } finally {
      loading.value = false;
    }
  }

  async function getAppraisal(appraisal_id) {
    loading.value = true;

    try {
      const response = await window.axios.get(`hr/appraisals/${appraisal_id}`);
      appraisal.value = response.data.data;
      form.appraisee = response.data.data.appraisee;
      form.appraiser = response.data.data.appraiser;
      form.approvers_temp = response.data.data.approvers.map((approver) => approver.user);
    } catch (error) {
      if (error.response.status === 422) {
        const errorData = error.response.data;

        if (errorData.errors) {
          errors.value = errorData.errors;
        } else {
          errors.value = errorData.message;
        }

        console.log(errors.value);
      }
    } finally {
      loading.value = false;
    }
  }

  async function addAppraisal() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    form.appraisee_id = form.appraisee ? form.appraisee.id : "";
    form.appraiser_id = form.appraiser ? form.appraiser.id : "";
    form.approvers = form.approvers_temp.map((approver, idx) => {
      return {
        user_id: approver.id,
        sequence: idx + 1,
      };
    });

    try {
      const response = await window.axios.post("hr/appraisals", form);
      alert(response.data.message);
      resetForm();
    } catch (error) {
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
    } finally {
      loading.value = false;
    }
  }

  async function updateAppraisal(appraisal) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    form.appraiser_id = form.appraiser ? form.appraiser.id : "";
    form.approvers = form.approvers_temp.map((approver, idx) => {
      return {
        user_id: approver.id,
        sequence: idx + 1,
      };
    });

    try {
      const response = await window.axios.put(`hr/appraisals/${appraisal.id}`, form);
      alert(response.data.message);
      resetForm();
    } catch (error) {
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
    } finally {
      loading.value = false;
    }
  }

  return {
    form,
    errors,
    loading,
    appraisals,
    appraisal,
    resetForm,
    resetError,
    getAppraisals,
    getAppraisal,
    setAppraisee,
    setAppraiser,
    removeAppraisee,
    removeAppraiser,
    addApprover,
    removeApprover,
    addAppraisal,
    updateAppraisal,
  };
});
