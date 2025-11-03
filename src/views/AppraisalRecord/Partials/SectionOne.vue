<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";
const appraisalRecordStore = useAppraisalRecord();
</script>
<template>
  <div>
    <div class="flex justify-between items-start mb-2">
      <p class="mb-2 text-sm font-medium">SECTION I</p>
      <button class="p-2 border" @click.prevent="appraisalRecordStore.addSectionOneAnswer">
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
            v-for="(answer, idx) in appraisalRecordStore.form.section_one_answers"
            :key="idx"
            class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          >
            <td class="border">
              <textarea type="text" class="table-input" v-model="answer.goal" required></textarea>
            </td>
            <td class="border">
              <textarea type="text" class="table-input" v-model="answer.result" required></textarea>
            </td>
            <td class="border">
              <input type="number" class="table-input" v-model="answer.rating" required />
            </td>
            <td class="border p-2">
              <button
                class="p-2 border"
                @click.prevent="appraisalRecordStore.removeSectionOneAnswer(idx)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between">
        <p>Points awarded: {{ appraisalRecordStore.form.score_for_section_one }}</p>
        <p>Total Attainable: {{ appraisalRecordStore.total_points_attainable_for_section_one }}</p>
        <p>Score I Percentage: {{ appraisalRecordStore.form.score_percentage_for_section_one }}</p>
      </div>
    </div>
  </div>
</template>
