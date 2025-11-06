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
  <div>
    <p class="text-sm font-medium">SECTION IV</p>
    <div class="overflow-x-auto">
      <table class="max-w-3xl text-sm text-center">
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
            <td class="p-2 underline font-medium">
              {{ appraisalRecordStore.form.score_percentage_for_section_one }}
            </td>
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
            <td class="p-2 underline font-medium">
              {{ appraisalRecordStore.form.score_percentage_for_section_two }}
            </td>
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
            <td class="p-2 underline font-medium">
              {{ appraisalRecordStore.form.score_percentage_for_section_three }}
            </td>
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

      <table class="w-full text-sm text-center mt-4">
        <thead>
          <tr>
            <th class="text-left p-2 font-medium uppercase underline">performance rating</th>
            <th class="text-left p-2 font-medium uppercase underline"># overall rating</th>
            <th class="text-left p-2 font-medium w-xl"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 text-left">
              <div class="flex flex-row items-center gap-4">
                <p>5</p>
                <div class="w-6 h-4 border">
                  <p
                    v-show="total_weighted_score >= 90"
                    class="flex justify-center items-center h-full"
                  >
                    X
                  </p>
                </div>
                <p>Excellent</p>
              </div>
            </td>
            <td class="p-2 text-left">[ 90 - 100% ]</td>
            <td class="p-2 text-left">
              <div class="flex gap-2">
                <p>:</p>
                <p>
                  Performance in most of the tasks delivered by the company exceeds the standard and
                  the results are remarkable and excellent. Those who have a specific impact on the
                  company's operating performance or exceptionally good deeds are enough to be
                  exemplary employees.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-left">
              <div class="flex flex-row items-center gap-4">
                <p>4</p>
                <div class="w-6 h-4 border">
                  <p
                    v-show="total_weighted_score >= 80 && total_weighted_score < 90"
                    class="flex justify-center items-center h-full"
                  >
                    X
                  </p>
                </div>
                <p>Good</p>
              </div>
            </td>
            <td class="p-2 text-left">[ 80 - 89% ]</td>
            <td class="p-2 text-left">
              <div class="flex gap-2">
                <p>:</p>
                <p>
                  Performance can exceed the standard in some cases in the tasks delivered by the
                  company, and the overall performance exceeds the general standard.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-left">
              <div class="flex flex-row items-center gap-4">
                <p>3</p>
                <div class="w-6 h-4 border">
                  <p
                    v-show="total_weighted_score >= 70 && total_weighted_score < 80"
                    class="flex justify-center items-center h-full"
                  >
                    X
                  </p>
                </div>
                <p>Satisfactory</p>
              </div>
            </td>
            <td class="p-2 text-left">[ 70 - 79% ]</td>
            <td class="p-2 text-left">
              <div class="flex gap-2">
                <p>:</p>
                <p>
                  Performance can perform the tasks assigned by the company step by step and meet
                  the standards.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-left">
              <div class="flex flex-row items-center gap-4">
                <p>2</p>
                <div class="w-6 h-4 border">
                  <p
                    v-show="total_weighted_score >= 60 && total_weighted_score < 70"
                    class="flex justify-center items-center h-full"
                  >
                    X
                  </p>
                </div>
                <p>Below Average</p>
              </div>
            </td>
            <td class="p-2 text-left">[ 60 - 69% ]</td>
            <td class="p-2 text-left">
              <div class="flex gap-2">
                <p>:</p>
                <p>
                  Performance fail to meet the standard in part of the tasks assigned by the
                  company, but can generally meet expectations after counseling, assistance or
                  requirements.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-left">
              <div class="flex flex-row items-center gap-4">
                <p>1</p>
                <div class="w-6 h-4 border">
                  <p
                    v-show="total_weighted_score <= 59"
                    class="flex justify-center items-center h-full"
                  >
                    X
                  </p>
                </div>
                <p>Poor</p>
              </div>
            </td>
            <td class="p-2 text-left">[ 0 - 59% ]</td>
            <td class="p-2 text-left">
              <div class="flex gap-2">
                <p>:</p>
                <p>
                  Performance fail to meet the standards in many performances in the tasks delivered
                  by the company, often make mistakes, have inconsistent quality, or often need to
                  repeat requirements, and the overall performance needs to be improved.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
