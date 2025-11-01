import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import SupervisionAppraisalQuestion from "@/qustions/SupervisionAppraisal.js";

export const useAppraisalRecord = defineStore("appraisalRecord", () => {
  const errors = reactive({});
  const loading = ref(false);
  const departments = ref([]);
  const is_section_one_initialized = ref(false);
  const is_section_three_enabled = ref(false);
  const total_points_attainable_for_section_one = 100;
  const total_points_attainable_for_section_two = 75;
  const total_points_attainable_for_section_three = 40;

  const form = reactive({
    review_from: "",
    review_to: "",
    purpose: "",
    score_percentage_for_section_one: 0,
    score_percentage_for_section_two: 0,
    score_percentage_for_section_three: 0,
    score_for_section_one: 0,
    score_for_section_two: 0,
    score_for_section_three: 0,
    section_one_answers: [],
    section_two_answers: SupervisionAppraisalQuestion.SectionTwo.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    }),
    section_three_answers: SupervisionAppraisalQuestion.SectionThree.map(() => {
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
    form.score_percentage_for_section_one = 0;
    form.score_percentage_for_section_two = 0;
    form.score_percentage_for_section_three = 0;
    form.score_for_section_one = 0;
    form.score_for_section_two = 0;
    form.score_for_section_three = 0;
    form.section_one_answers = [];
    form.section_two_answers = SupervisionAppraisalQuestion.SectionTwo.map(() => {
      return {
        rating: 3,
        comment: "",
      };
    });
    form.section_three_answers = SupervisionAppraisalQuestion.SectionThree.map(() => {
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
    if (is_section_one_initialized.value) {
      return;
    }

    const numberOfInitialRowForSectionOne = 5;

    for (let index = 0; index < numberOfInitialRowForSectionOne; index++) {
      form.section_one_answers.push({
        goal: "",
        result: "",
        rating: 0,
      });
    }

    is_section_one_initialized.value = true;
  }

  function addSectionOneAnswer() {
    form.section_one_answers.push({
      goal: "",
      result: "",
      rating: 0,
    });
  }

  function removeSectionOneAnswer(index) {
    form.section_one_answers.splice(index, 1);
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
    form.score_for_section_one = calculateTotalScore(form.section_one_answers);
  }

  function calculateSectionTwoScore() {
    form.score_for_section_two = calculateTotalScore(form.section_two_answers);
  }

  function calculateSectionThreeScore() {
    form.score_for_section_three = calculateTotalScore(form.section_three_answers);
  }

  function calculateSectionOnePercentage() {
    const totalScore = form.score_for_section_one;
    form.score_percentage_for_section_one = (totalScore / total_points_attainable_for_section_one) * 100;
  }

  function calculateSectionTwoPercentage() {
    const totalScore = form.score_for_section_two;
    form.score_percentage_for_section_two = (totalScore / total_points_attainable_for_section_two) * 100;
  }

  function calculateSectionThreePercentage() {
    const totalScore = form.score_for_section_three;
    form.score_percentage_for_section_three =
      (totalScore / total_points_attainable_for_section_three) * 100;
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
    is_section_one_initialized,
    is_section_three_enabled,
    total_points_attainable_for_section_one,
    total_points_attainable_for_section_two,
    total_points_attainable_for_section_three,
    resetForm,
    getDepartments,
    initializeSectionOneAnswers,
    addSectionOneAnswer,
    removeSectionOneAnswer,
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
