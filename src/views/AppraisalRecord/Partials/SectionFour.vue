<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";
import { computed, watch } from "vue";
const appraisalRecordStore = useAppraisalRecord();

const weight_age = computed(() => {
  return {
    section_one: 30,
    section_two: appraisalRecordStore.form.is_section_three_enabled ? 30 : 70,
    section_three: appraisalRecordStore.form.is_section_three_enabled ? 40 : 0,
  };
});

const weighted_score = computed(() => {
  return {
    section_one: (
      (appraisalRecordStore.form.score_percentage_for_section_one * weight_age.value.section_one) /
      100
    ).toFixed(1),
    section_two: (
      (appraisalRecordStore.form.score_percentage_for_section_two * weight_age.value.section_two) /
      100
    ).toFixed(1),
    section_three: appraisalRecordStore.form.is_section_three_enabled
      ? (
          (appraisalRecordStore.form.score_percentage_for_section_three *
            weight_age.value.section_three) /
          100
        ).toFixed(1)
      : 0,
  };
});

const total_weighted_score = computed(() => {
  return (
    parseFloat(weighted_score.value.section_one) +
    parseFloat(weighted_score.value.section_two) +
    parseFloat(weighted_score.value.section_three)
  ).toFixed(1);
});

</script>

<template>
  <div class="max-w-3xl">
    <p class="text-sm font-medium">SECTION IV</p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-center">
        <thead>
          <tr>
            <th class="text-left p-2 font-medium"></th>
            <th class="text-left p-2 font-medium"></th>
            <th class="text-left p-2 font-medium">Score Percentage</th>
            <th class="text-left p-2 font-medium"></th>
            <th class="text-left p-2 font-medium">Weightage</th>
            <th class="text-left p-2 font-medium"></th>
            <th class="text-left p-2 font-medium">Weighted Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 text-left">Section I</td>
            <td class="p-2 text-left">
              <p>Performance Goals</p>
              <p class="text-xs text-gray-500 italic">[Weightage should not exceed 30%]</p>
            </td>
            <td class="p-2 underline font-medium">{{ appraisalRecordStore.form.score_percentage_for_section_one }}</td>
            <td class="p-2">×</td>
            <td class="p-2 underline font-medium">{{ weight_age.section_one + "%" }}</td>
            <td class="p-2">=</td>
            <td class="p-2 underline font-medium">{{ weighted_score.section_one + "%" }}</td>
          </tr>
          <tr>
            <td class="p-2 text-left">Section II</td>
            <td class="p-2 text-left">
              <p>Performance Goals</p>
              <p class="text-xs text-gray-500 italic">[Weightage should not exceed 30%]</p>
            </td>
            <td class="p-2 underline font-medium">{{ appraisalRecordStore.form.score_percentage_for_section_two }}</td>
            <td class="p-2">×</td>
            <td class="p-2 underline font-medium">{{ weight_age.section_two + "%" }}</td>
            <td class="p-2">=</td>
            <td class="p-2 underline font-medium">{{ weighted_score.section_two + "%" }}</td>
          </tr>
          <tr v-show="appraisalRecordStore.form.is_section_three_enabled">
            <td class="p-2 text-left">Section III</td>
            <td class="p-2 text-left">
              <p>Performance Goals</p>
              <p class="text-xs text-gray-500 italic">[Weightage should not exceed 30%]</p>
            </td>
            <td class="p-2 underline font-medium">{{ appraisalRecordStore.form.score_percentage_for_section_three }}</td>
            <td class="p-2">×</td>
            <td class="p-2 underline font-medium">{{ weight_age.section_three + "%" }}</td>
            <td class="p-2">=</td>
            <td class="p-2 underline font-medium">{{ weighted_score.section_three + "%" }}</td>
          </tr>
          <tr>
            <td colspan="5" class="p-2 text-right uppercase font-medium">#overall rating</td>
            <td class="p-2">=</td>
            <td class="p-2 underline font-medium">{{ total_weighted_score + "%" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
