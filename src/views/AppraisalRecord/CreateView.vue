<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";
import { computed, onMounted } from "vue";
import Question from "@/Appraisal.js";

const appraisalRecordStore = useAppraisalRecord();

onMounted(() => {
  appraisalRecordStore.initializePerformances();
});

const currentPointsAwarded = computed(() => {
  let score = 0;
  appraisalRecordStore.form.sectionOnePerformances.forEach((performance) => {
    const rating = parseFloat(performance.rating);
    if (!isNaN(rating)) {
      score += rating;
    }
  });
  if (score > 100) {
    return "Not valid";
  }
  return score;
});

const currentScorePercentage = computed(() => {
  if (currentPointsAwarded.value === "Not valid") {
    return "Not valid";
  }

  return (
    (
      (currentPointsAwarded.value / appraisalRecordStore.totalPointsAttainableForPerformance) *
      100
    ).toFixed(2) + "%"
  );
});
</script>

<template>
  <div class="py-4 px-4">
    <h2 class="mb-4 text-xl font-bold text-gray-900">Appraisal record</h2>
    <form class="flex flex-col gap-8" novalidate>
      <div class="w-2xl flex justify-between items-center">
        <p class="text-sm font-medium text-gray-900">Period of Review</p>
        <div class="flex gap-8">
          <div class="flex gap-2 items-center">
            <label for="period_from">From</label>
            <input
              type="date"
              name="period_from"
              id="period_from"
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
            <input type="radio" id="one" value="One" v-model="appraisalRecordStore.form.purpose" />
            <label for="one">Confirmation / Promotion</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" id="two" value="Two" v-model="appraisalRecordStore.form.purpose" />
            <label for="two">Annual Review</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              id="three"
              value="three"
              v-model="appraisalRecordStore.form.purpose"
            />
            <label for="three">Special Review</label>
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-between items-start mb-2">
          <p class="mb-2 text-sm font-medium">SECTION I</p>
          <button class="p-2 border" @click.prevent="appraisalRecordStore.addPerformance">
            Add
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" class="border px-6 py-3 align-top">
                  <div class="flex flex-col place-items-start">
                    <p class="font-semibold uppercase">PERFORMANCE GOALS</p>
                    <ul>
                      <li class="font-light">* List each goal for the performance period</li>
                      <li class="font-light">* List the most important goal first</li>
                    </ul>
                  </div>
                </th>
                <th scope="col" class="border px-6 py-3 align-top">
                  <div class="flex flex-col place-items-start">
                    <p class="font-semibold uppercase">PERFORMANCE RESULTS</p>
                    <p class="font-light">* Comment On :</p>
                    <ul class="pl-4">
                      <li class="font-light">- Results achieved vs expected</li>
                      <li class="font-light">- Behavior demonstrated</li>
                      <li class="font-light">
                        - Conditions which made achiving the
                        <p class="font-light">goal more challenging or less difficult</p>
                      </li>
                      <li class="font-light">- Improvement needed</li>
                    </ul>
                  </div>
                </th>
                <th scope="col" class="border px-6 py-3 align-top w-24">
                  <p class="font-semibold uppercase">RATING</p>
                  <p class="font-light">* Assign a rating to each goal</p>
                </th>
                <th scope="col" class="border px-6 py-3 align-top w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(performance, idx) in appraisalRecordStore.form.sectionOnePerformances"
                :key="idx"
                class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <td class="border">
                  <textarea type="text" class="table-input" v-model="performance.goal"></textarea>
                </td>
                <td class="border">
                  <textarea type="text" class="table-input" v-model="performance.result"></textarea>
                </td>
                <td class="border">
                  <input type="number" class="table-input" v-model="performance.rating" />
                </td>
                <td class="border p-2">
                  <button
                    class="p-2 border"
                    @click.prevent="appraisalRecordStore.removePerformance(idx)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between">
            <p>Points awarded: {{ currentPointsAwarded }}</p>
            <p>Total Attainable: {{ appraisalRecordStore.totalPointsAttainableForPerformance }}</p>
            <p>Score 1 Score Percentage: {{ currentScorePercentage }}</p>
          </div>
        </div>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium">SECTION II</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" class="border px-6 py-3 w-xl">QUALITIES AFFECTING PERFORMANCE</th>
                <th scope="col" class="border px-6 py-3">RATING</th>
                <th scope="col" class="border px-6 py-3">COMMENTS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ques, idx) in Question.Question"
                :key="idx"
                class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <td class="border">
                  <div class="p-2">
                    <p class="font-medium underline">
                      <span class="inline-block italic text-xs font-light mr-1">{{ idx + 1 }}</span>
                      {{ ques.title }}
                    </p>

                    <p class="font-light text-sm">{{ ques.subtitle }}</p>
                  </div>
                </td>
                <td class="border">
                  <div class="flex justify-around">
                    <div>
                      <input
                        type="radio"
                        id="one"
                        value="1"
                        v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].rate"
                      />
                      <label for="one">1</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="two"
                        value="2"
                        v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].rate"
                      />
                      <label for="two">2</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="three"
                        value="3"
                        v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].rate"
                      />
                      <label for="three">3</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="four"
                        value="4"
                        v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].rate"
                      />
                      <label for="four">4</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="five"
                        value="5"
                        v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].rate"
                      />
                      <label for="fiv">5</label>
                    </div>
                  </div>
                </td>
                <td class="border">
                  <textarea
                    type="text"
                    class="table-input"
                    v-model="appraisalRecordStore.form.sectionTwoAnswers[idx].comment"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
