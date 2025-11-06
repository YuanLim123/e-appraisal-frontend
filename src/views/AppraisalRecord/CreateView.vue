<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";
import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import SupervisionAppraisalQuestion from "@/qustions/SupervisionAppraisal.js";

const appraisalRecordStore = useAppraisalRecord();
const route = useRoute();

onMounted(() => {
  appraisalRecordStore.initializeSectionOneAnswers();
});

onUnmounted(() => {
  appraisalRecordStore.resetForm();
});

watch(
  () => appraisalRecordStore.form.section_one_answers,
  () => {
    appraisalRecordStore.calculateSectionOneScore();
    appraisalRecordStore.calculateSectionOnePercentage();
  },
  { deep: true, immediate: true },
);

watch(
  () => appraisalRecordStore.form.section_two_answers,
  () => {
    appraisalRecordStore.calculateSectionTwoScore();
    appraisalRecordStore.calculateSectionTwoPercentage();
  },
  { deep: true, immediate: true },
);

watch(
  () => appraisalRecordStore.form.section_three_answers,
  () => {
    appraisalRecordStore.calculateSectionThreeScore();
    appraisalRecordStore.calculateSectionThreePercentage();
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="py-4 px-4">
    <h2 class="mb-4 text-xl font-bold text-gray-900">Appraisal record</h2>
    <AlertMessage :errors="appraisalRecordStore.errors" @closeAlert="appraisalRecordStore.resetError"/>
    <form
      class="flex flex-col gap-8"
      @submit.prevent="appraisalRecordStore.addAppraisalRecord({ id: route.params.id })"
    >
      <div class="w-2xl flex justify-between items-center">
        <p class="text-sm font-medium text-gray-900">Period of Review</p>
        <div class="flex gap-8">
          <div class="flex gap-2 items-center">
            <label for="period_from">From</label>
            <input
              type="date"
              name="period_from"
              id="period_from"
              v-model="appraisalRecordStore.form.review_from"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="flex gap-2 items-center">
            <label for="period_to">To</label>
            <input
              type="date"
              name="period_to"
              id="period_to"
              v-model="appraisalRecordStore.form.review_to"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      <div class="w-2xl">
        <p class="mb-2 text-sm font-medium">Purpose of Appraisal</p>
        <div class="flex gap-8">
          <div class="flex items-center gap-2">
            <input
              type="radio"
              id="confirmation"
              value="confirmation_or_promotion"
              v-model="appraisalRecordStore.form.purpose"
            />
            <label for="confirmation">Confirmation / Promotion</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              id="annual"
              value="annual_review"
              v-model="appraisalRecordStore.form.purpose"
            />
            <label for="annual">Annual Review</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              id="special"
              value="special_review"
              v-model="appraisalRecordStore.form.purpose"
            />
            <label for="special">Special Review</label>
          </div>
        </div>
      </div>
      <SectionOne />
      <SectionTwo :question="SupervisionAppraisalQuestion.SectionTwo" />
      <SectionThree :question="SupervisionAppraisalQuestion.SectionThree" />
      <SectionFour />
      <div class="flex place-content-end mt-4">
        <button
          type="button"
          :disabled="appraisalRecordStore.loading"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="appraisalRecordStore.loading"
          class="flex justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <IconSpinner v-show="appraisalRecordStore.loading" />
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
