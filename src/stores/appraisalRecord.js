import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import Question from "@/qustions/Appraisal.js";
import SupervisionAppraisalQuestion from "@/qustions/SupervisionAppraisal.js";

export const useAppraisalRecord = defineStore("appraisalRecord", () => {
  const errors = reactive({});
  const loading = ref(false);
  const departments = ref([]);
  const isSectionOneInitialized = ref(false);
  const isSectionThreeEnabled = ref(false);

  const form = reactive({
    purpose: "",
    sectionOnePerformances: [],
    scorePecenTageForSectionOne: 0,
    sectionTwoAnswers: SupervisionAppraisalQuestion.SectionTwo.map(() => {
      return {
        rate: 3,
        comment: "",
      };
    }),
    sectionThreeAnswers: SupervisionAppraisalQuestion.SectionThree.map(() => {
      return {
        rate: 3,
        comment: "",
      }
    })
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

  function initializePerformances() {
    if (isSectionOneInitialized.value) {
      return;
    }

    const numberOfInitialRowForSectionOne = 5;

    for (let index = 0; index < numberOfInitialRowForSectionOne; index++) {
      form.sectionOnePerformances.push({
        goal: "",
        result: "",
        rating: 0,
      });
    }

    isSectionOneInitialized.value = true;
  }

  function addPerformance() {
    form.sectionOnePerformances.push({
      goal: "",
      result: "",
      rating: 0,
    });
  }

  function removePerformance(index) {
    form.sectionOnePerformances.splice(index, 1);
  }

  function calculateScorePercentage() {
    let totalRating = 0;
    form.sectionOnePerformances.forEach((performance) => {
      const rating = parseFloat(performance.rating);
      if (!isNaN(rating)) {
        totalRating += rating;
      }
    });

    form.scorePecenTageForSectionOne = totalRating;
  }

  function toggleSectionThree() {
    isSectionThreeEnabled.value = !isSectionThreeEnabled.value;
  }

  return {
    form,
    errors,
    loading,
    departments,
    isSectionOneInitialized,
    isSectionThreeEnabled,
    resetForm,
    getDepartments,
    initializePerformances,
    addPerformance,
    removePerformance,
    calculateScorePercentage,
    toggleSectionThree,
  };
});
