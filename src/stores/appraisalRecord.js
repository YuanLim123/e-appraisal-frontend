import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import SupervisionAppraisalQuestion from "@/qustions/SupervisionAppraisal.js";

export const useAppraisalRecord = defineStore("appraisalRecord", () => {
  const errors = reactive({});
  const loading = ref(false);
  const departments = ref([]);
  const isSectionOneInitialized = ref(false);
  const isSectionThreeEnabled = ref(false);
  const totalPointsAttainableForSectionOne = 100;
  const totalPointsAttainableForSectionTwo = 75;
  const totalPointsAttainableForSectionThree = 40;

  const form = reactive({
    review_from: "",
    review_to: "",
    purpose: "",
    scorePercentageForSectionOne: 0,
    scorePercentageForSectionTwo: 0,
    scorePercentageForSectionThree: 0,
    scoreForSectionOne: 0,
    scoreForSectionTwo: 0,
    scoreForSectionThree: 0,
    sectionOneAnswers: [],
    sectionTwoAnswers: SupervisionAppraisalQuestion.SectionTwo.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    }),
    sectionThreeAnswers: SupervisionAppraisalQuestion.SectionThree.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    }),
    appraisee_id: "",
  });

  function resetForm() {
    errors.value = {};
    form.review_from = "";
    form.review_to = "";
    form.purpose = "";
    form.scorePercentageForSectionOne = 0;
    form.scorePercentageForSectionTwo = 0;
    form.scorePercentageForSectionThree = 0;
    form.scoreForSectionOne = 0;
    form.scoreForSectionTwo = 0;
    form.scoreForSectionThree = 0;
    form.sectionOneAnswers = [];
    form.sectionTwoAnswers = SupervisionAppraisalQuestion.SectionTwo.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    });
    form.sectionThreeAnswers = SupervisionAppraisalQuestion.SectionThree.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    });
    form.appraisee_id = "";
  }

  function getDepartments() {
    return window.axios.get("hr/departments").then((response) => {
      departments.value = response.data.data;
      return response.data;
    });
  }

  function initializeSectionOneAnswers() {
    if (isSectionOneInitialized.value) {
      return;
    }

    const numberOfInitialRowForSectionOne = 5;

    for (let index = 0; index < numberOfInitialRowForSectionOne; index++) {
      form.sectionOneAnswers.push({
        goal: "",
        result: "",
        rating: 0,
      });
    }

    isSectionOneInitialized.value = true;
  }

  function addSectionOneAnswer() {
    form.sectionOneAnswers.push({
      goal: "",
      result: "",
      rating: 0,
    });
  }

  function removeSectionOneAnswer(index) {
    form.sectionOneAnswers.splice(index, 1);
  }

  function calculateTotalScore(answers) {
    let total = 0;
    answers.forEach((answer) => {
      const rating = parseFloat(answer.rating);
      if (!isNaN(rating)) {
        total += rating;
      }
    });
    if (total > 100 || total < 0) {
      return Number.NaN;
    }
    return total;
  }

  function calculateSectionOneScore() {
    form.scoreForSectionOne = calculateTotalScore(form.sectionOneAnswers);
  }

  function calculateSectionTwoScore() {
    form.scoreForSectionTwo = calculateTotalScore(form.sectionTwoAnswers);
  }

  function calculateSectionThreeScore() {
    form.scoreForSectionThree = calculateTotalScore(form.sectionThreeAnswers);
  }

  function calculateSectionOnePercentage() {
    const totalScore = form.scoreForSectionOne;
    form.scorePercentageForSectionOne = (
      (totalScore / totalPointsAttainableForSectionOne) *
      100
    ).toFixed(2);
  }

  function calculateSectionTwoPercentage() {
    const totalScore = form.scoreForSectionTwo;
    form.scorePercentageForSectionTwo = (
      (totalScore / totalPointsAttainableForSectionTwo) *
      100
    ).toFixed(2);
  }

  function calculateSectionThreePercentage() {
    const totalScore = form.scoreForSectionThree;
    form.scorePercentageForSectionThree = (
      (totalScore / totalPointsAttainableForSectionThree) *
      100
    ).toFixed(2);
  }

  function toggleSectionThree() {
    isSectionThreeEnabled.value = !isSectionThreeEnabled.value;
  }

  function addAppraisalRecord(user) {
    loading.value = true;
    errors.value = {};

    form.appraisee_id = user.id;
    try {
      const response = window.axios.post("appraisal-records", form);
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
    departments,
    isSectionOneInitialized,
    isSectionThreeEnabled,
    totalPointsAttainableForSectionOne,
    totalPointsAttainableForSectionTwo,
    totalPointsAttainableForSectionThree,
    resetForm,
    getDepartments,
    initializeSectionOneAnswers,
    addSectionOneAnswer,
    removeSectionOneAnswer,
    toggleSectionThree,
    calculateSectionOnePercentage,
    calculateSectionTwoPercentage,
    calculateSectionThreePercentage,
    calculateTotalScore,
    calculateSectionOneScore,
    calculateSectionTwoScore,
    calculateSectionThreeScore,
    addAppraisalRecord,
  };
});
